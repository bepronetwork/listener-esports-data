import { SerieLogic } from '../logic';
import ModelComponent from './modelComponent';
import { SerieRepository } from '../db/repos';
import {
    MapperSerieSingleton,
} from "../controllers/Mapper";

class Serie extends ModelComponent {

    constructor(params) {

        let db = new SerieRepository();

        super(
            {
                name: 'Serie',
                logic: new SerieLogic({ db: db }),
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
            return MapperSerieSingleton.output('Serie', res._doc);
        } catch (err) {
            throw err;
        }
    }
}

export default Serie;
