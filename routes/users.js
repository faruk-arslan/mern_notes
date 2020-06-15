const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.index)

router.route('/register')
.all(function (req, res, next) {
    if (req.user) res.redirect('/');
    else next();
  })
.get(userController.getRegisterPage)
.post(userController.registerUser)

router.route('/login')
.all(function (req, res, next) {
    if (req.user) res.redirect('/');
    else next();
  })
.get(userController.getLoginPage)
.post(userController.loginUser)

router.get('/check', userController.checkUser)

router.route('/logout')
.all(function (req, res, next) {
    if (!req.user) res.redirect('/user/login');
    else next();
  })
.get(userController.logoutUser)

module.exports = router;