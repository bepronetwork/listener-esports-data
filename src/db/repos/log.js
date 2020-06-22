import MongoComponent from './MongoComponent';
import { LogSchema } from '../schemas';

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


class LogRepository extends MongoComponent{

    constructor(){
        super(LogSchema)
    }
    /**
     * @function setLogModel
     * @param Log Model
     * @return {Schema} LogModel
     */

    setModel = (Log) => {
        return LogRepository.prototype.schema.model(Log)
    }

    findFilter(creatorId, offset, limit, filter='ALL') {
        let filterObject = {};

        switch (filter) {
            //get all logs
            case 'ALL': {
                filterObject = {};
                break;
            }
            //get logs with code 59
            case 'UNAUTHORIZED_COUNTRY': {
                filterObject = {code: 59};
                break;
            }
            //get logs with creatorType admin
            case 'ADMIN': {
                filterObject = {creatorType: 'admin'};
                break;
            }
            //get logs with creatorType user
            case 'USER': {
                filterObject = {creatorType: 'user'};
                break;
            }
        }
        return new Promise( (resolve,reject) => {
            LogRepository.prototype.schema.model.find(
                {
                    creatorId, // Always with app id
                    ...filterObject // filter
                }
            )
            .skip(offset)
            .limit( (limit > 200 || !limit || limit<=0) ? 200 : limit) // If limit > 200 then limit is equal 200, because limit must be 200 maximum
            .exec( async (err, item) => {
                const size = await LogRepository.prototype.schema.model.find({
                    creatorId, // Always with app id
                    ...filterObject // filter
                }).countDocuments().exec();
                if(err){reject(err)}
                resolve({list: item, size });
            })
        });
    }
}

LogRepository.prototype.schema = new LogSchema();

export default LogRepository;