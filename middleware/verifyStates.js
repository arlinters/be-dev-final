const data = {
	states: require('../model/states.json'),
}

function verifyStates(req,res, next){
	data.states.filter(obj => {
		if(obj.slug === req.params.slug){
			req.code =  obj.code;
		}
	})

	// If the code is undefined, return an error. Otherwise continue to next
	req.code === undefined ?
		res.json(
			{
				"Message":"States was not found in our records. Looks like you experienced an oopsie :^)"
			}) :
	next()


}

module.exports = {
	verifyStates,
}