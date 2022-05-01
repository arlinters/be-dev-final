const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const {verifyStates} = require('../../middleware/verifyStates');

router.route('/')
    .get(statesController.getAllStates)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:slug').get(verifyStates, statesController.getBySlug);
router.route('/:slug/capital').get(verifyStates, statesController.getCapital)
router.route('/:slug/admission').get(verifyStates, statesController.getAdmission)
router.route('/:slug/population').get(verifyStates, statesController.getPopulation)
router.route('/:slug/nickname').get(verifyStates, statesController.getNickname)

module.exports = router;