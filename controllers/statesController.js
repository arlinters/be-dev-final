const FunFact = require('../model/State');

// controller state
const data = {
	states: require('../model/states.json'),
	setStates: function(data){this.states = data}
}

function getAllFunFacts(filter = {}){
	return FunFact.find(filter);
}

// async function, fetch all states and document response to include funfacts in json response
async function getAllStates(req, res){
		await FunFact.find().then(stateFunFacts => {
			const outputObj = []
	
			data.states.forEach(state => {
				const matchingFunFacts = stateFunFacts.filter(s => s.stateCode === state.code)[0]
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

// fetch specific state based on stateCode
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
		"state": result.state,
		"capital": result.capital_city,
	});
}

const getAdmission = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	res.json({
		"state": result.state,
		"admitted": result.admission_date,
	});
}

const getPopulation = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	res.json({
		"state": result.state,
		"population": result.population.toLocaleString("en-US"),
	});
}

const getNickname = (req, res) => {
	const result = data.states.find(x => x.code === req.code);
	
	res.json({
		"state": result.state,
		"nickname": result.nickname,
	});
}

// Add funfact to mongoose DB
const addFunFact = (req, res) => {

	// If missing required fields, return error responses
	if(!req.body.hasOwnProperty('funfacts')){
		return res.json({
			"message":"State fun facts value required"
		})
	}

	if(!Array.isArray(req.body.funfacts)){
		return res.json({
			"message":"State fun facts value must be an array"
		})
	}

	
	const result = data.states.find(x => x.code === req.code);

	// Check if the document exists
	FunFact.findOne({stateCode: result.code}, function (err, doc){
		if(err){
			console.log(err)
		}
		else{
			// If there was no document, create and save
			if(!doc){
				new FunFact({
					stateCode: result.code,
					funfacts: req.body.funfacts
				})
				.save()
			}
			else{
				// Merge the funfacts that exist and those that are on the request
				doc.funfacts =[
						...doc.funfacts,
						...req.body.funfacts
					]
				doc.save();
			}
				res.json(doc)
		}
	})
	

}

const getFunFact = (req, res) => {
	FunFact.findOne({stateCode: req.code}, function (err, doc){
		if(err){
			console.log(err)
		}
		else{
			if(doc === null){
				const result = data.states.find(x => x.code === req.code);
				res.json({'message':`No Fun Facts found for ${result.state}`})
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


const patchFunFact = (req, res) => {
	// Check body for properties and return errors if not there
	if(!req.body.hasOwnProperty('index')){
		return res.json({"message":"State fun fact index value required"})
	}
	if(!req.body.hasOwnProperty('funfact')){
		return res.json({"message":"State fun fact value required"})
	}
	if(typeof(req.body.funfact) !== 'string'){
		return res.json({"message":"State fun fact value required"})
	}


	FunFact.findOne({stateCode: req.code}, function (err, doc){
		const result = data.states.find(x => x.code === req.code);
		if(err){
			console.log(err)
		}
		else{
			if(doc === null){
				res.json({'message':`No Fun Facts found for ${result.state}`})
			}
			else{

				// API required that index starts at 1.
				// We subtract 1 and check array values. If there is a funfact at that index, we update otherwise return error msg
				const facts = doc.funfacts;
				if(facts[req.body.index-1] !== undefined){
					facts[req.body.index-1] = req.body.funfact
					doc.funfacts = facts;
					doc.save();
					res.json(doc)
				}
				else{
					res.json({'message':`No Fun Fact found at that index for ${result.state}`})
				}
			}
		}
	});
}

const removeFunFact = (req, res) => {
	// Check request body for property
	if(!req.body.hasOwnProperty('index')){
		return res.json({"message":"State fun fact index value required"})
	}


	FunFact.findOne({stateCode: req.code}, function (err, doc){
		const result = data.states.find(x => x.code === req.code);
		if(err){
			console.log(err)
		}
		else{
			if(doc === null){
				res.json({'message':`No Fun Facts found for ${result.state}`})
			}
			else{
				// Check funfacts array for requested index
				// If it is there, splice the array removing that index and save.
				if(doc.funfacts[req.body.index-1] !== undefined){
					doc.funfacts.splice(req.body.index-1, 1);
					doc.save();
					res.json(doc)
				}
				else{
					res.json({'message':`No Fun Fact found at that index for ${result.state}`})
				}
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
	getFunFact,
	patchFunFact,
	removeFunFact
}