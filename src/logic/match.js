const axios = require('axios').default;
import { ErrorManager } from '../controllers/Errors';
import LogicComponent from './logicComponent';
import _ from 'lodash';
import { SerieRepository, VideogameRepository, MatchRepository } from '../db/repos';
import { Serie } from '../models';
import { IOSingleton } from './utils/io';
import { PANDA_TOKEN } from '../config';
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
				// Call socket
				await MatchRepository.prototype.updateByExternal(result.id, result.status);
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
			}
			let matchToSalve = null;
			if(result.status!="pending") {
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
			}
		}catch(err){
			throw err;
		}
	}
}

// Export Default Module
export default MatchLogic;