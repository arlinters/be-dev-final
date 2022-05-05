const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StateFunFactsSchema = new Schema({
	slug: String,
	_id: String,
	funfacts: [String],
});


module.exports =  mongoose.model('funfacts', StateFunFactsSchema);