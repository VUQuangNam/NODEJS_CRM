const router = require('express').Router();
const validate = require('express-validation');

const { EmployeeValidation, ListEmployeeValidation } = require('../validations/employee.validations');
const { CustomerValidation, ListCustomerValidation } = require('../validations/customer.validations');
const { ProductValidation, ListProductValidation } = require('../validations/product.validations');


const EmployeeController = require('../controllers/employee.controller');
const CustomerController = require('../controllers/customer.controller');
const ProductController = require('../controllers/product.controller')
const AccountController = require('../controllers/account.controller');

const checkAuth = require('../middlewares/auth.middlewares');

const employeeCondition = require('../condition/employ.condition');
const customerCondition = require('../condition/customer.condition');
const productCondition = require('../condition/product.condition');


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

router.route('/customer')
    .get(
        checkAuth,
        validate(ListCustomerValidation),
        // checkRole('listUser'),
        customerCondition.condition,
        CustomerController.list
    )
    .post(checkAuth,
        // checkRole('createUser'),
        validate(CustomerValidation),
        CustomerController.create);
router.route('/customer/:customer_id')
    .get(checkAuth,
        CustomerController.detail)
    .put(checkAuth,
        validate(CustomerValidation),
        CustomerController.update)
    .delete(checkAuth,
        CustomerController.delete);

router.route('/product')
    .get(checkAuth,
        validate(ListProductValidation),
        // checkRole('listUser'),
        productCondition.condition,
        ProductController.list
    )
    .post(checkAuth,
        // checkRole('createUser'),
        validate(ProductValidation),
        ProductController.create);
router.route('/product/:product_id')
    .get(checkAuth,
        ProductController.detail)
    .put(checkAuth,
        validate(ProductValidation),
        ProductController.update)
    .delete(checkAuth,
        ProductController.delete);

router.route('/employee/login').post(AccountController.login);

router.route('/customer/login').post(AccountController.logincustomer);


module.exports = router;