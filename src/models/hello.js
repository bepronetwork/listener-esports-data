import { HelloLogic } from '../logic';
import ModelComponent from './modelComponent';
import { HelloRepository } from '../db/repos';
import {
    MapperHelloSingleton,
} from "../controllers/Mapper";

class Hello extends ModelComponent {

    constructor(params) {

        let db = new HelloRepository();

        super(
            {
                name: 'Hello',
                logic: new HelloLogic({ db: db }),
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
            return MapperHelloSingleton.output('Hello', res._doc);
        } catch (err) {
            throw err;
        }
    }
}

export default Hello;
