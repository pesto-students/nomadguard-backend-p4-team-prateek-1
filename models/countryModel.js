const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const countriesSchema = new Schema({
    countryName: { type: String },
    countryCode: { type: String },

});
module.exports = mongoose.model("countries", countriesSchema);