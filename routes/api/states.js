const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const {verifyStates} = require('../../middleware/verifyStates');

router.route('/').get(statesController.getAllStates)
router.route('/:code').get(verifyStates, statesController.getBySlug);
router.route('/:code/capital').get(verifyStates, statesController.getCapital)
router.route('/:code/admission').get(verifyStates, statesController.getAdmission)
router.route('/:code/population').get(verifyStates, statesController.getPopulation)
router.route('/:code/nickname').get(verifyStates, statesController.getNickname)

router.route('/:code/funfact')
    .get(verifyStates, statesController.getFunFact)
    .post(verifyStates, statesController.addFunFact);
module.exports = router;