import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class BetEsportsSchema{};

BetEsportsSchema.prototype.name = 'BetEsports';

BetEsportsSchema.prototype.schema = {
    videogames  : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Videogame' } ],
    betAmount   : { type: Number, required: true },
    app         : { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    user        : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currency    : { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    isWon       : { type: Boolean, required: true, default: false },
    result      : [{ type : mongoose.Schema.Types.ObjectId, ref: 'BetResult', required : true }],
    type        : { type: String, required : true },
    winAmount   : { type : Number, required : true, default: 0 },
}

BetEsportsSchema.prototype.model = db.model(BetEsportsSchema.prototype.name, new db.Schema(BetEsportsSchema.prototype.schema, { timestamps: { createdAt: 'created_at' } }));
export {
    BetEsportsSchema
}