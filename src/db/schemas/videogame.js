import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from "mongoose";

class VideogameSchema{};

VideogameSchema.prototype.name = 'Videogame';

VideogameSchema.prototype.schema = {
    external_id   : {  type: Number, required : true},
    name          : {  type: String, required : true},
    slug          : {  type: String, required : true},
    image         : {  type: String},
}

VideogameSchema.prototype.model = db.model(VideogameSchema.prototype.name, new db.Schema(VideogameSchema.prototype.schema));
     
export {
    VideogameSchema
}
