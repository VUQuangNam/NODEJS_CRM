const router = require('express').Router();
const validate = require('express-validation');

const { EmployeeValidation, ListEmployeeValidation } = require('../validations/employee.validations');

const EmployeeController = require('../controllers/employee.controller');
const AccountController = require('../controllers/account.controller')

const checkAuth = require('../middlewares/auth.middlewares');

const employeeCondition = require('../condition/employ.condition')

router.route('/employee')
    .get(checkAuth,
        validate(ListEmployeeValidation),
        // checkRole('listUser'),
        employeeCondition.condition,
        EmployeeController.list
    )
    .post(
        checkAuth,
        // checkRole('createUser'),
        validate(EmployeeValidation),
        EmployeeController.create);
router.route('/employee/:employee_id')
    .get(checkAuth,
        EmployeeController.detail)
    .put(checkAuth,
        validate(EmployeeValidation),
        EmployeeController.update)
    .delete(checkAuth,
        EmployeeController.delete);

router.route('/login').post(AccountController.login)

module.exports = router;