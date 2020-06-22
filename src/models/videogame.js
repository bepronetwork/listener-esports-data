import { VideogameLogic } from '../logic';
import ModelComponent from './modelComponent';
import { VideogameRepository } from '../db/repos';
import {
    MapperVideogameSingleton,
} from "../controllers/Mapper";

class Videogame extends ModelComponent {

    constructor(params) {

        let db = new VideogameRepository();

        super(
            {
                name: 'Videogame',
                logic: new VideogameLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: []
            }
        );
    }

    async register() {
        try {
            let res = await this.process('Register');
            return MapperVideogameSingleton.output('Videogame', res._doc);
        } catch (err) {
            throw err;
        }
    }
}

export default Videogame; 
