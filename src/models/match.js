import { MatchLogic } from '../logic';
import ModelComponent from './modelComponent';
import { MatchRepository } from '../db/repos';
import {
    MapperMatchSingleton,
} from "../controllers/Mapper";

class Match extends ModelComponent {

    constructor(params) {

        let db = new MatchRepository();

        super(
            {
                name: 'Match',
                logic: new MatchLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: []
            }
        );
    }

    async register() {
        try {
            return await this.process('Register');
            // return MapperMatchSingleton.output('Match', res);
        } catch (err) {
            throw err;
        }
    }
}

export default Match;
