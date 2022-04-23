const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

const getAllStates = (req, res) => {
	res.json(data.states);
}

const getBySlug = (req, res) => {
	const result = data.states.filter(obj => {
		return obj.slug === req.params.slug
	})
	res.json(result[0]);
}

module.exports = {
	getAllStates,
	getBySlug
}