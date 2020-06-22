import { SerieSchema } from '../schemas';

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

class SerieRepository {

    constructor() {
    }
    /**
     * @function setSerieModel
     * @param Serie Model
     * @return {Schema} SerieModel
     */

    setModel = (Serie) => {
        return SerieSchema.prototype.schema.model(Serie)
    }
}

SerieSchema.prototype.schema = new SerieSchema();


export default SerieRepository;