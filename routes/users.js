const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.index)

router.route('/register')
.get(userController.getRegisterPage)
.post(userController.registerUser)

router.route('/login')
.get(userController.getLoginPage)
.post(userController.loginUser)

module.exports = router;