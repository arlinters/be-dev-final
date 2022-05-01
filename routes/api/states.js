const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const {verifyStates} = require('../../middleware/verifyStates');

router.route('/')
    .get(statesController.getAllStates)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

// router.use()
router.route('/:slug').get(verifyStates, statesController.getBySlug);

module.exports = router;