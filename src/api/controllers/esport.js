import MiddlewareSingleton from '../helpers/middleware';
import { Match } from '../../models';

/**
 * Description of the function.
 *
 * @class
 * @memberof api.controllers.admins.postAdmin
 * @requires lodash
 * @requires helpers/apiError
 * @requires helpers/swagger.generateParamsErrorObject
 * @todo Add description of AdminsController
 */

async function matchESport(params) {
    try {
        let match = new Match(params);
        await match.register();
    } catch (err) {
        console.log(err);
    }
}

export default {
    matchESport
}