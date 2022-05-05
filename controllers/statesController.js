const FunFact = require('../model/funfacts');
const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

const isContiguious = (state) => {
	return !['AK', 'HI'].includes(state.code)
}

const getAllStates = (req, res) => {
	if(req.query.hasOwnProperty('contig')){
		 let output;
			if(req.query.contig === 'true'){
				output = data.states.filter((state) => {
					return !['AK', 'HI'].includes(state.code)
				}) 
			}
			else if(req.query.contig === 'false'){
				output = data.states.filter((state) => {
				return ['AK', 'HI'].includes(state.code)})
			}
			else{
				return res.json({'message':'Unexpected value passed with contig query.'})
			}
			

		res.json(output);

	}
	else{
		res.json(data.states);
	}
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


const addFunFact = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	if(!req.body.hasOwnProperty('funfact')){
		return res.json({
			"error":"The property 'funfact' was not on the submission."
		})
	}
	if(!Array.isArray(req.body.funfact)){
		return res.json({
			"error":"funfact submission was not an Array. Please submit as an array."
		})
	}

	// Check if the document exists
	FunFact.findById({_id: result.code}, function (err, doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc === null){
				console.log('nothing found so gonna insert');
				// Create the new document and save it
				new FunFact({
					slug: result.slug,
					_id: result.code,
					funfacts: req.body.funfact
				}, {_id: result.code})
				.save()
			}
			else{
				// Merge the funfacts that exist and those that are on the request
				doc.funfacts =[
						...doc.funfacts,
						...req.body.funfact
					]
				doc.save();
			}
		}
	})
	

	res.json({"Message":"end of function"})
}
module.exports = {
	getAllStates,
	getBySlug,
	getCapital,
	getAdmission,
	getPopulation,
	getNickname,
	addFunFact
}