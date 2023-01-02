const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statesSchema = new Schema({
    stateName: { type: String },
    countryId: { type: Schema.Types.ObjectId, ref: 'countries'}
});
module.exports = mongoose.model("states", statesSchema);