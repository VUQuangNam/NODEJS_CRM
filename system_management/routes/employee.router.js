const router = require('express').Router();
const validate = require('express-validation');

const { EmployeeValidation, ListEmployeeValidation } = require('../validations/employee.validations');

const EmployeeController = require('../controllers/employee.controller');

const checkAuth = require('../middlewares/auth.middlewares');
const checkRole = require('../middlewares/role.middlewares');

const employeeCondition = require('../condition/employ.condition');

router.route('/employee')
    .get(checkAuth,
        // validate(ListEmployeeValidation),
        checkRole('LIST_USER'),
        // employeeCondition.condition,
        EmployeeController.list
    )
    .post(
        checkAuth,
        checkRole('CREATE_USER'),
        // validate(EmployeeValidation),
        EmployeeController.create);
router.route('/employee/:employee_id')
    .get(checkAuth,
        checkRole('DETAIL_USER'),
        EmployeeController.detail)
    .put(checkAuth,
        checkRole('UPDATE_USER'),
        // validate(EmployeeValidation),
        EmployeeController.update)
    .delete(checkAuth,
        checkRole('DELETE_USER'),
        EmployeeController.delete);

module.exports = router;