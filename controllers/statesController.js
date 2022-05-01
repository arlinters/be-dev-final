const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

const getAllStates = (req, res) => {
	res.json(data.states);
}

const getBySlug = (req, res) => {
	// Return JSON response where the code === req.code
	res.json(data.states.find(x => x.code === req.code));
	// res.json(result[0]);
}

module.exports = {
	getAllStates,
	getBySlug
}