const router = require('express').Router();
const validate = require('express-validation');

const { EmployeeValidation, ListEmployeeValidation } = require('../validations/employee.validations');
const { CustomerValidation, ListCustomerValidation } = require('../validations/customer.validations');
const { ProductValidation, ListProductValidation } = require('../validations/product.validations');
const { OrderValidation, ListOrderValidation } = require('../validations/order.validations');



const EmployeeController = require('../controllers/employee.controller');
const CustomerController = require('../controllers/customer.controller');
const ProductController = require('../controllers/product.controller')
const AccountController = require('../controllers/account.controller');
const OrderController = require('../controllers/order.controller');

const checkAuth = require('../middlewares/auth.middlewares');
const checkRole = require('../middlewares/role.middlewares');

const employeeCondition = require('../condition/employ.condition');
const customerCondition = require('../condition/customer.condition');
const productCondition = require('../condition/product.condition');
const orderCondition = require('../condition/order.condition');

router.route('/employee')
    .get(checkAuth,
        validate(ListEmployeeValidation),
        checkRole('LIST_USER'),
        employeeCondition.condition,
        EmployeeController.list
    )
    .post(
        checkAuth,
        checkRole('CREATE_USER'),
        validate(EmployeeValidation),
        EmployeeController.create);
router.route('/employee/:employee_id')
    .get(checkAuth,
        checkRole('DETAIL_USER'),
        EmployeeController.detail)
    .put(checkAuth,
        checkRole('UPDATE_USER'),
        validate(EmployeeValidation),
        EmployeeController.update)
    .delete(checkAuth,
        checkRole('DELETE_USER'),
        EmployeeController.delete);

router.route('/customer')
    .get(
        checkAuth,
        validate(ListCustomerValidation),
        customerCondition.condition,
        CustomerController.list
    )
    .post(validate(CustomerValidation),
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
        productCondition.condition,
        ProductController.list
    )
    .post(checkAuth,
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

router.route('/order')
    .get(checkAuth,
        validate(ListOrderValidation),
        orderCondition.condition,
        OrderController.list
    )
    .post(checkAuth,
        validate(OrderValidation),
        OrderController.create);
router.route('/order/:order_id')
    .get(checkAuth,
        OrderController.detail)
    .put(checkAuth,
        validate(OrderValidation),
        OrderController.update)
// .delete(checkAuth,
//     OrderController.delete);
router.route('/order/cancel/:order_id')
    .put(checkAuth,
        OrderController.cancel);
router.route('/order/confirm/:order_id')
    .put(checkAuth,
        OrderController.confirm)

router.route('/employee/login').post(AccountController.login);

router.route('/customer/login').post(AccountController.logincustomer);

router.route('/logout').post(
    checkAuth,
    AccountController.logout
);

router.route('/employee/changePas')
    .post(checkAuth,
        AccountController.changePassEmPloyee
    );
router.route('/customer/changePas')
    .post(checkAuth,
        AccountController.changePassCustomer
    );

module.exports = router;