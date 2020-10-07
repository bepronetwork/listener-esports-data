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
        return await match.register();
    } catch (err) {
        return err;
    }
}

async function confirmBets(params) {
    try {
        let match = new Match(params);
        return await match.confirmBets();
    } catch (err) {
        return err;
    }
}

export default {
    confirmBets,
    matchESport
}