const FunFact = require('../model/State');

const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

function getAllFunFacts(filter = {}){
	return FunFact.find(filter);
}

async function getAllStates(req, res){
		await FunFact.find().then(stateFunFacts => {
			const outputObj = []
	
			data.states.forEach(state => {
				const matchingFunFacts = stateFunFacts.filter(s => s._id === state.code)[0]
				if(matchingFunFacts){
					outputObj.push({
						...state,
						funfacts: matchingFunFacts.funfacts
					})
				}
				else{
					outputObj.push(state);
				}
			})
			if(req.query.hasOwnProperty('contig')){
				let output;
				 if(req.query.contig === 'true'){
					 output = outputObj.filter((state) => {
						 return !['AK', 'HI'].includes(state.code)
					 }) 
				 }
				 else if(req.query.contig === 'false'){
					 output = outputObj.filter((state) => {
					 return ['AK', 'HI'].includes(state.code)})
				 }
				 else{
					 return res.json({'message':'Unexpected value passed with contig query.'})
				 }		
	 
			 res.json(output);
	 
		 }
		 else{
			 res.json(outputObj);
		 }
		});	
}

async function getBySlug(req, res){
	// Return JSON response where the code === req.code
	let state = data.states.find(x => x.code === req.code);
	await FunFact.findOne({'stateCode': req.code}).then(stateFunFacts => {
		if(stateFunFacts !== null){
			state = {
				...state,
				funfacts: stateFunFacts.funfacts
			}
		}
		res.json(state);
	});
		
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
	FunFact.findOne({stateCode: result.code}, function (err, doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc.length === 0){
				console.log('nothing found so gonna insert');
				// Create the new document and save it
				new FunFact({
					stateCode: result.code,
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
	

	res.json("The result received from MongoDB")
}

const getFunFact = (req, res) => {

	FunFact.findOne({stateCode: req.code}, function (err, doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc === null){
				res.json({'Message':'No fun facts found'})
			}
			else{
				// Document is not null, get a "random" value from 0 to count
				const count = doc.funfacts.length;
				const random = Math.floor(Math.random() * count); 
				res.json({'funfact':doc.funfacts[random]});
			}
		}
	});

}
module.exports = {
	getAllStates,
	getBySlug,
	getCapital,
	getAdmission,
	getPopulation,
	getNickname,
	addFunFact,
	getFunFact
}