const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citiesSchema = new Schema({
    cityName: { type: String },
    stateId: { type: Schema.Types.ObjectId, ref: 'states'}
});
module.exports = mongoose.model("cities", citiesSchema);