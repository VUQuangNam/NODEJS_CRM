const router = require('express').Router();
const AccountController = require('../controllers/account.controller');

const checkAuth = require('../middlewares/auth.middlewares');

router.route('/employee/login')
    .post(AccountController.login);

router.route('/customer/login')
    .post(AccountController.logincustomer);

router.route('/logout')
    .post(
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