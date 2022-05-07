const data = {
	states: require('../model/states.json'),
}

function verifyStates(req,res, next){
	data.states.filter(obj => {
		if(obj.code === req.params.code.toUpperCase()){
			req.code =  obj.code;
		}
	})

	// If the code is undefined, return an error. Otherwise continue to next
	req.code === undefined ?
		res.json({"message": "Invalid state abbreviation parameter"}) :
	next()


}

module.exports = {
	verifyStates,
}