const User = require('../models/userModel')
const passport = require('passport')
const bcrypt = require('bcrypt')


exports.index = function (req, res) {
    res.send("User controller index!")
}

exports.getRegisterPage = function (req, res) {
    res.send("User controller register - GET!")
}

exports.registerUser = function (req, res, next) {
    const { email, password, passwordConfirm } = req.body;
    let errors = [];
    // check empty fields
    if (!email || !password || !passwordConfirm) {
        errors.push({ msg: 'Please fill all fields' });
    }
    // check password confirm
    if (password != passwordConfirm) {
        errors.push({ msg: 'Passwords did not match' });
    }
    // check pwd characer length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    // check if email already exist
    // User.findOne({ email: email }).then(user => {
    //     if (user) errors.push({ msg: 'Email already exists' });
    // });
    // if there is an error
    if (errors.length > 0) {
        res.send({
            errors,
            email,
            password,
            passwordConfirm
        });
    } else {
        // check if email already exist
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.send({
                    errors,
                    email,
                    password,
                    passwordConfirm
                });
            } else {
                // all things being equal
                const newUser = new User({
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        // assign hash as a pwd and save the user
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                console.log("User created successfully!");

                                passport.authenticate('local', {
                                    successRedirect: '/',
                                    failureRedirect: '/user/login',
                                    failureFlash: false
                                })(req, res, next);

                                // res.redirect('/user/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    // res.send("User controller register - POST!")
}

exports.getLoginPage = function (req, res) {
    res.send("User controller login - GET!")
}

exports.loginUser = function (req, res, next) {
    console.log(req.body)
    // res.send("User controller login - POST!")

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: false
    })(req, res, next);
}