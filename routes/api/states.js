const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const {getStateFromSlug} = require('../../middleware/validateState');

router.route('/')
    .get(statesController.getAllStates)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

// router.use()
router.route('/:slug').get(getStateFromSlug, statesController.getBySlug);

module.exports = router;