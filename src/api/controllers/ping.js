import MiddlewareSingleton from '../helpers/middleware';
import SecuritySingleton from '../helpers/security';

async function pingPost(req, res) {
    try {
        if(!await MiddlewareSingleton.log({type: req.body.type, req})){
            throw {code: 404, message: "Error in Log"};
        }
        await SecuritySingleton.verifyByCountry({req});
        let data = { message : 'Ping with Succcess'}
        MiddlewareSingleton.respond(res, req, data);
    } catch (error) {
        await MiddlewareSingleton.log({type: req.body.type, req, code: error.code});
        MiddlewareSingleton.respondError(res, error);
    }
}

export {
    pingPost
};