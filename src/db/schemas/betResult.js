import {globals} from "../../Globals";
import mongoose from "mongoose";
let db = globals.main_db;

class BetResultSchema{};

BetResultSchema.prototype.name = 'BetResult';

BetResultSchema.prototype.schema = {
    match           : { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    marketType      : { type: String, required: true },
    betType         : { type: Number, required: true },
    participantId   : { type: Number, required: true },
    statistic       : { type: Number, required: true },
    finished        : { type: Boolean, required: true, default: false },
    status          : { type: String, required: true, default: "pending" } // pending, gain or loss
};

// db o only allows once per type
BetResultSchema.prototype.model = db.model(BetResultSchema.prototype.name, new db.Schema(BetResultSchema.prototype.schema));

export {
    BetResultSchema
}
