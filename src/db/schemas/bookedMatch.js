import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class BookedMatchSchema{};

BookedMatchSchema.prototype.name = 'BookedMatch';

BookedMatchSchema.prototype.schema = {
    match          : { type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
    app            : { type: mongoose.Schema.Types.ObjectId, ref: 'App'},
    external_serie : { type: Number, required: true},
    external_match : { type: Number, required: true},
    game_date      : { type: Date, required : true},
    odds           : new db.Schema({
        winnerTwoWay: {type : Array},
        winnerThreeWay: {type : Array}
    })
}

BookedMatchSchema.prototype.model = db.model(BookedMatchSchema.prototype.name, new db.Schema(BookedMatchSchema.prototype.schema));
export {
    BookedMatchSchema
}