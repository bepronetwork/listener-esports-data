import { VideogameSchema } from '../schemas';

/**
 * Accounts database interaction class.
 *
 * @class
 * @memberof db.repos.accounts
 * @requires bluebird
 * @requires lodash
 * @requires db/sql.accounts
 * @see Parent: {@link db.repos.accounts}
 */

class VideogameRepository {

    constructor() {
    }
    /**
     * @function setVideogameModel
     * @param Videogame Model
     * @return {Schema} VideogameModel
     */

    setModel = (Videogame) => {
        return VideogameSchema.prototype.schema.model(Videogame)
    }
}

VideogameSchema.prototype.schema = new VideogameSchema();


export default VideogameRepository;