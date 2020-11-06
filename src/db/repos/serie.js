import MongoComponent from './MongoComponent';
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

class SerieRepository extends MongoComponent {

    constructor() {
        super(SerieSchema)
    }
    /**
     * @function setSerieModel
     * @param Serie Model
     * @return {Schema} SerieModel
     */

    setModel = (Serie) => {
        return SerieRepository.prototype.schema.model(Serie)
    }

    getByIdExternal(external_id){
        return new Promise((resolve, reject)=>{
            SerieRepository.prototype.schema.model.findOne({external_id})
            .exec((error, res)=>{
                if(error) reject(error);
                resolve(res);
            });
        });
    }
    updateData(_id, data){
        return new Promise((resolve, reject)=>{
            SerieRepository.prototype.schema.model.findOneAndUpdate({_id}, data)
            .exec((error, res)=>{
                if(error) reject(error);
                resolve(res);
            });
        });
    }
}

SerieRepository.prototype.schema = new SerieSchema();


export default SerieRepository;