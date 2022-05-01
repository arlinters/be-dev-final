const data = {
	states: require('../model/states.json'),
}

function getStateFromSlug(req,res, next){
	res.locals.state = data.states.filter(obj => {
		return obj.slug === req.params.slug
	})
	next();
}

module.exports = {
	getStateFromSlug,
}