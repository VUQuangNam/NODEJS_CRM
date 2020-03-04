const router = require('express').Router();
const validate = require('express-validation');

const { CustomerValidation, ListCustomerValidation } = require('../validations/customer.validations');

const CustomerController = require('../controllers/customer.controller');
const customerCondition = require('../condition/customer.condition');
const checkAuth = require('../middlewares/auth.middlewares');

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

module.exports = router;