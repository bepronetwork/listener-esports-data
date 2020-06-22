import {globals} from "../../Globals";
let db = globals.main_db;

class HelloSchema{};

HelloSchema.prototype.name = 'Hello';

HelloSchema.prototype.schema = {
    name : { type: String},
}

HelloSchema.prototype.model = db.model(HelloSchema.prototype.name, new db.Schema(HelloSchema.prototype.schema));
     
export {
    HelloSchema
}
