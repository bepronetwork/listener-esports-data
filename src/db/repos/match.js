import MongoComponent from './MongoComponent';
import { MatchSchema } from '../schemas';

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

class MatchRepository extends MongoComponent {

    constructor() {
        super(MatchSchema);
    }
    /**
     * @function setMatchModel
     * @param Match Model
     * @return {Schema} MatchModel
     */

    setModel = (Match) => {
        return MatchRepository.prototype.schema.model(Match)
    }
    getByIdExternal(external_id){
        return new Promise((resolve, reject)=>{
            MatchRepository.prototype.schema.model.findOne({external_id})
            .exec((error, res)=>{
                if(error) reject(error);
                resolve(res);
            });
        });
    }
    updateByExternal(external_id, status_external) {
        return new Promise((resolve, reject)=>{
            MatchRepository.prototype.schema.model.findOneAndUpdate({external_id}, {status_external})
            .exec((error, res)=>{
                if(error) reject(error);
                resolve(res);
            });
        });
    }
}

MatchRepository.prototype.schema = new MatchSchema();


export default MatchRepository;