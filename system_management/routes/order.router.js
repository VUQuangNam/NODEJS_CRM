const router = require('express').Router();
const validate = require('express-validation');

const { OrderValidation, ListOrderValidation } = require('../validations/order.validations');

const OrderController = require('../controllers/order.controller');

const checkAuth = require('../middlewares/auth.middlewares');

const orderCondition = require('../condition/order.condition');

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
router.route('/order/cancel/:order_id')
    .put(checkAuth,
        OrderController.cancel);
router.route('/order/confirm/:order_id')
    .put(checkAuth,
        OrderController.confirm)

module.exports = router;