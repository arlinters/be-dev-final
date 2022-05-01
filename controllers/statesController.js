const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

const getAllStates = (req, res) => {
	res.json(data.states);
}

const getBySlug = (req, res) => {
	res.json(res.locals.state[0]);
	// res.json(result[0]);
}

module.exports = {
	getAllStates,
	getBySlug
}