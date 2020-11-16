const axios = require('axios').default;
import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { SerieRepository, VideogameRepository, MatchRepository, BetEsportsRepository, BetResultSpaceRepository } from '../db/repos';
import { Serie } from '../models';
import { IOSingleton } from './utils/io';
import { PANDA_TOKEN } from '../config';
import {workerQueueSingleton} from "./third-parties/rabbit"
import { AppSchema, BookedMatchSchema } from '../db/schemas';
let error = new ErrorManager();


// Private fields
let self; // eslint-disable-line no-unused-vars
let library;
let modules;

let __private = {};


/**
 * Login logic.
 *
 * @class
 * @memberof logic
 * @param {function} params - Function Params
 **/

const processActions = {
	__register : async (params) => {
		return params;
	},
	__confirmBets : async (params) => {
		try {
			const result = (await axios.get(`https://api.pandascore.co/betting/matches/${params.match_id}?token=${PANDA_TOKEN}`)).data;
			if(result.status == "finished") {
				const match 	    = await MatchRepository.prototype.getByIdExternal(result.id);
				const listBetResult = await BetResultSpaceRepository.prototype.findByMatch(match._id);
				for(let item of listBetResult){
					workerQueueSingleton.sendToQueue("confirmBet", { betResultId: item._id, matchId: match._id, winner: result.winner_id});
				}
			}
			return true;
		} catch(err) {
			return false;
		}
	}
}

/**
 * Login logic.
 *
 * @class progressActions
 * @memberof logic
 * @param {function} params - Function Params
 **/

const progressActions = {
	__register : async (params) => {
		try{
			// Request PandaScore
			if(!params.match_id) {return;}
			const result 		= (await axios.get(`https://api.pandascore.co/betting/matches/${params.match_id}?token=${PANDA_TOKEN}`)).data;
			const market 		= (await axios.get(`https://api.pandascore.co/betting/matches/${params.match_id}/markets?token=${PANDA_TOKEN}`)).data;
			const seriesPanda 	= (await axios.get(`https://api.pandascore.co/series/${result.serie_id}?token=${PANDA_TOKEN}`)).data;
			// Get Attributes
			const serie_external_id 		= result.serie_id;
			const videogame_external_id 	= result.videogame.id;
			let serie_id 					= (await SerieRepository.prototype.getByIdExternal(serie_external_id));
			serie_id 						= (!serie_id) ? null : serie_id._id;
			let videogame_id 				= (await VideogameRepository.prototype.getByIdExternal(videogame_external_id));
			videogame_id 					= (!videogame_id) ? null : videogame_id._id;
			const match 					= await MatchRepository.prototype.getByIdExternal(result.id);
			// Neutral Conditions
			if(match) {
				// update market
				await MatchRepository.prototype.updateMarketByExternal(result.id, market.markets);

				// Update all odds of book
				let listBooked = await BookedMatchSchema.prototype.model.find({external_match: params.match_id}).exec();
				let oddWinnerTwoWay   = match.market.find((m) => m.template == "winner-2-way");
                	oddWinnerTwoWay   = oddWinnerTwoWay==null ? [] : oddWinnerTwoWay.selections;
				let oddWinnerThreeWay = match.market.find((m) => m.template == "winner-3-way");
					oddWinnerThreeWay = oddWinnerThreeWay==null ? [] : oddWinnerThreeWay.selections;
				for(let booked of listBooked){
					let app = await AppSchema.prototype.model.findById(booked.app).exec();
					console.log("Booked ", booked._id);
					await BookedMatchSchema.prototype.model.findOneAndUpdate({_id: booked._id},{$set: {
						odds: {
							winnerTwoWay    : oddWinnerTwoWay.map((res)=>{
								let resOdd = parseFloat((1/res.probability) - ((1/res.probability) * (app.esports_edge*0.01))).toFixed(2);
								return {...res, odd: resOdd <=1 ? 1.01 : resOdd}
							}),
							winnerThreeWay  : oddWinnerThreeWay.map((res)=>{
								let resOdd = parseFloat((1/res.probability) - ((1/res.probability) * (app.esports_edge*0.01))).toFixed(2);
								return {...res, odd: resOdd <=1 ? 1.01 : resOdd}
							})
						}
					}}).exec();
					console.log("Booked 2 ",{ odds: {
						winnerTwoWay    : oddWinnerTwoWay.map((res)=>{ return {...res, odd: parseFloat((1/res.probability) - ((1/res.probability) * (app.esports_edge*0.01))).toFixed(2) } }),
						winnerThreeWay  : oddWinnerThreeWay.map((res)=>{ return {...res, odd: parseFloat((1/res.probability) - ((1/res.probability) * (app.esports_edge*0.01))).toFixed(2) } })
					}});
				}
				// update status
				await MatchRepository.prototype.updateByExternal(result.id, result.status);
				// Call socket
				IOSingleton.getIO()
				.emit("matchUpdate", { message: result.id });
				console.log(result.id);
				console.log("End");
				return;
			}
			if(!videogame_id) {return;}
			// Save Serie
			if(!serie_id) {
				await (new Serie({
					...seriesPanda,
					external_id		: serie_external_id,
					videogame_id	: videogame_external_id,
					videogame 		: videogame_id
				})).register();
				serie_id = (await SerieRepository.prototype.getByIdExternal(serie_external_id))._id;
				// Call socket
				IOSingleton.getIO()
				.emit("serieUpdate", { message: serie_external_id });
			} else {
				await SerieRepository.prototype.updateData(serie_id,
					{
						...seriesPanda,
						external_id		: serie_external_id,
						videogame_id	: videogame_external_id,
						videogame 		: videogame_id
					}
				);
			}
			let matchToSalve = null;
			if(result.status=="pre_match") {
				// Save match
				matchToSalve = await self.save({
					external_id   	: result.id,
					serie_id      	: serie_external_id,
					videogame_id  	: videogame_external_id,
					serie         	: serie_id,
					videogame 	  	: videogame_id,
					market 		    : market.markets,
					status_external : result.status,
					game_date 		: (new Date(result.scheduled_at))
				});
			}else{
				return;
			}
			// Call socket
			IOSingleton.getIO()
			.emit("matchUpdate", { message: result.id });
			console.log("End");
			return {
				...matchToSalve,
				type : 'match'
			};
		}catch(err){
			throw err;
		}
	},
	__confirmBets : async (params) => {
		return params;
	}
}

/**
 * Main Match logic.
 *
 * @class
 * @memberof logic
 * @see Parent: {@link logic}
 * @requires lodash
 * @requires helpers/sort_by
 * @requires helpers/bignum
 * @requires logic/block_reward
 * @param {Database} db
 * @param {ZSchema} schema
 * @param {Object} logger
 * @param {function} cb - Callback function
 * @property {Match_model} model
 * @property {Match_schema} schema
 * @returns {setImmediate} error, this
 * @todo Add description for the params
 */


class MatchLogic extends LogicComponent {
	constructor(scope) {
		super(scope);
		self = this;
		__private = {
			//ADD
			db : scope.db,
			__normalizedSelf : null
		};

		library = {
			process : processActions,
			progress : progressActions
		}
    }


    /**
	 * Validates Match schema.
	 *
	 * @param {Match} Match
	 * @returns {Match} Match
	 * @throws {string} On schema.validate failure
	 */
	async objectNormalize(params, processAction) {
		try{
			switch(processAction) {
				case 'Register' : {
					return library.process.__register(params); break;
				};
				case 'ConfirmBets' : {
					return library.process.__confirmBets(params); break;
				};
			}
		}catch(err){
			throw err;
		}
	}

	 /**
	 * Tests Match schema.
	 *
	 * @param {Match} Match
	 * @returns {Match} Match
	 * @throws {string} On schema.validate failure
	 */

	testParams(params, action){
		try{
			error.match(params, action);
		}catch(err){
			throw err;
		}
	}



	async progress(params, progressAction){
		try{
			switch(progressAction) {
				case 'Register' : {
					return await library.progress.__register(params);
				}
				case 'ConfirmBets' : {
					return await library.progress.__confirmBets(params);
				}
			}
		}catch(err){
			throw err;
		}
	}
}

// Export Default Module
export default MatchLogic;