import { VideogameSchema } from '../schemas';
import MongoComponent from './MongoComponent';

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

class VideogameRepository extends MongoComponent {

    constructor() {
        super(VideogameSchema);
    }
    /**
     * @function setVideogameModel
     * @param Videogame Model
     * @return {Schema} VideogameModel
     */

    setModel = (Videogame) => {
        return VideogameRepository.prototype.schema.model(Videogame)
    }
    getByIdExternal(external_id){
        return new Promise((resolve, reject)=>{
            VideogameRepository.prototype.schema.model.findOne({external_id})
            .exec((error, res)=>{
                if(error) reject(error);
                resolve(res);
            });
        });
    }
}

VideogameRepository.prototype.schema = new VideogameSchema();


export default VideogameRepository;