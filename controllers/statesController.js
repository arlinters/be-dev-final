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

const getCapital= (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	res.json({
		"capital_city": result.capital_city,
		"capital_url": result.capital_url
	});
}

const getAdmission = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	res.json({
		"admission_date": result.admission_date,
		"admission_number": result.admission_number
	});
}

const getPopulation = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	res.json({
		"population": result.population,
		"population_rank": result.population_rank
	});
}

const getNickname = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	
	res.json({
		"nickname": result.nickname,
	});
}

module.exports = {
	getAllStates,
	getBySlug,
	getCapital,
	getAdmission,
	getPopulation,
	getNickname
}