import { HelloSchema } from '../schemas';

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

class HelloRepository {

    constructor() {
    }
    /**
     * @function setHelloModel
     * @param Hello Model
     * @return {Schema} HelloModel
     */

    setModel = (Hello) => {
        return HelloSchema.prototype.schema.model(Hello)
    }

    async findHelloById(_id) {
        try {
            return new Promise((resolve, reject) => {
                HelloSchema.prototype.schema.model.findById(_id)
                    .lean()
                    .exec((err, user) => {
                        if (err) { reject(err) }
                        resolve(user);
                    });
            });
        } catch (err) {
            throw (err)
        }
    }
}

HelloSchema.prototype.schema = new HelloSchema();


export default HelloRepository;