import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from "mongoose";

class SerieSchema{};

SerieSchema.prototype.name = 'Serie';

SerieSchema.prototype.schema = {
    external_id   : {  type: Number, required : true},
    videogame_id  : {  type: Number, required : true},
    videogame     : { type: mongoose.Schema.Types.ObjectId, ref: 'Videogame'},
    name          : {  type: String, required : true},
    slug          : {  type: String, required : true},
    image         : {  type: String},
}

SerieSchema.prototype.model = db.model(SerieSchema.prototype.name, new db.Schema(SerieSchema.prototype.schema));
     
export {
    SerieSchema
}
