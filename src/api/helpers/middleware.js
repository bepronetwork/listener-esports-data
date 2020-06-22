import { PUBLIC_KEY, PRIVATE_KEY } from '../../config';
import Log from '../../models/log';
import { throwError } from '../../controllers/Errors/ErrorManager';
import { writeFile } from './file';
import {Security as SecurityCrypt} from "../../controllers/Security";

const geoip = require("geoip-lite");
const jwt   = require('jsonwebtoken');
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = new String("-----BEGIN RSA PRIVATE KEY-----\n" + PRIVATE_KEY + "\n-----END RSA PRIVATE KEY-----").trim();
var publicKEY  =  new String("-----BEGIN PUBLIC KEY-----\n" + PUBLIC_KEY + "\n-----END PUBLIC KEY-----").trim();

class Middleware{
    constructor(){}

    sign(payload){
        try{
            //expires in 30 days
            let token = jwt.sign({ id : 'Auth/' + payload, time: (new Date(((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000))).getTime() }, privateKEY, { algorithm: 'RS256' });
            return token;
        }catch(err){
            throw err;
        }
    };

    verify({token, payload, id, isUser=false}){
        try{
            let response = jwt.verify(token, publicKEY, { algorithm: 'RS256' });
            if(isUser && (new Date()).getTime() > response.time ) { throwError('TOKEN_EXPIRED'); };
            if('Auth/' + payload.id != response.id || payload.id != id){ return false; };
            return true;
        }catch (err){
            throw err;
        }
    };

    generateTokenDate(time) {
        try{
            let token = jwt.sign({ time }, privateKEY, { algorithm: 'RS256' });
            return token;
        }catch(err){
            throw err;
        }
    }
    generateTokenEmail(email) {
        try{
            let token = jwt.sign({ email }, privateKEY, { algorithm: 'RS256' });
            return token;
        }catch(err){
            throw err;
        }
    }

    resultTokenEmail(token) {
        try{
            let response = jwt.verify(token, publicKEY, { algorithm: 'RS256' });
            return response;
        }catch (err){
            return false;
        }
    }

    resultTokenDate(token) {
        try{
            let response = jwt.verify(token, publicKEY, { algorithm: 'RS256' });
            return response;
        }catch (err){
            return false;
        }
    }

    decode(token){
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
    respond(res, req, data){        
        try{
            var process = req.swagger.operation.definition.operationId;
            writeFile({functionName : process, content : data});
            res.json({
                data : {
                    status : 200,
                    message : data
                }
            });
        }catch(err){
            this.respondError(res, err)
        }
    }

    respondError(res, err){
        try{
            // Unknown Error
            if(!err.code){throw err}
            res.json({
                data : {
                    status : err.code,
                    message : err.message
                }
            });
        }catch(err){
            console.log(err)
            res.json({
                data : {
                    status : 404,
                    message : 'Contact Support, Action not Allowed'
                }
            });
        }
    }

    convertToJson(req, jackpotBet) {
        return JSON.stringify({
            req : {
                body : {...req.body, jackpotBet},
                hash:  SecurityCrypt.prototype.encryptData( SecurityCrypt.prototype.generateHash( JSON.stringify( {...req.body, jackpotBet} ).trim() ) )
            }
        });
    }

    getCountry(ip) {
        let geo = null;
        try {
            geo = geoip.lookup(ip);
            return geo.country;
        }catch(err){
            return 'LH';
        }
    }

    async log(json) {
        const {type, req, code} = json;
        try {
            let id = {};
            try {
                id= JSON.parse(req.headers['payload']);
            }catch(err){}

            if(type!="admin" && type!="user" && type!="app" && type!="global") {
                throw {code: 404, message: "type not defined"};
            }

            const ipFull = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',');
            const country =  this.getCountry(ipFull[ipFull.length-1]);

            const data = {
                ip          : ipFull[ipFull.length-1],
                process     : req.swagger.operation.definition.operationId,
                countryCode : country,
                route       : req.swagger.operation.pathToDefinition[1],
                creatorId   : id.id == undefined ? null : id.id,
                creatorType : type,
                code        : code == undefined ? 404 : code
            };
            const log = new Log(data);
            await log.register();
            return true;
        } catch(error) {
            return false;
        }
    }
}

let MiddlewareSingleton = new Middleware();

export default MiddlewareSingleton;