const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StateFunFactsSchema = new Schema({
	stateCode: String,
	funfacts: [String],
});


module.exports =  mongoose.model('funfacts', StateFunFactsSchema);