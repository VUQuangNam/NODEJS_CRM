const router = require('express').Router();
const validate = require('express-validation');

const { ProductValidation, ListProductValidation } = require('../validations/product.validations');

const ProductController = require('../controllers/product.controller')

const checkAuth = require('../middlewares/auth.middlewares');

const productCondition = require('../condition/product.condition');

router.route('/product')
    .get(checkAuth,
        // validate(ListProductValidation),
        // productCondition.condition,
        ProductController.list
    )
    .post(checkAuth,
        // validate(ProductValidation),
        ProductController.create);
router.route('/product/:product_id')
    .get(checkAuth,
        ProductController.detail)
    .put(checkAuth,
        // validate(ProductValidation),
        ProductController.update)
    .delete(checkAuth,
        ProductController.delete);

module.exports = router;