const userController = require("../../controllers/user.js")
const permission = require("../../middlewares/permission.js")
const router = require("express").Router();

router.post('/create',permission.getIdentity , userController.createAccount)

router.post('/sendverification', userController.sendVerification)

router.get('/verify', userController.verifyAccount);

router.post('/login', userController.login);

router.post('/login/auto', permission.getIdentity ,userController.autoLogin);

module.exports = router;
