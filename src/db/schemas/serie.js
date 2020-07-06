import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from "mongoose";
class SerieSchema{};
SerieSchema.prototype.name = 'Serie';
SerieSchema.prototype.schema = {
    external_id   : {type: Number, required : true},
    videogame_id  : {type: Number, required : true},
    videogame     : {type: mongoose.Schema.Types.ObjectId, ref: 'Videogame'},
    begin_at      : {type: Date},
    description   : {type: String},
    end_at        : {type: Date},
    full_name     : {type: String},
    id            : {type: Number},
    // league        : {},
    league_id     : {type: Number},
    name          : {type: String},
    season        : {type: String},
    slug          : {type: String},
    tier          : {type: Number},
    tournaments   : {type: Array},
    // videogame     : {},
    winner_id     : {type: Number},
    winner_type   : {type: String},
    year          : {type: Number}
}
SerieSchema.prototype.model = db.model(SerieSchema.prototype.name, new db.Schema(SerieSchema.prototype.schema));
export {
    SerieSchema
}