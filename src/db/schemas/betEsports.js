import {globals} from "../../Globals";
let db = globals.main_db;
import mongoose from 'mongoose';

class BetEsportsSchema{};

BetEsportsSchema.prototype.name = 'BetEsports';

BetEsportsSchema.prototype.schema = {
    betAmount      : { type: Number, required: true},
    match          : { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    app            : { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    user           : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currency       : { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    wallet         : { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    market         : { type: mongoose.Schema.Types.ObjectId },
    selected       : { type: Number, required: true },
    statistic      : { type: Number, required: true },
    isWon          : { type: Boolean, required: true, default: false },
    finished       : { type: Boolean, required: true, default: false},
    created_at     : { type: Date, required : true},
}

BetEsportsSchema.prototype.model = db.model(BetEsportsSchema.prototype.name, new db.Schema(BetEsportsSchema.prototype.schema));
export {
    BetEsportsSchema
}