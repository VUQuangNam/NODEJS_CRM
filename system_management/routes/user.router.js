const router = require('express').Router();


const UserController = require('../controllers/user.controller');

router.route('/user')
    .get(UserController.list)
    .post(UserController.create);
router.route('/user/:user_id')
    .get(
        UserController.detail)
    .put(
        UserController.update)
    .delete(
        UserController.delete);

module.exports = router;