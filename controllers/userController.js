const User = require('../models/userModel')
const Note = require('../models/noteModel');
const passport = require('passport')
const bcrypt = require('bcrypt')



exports.index = function (req, res) {
    res.send("User controller index!")
}

exports.checkUser=function (req,res) {
    if(!req.user) res.send(false);
    else res.send(true);
}

exports.getRegisterPage = function (req, res) {
    res.send("User controller register - GET!")
}

function checkForm(email, password, passwordConfirm) {
    const errors = [];
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
    return errors;
}

exports.registerUser = function (req, res, next) {
    const { email, password, passwordConfirm } = req.body;
    const errors = checkForm(email, password, passwordConfirm);
    if (errors.length > 0) {
        res.send({
            errors,
            email,
            password,
            passwordConfirm
        });
    }
    // form is correct
    else {
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
            }
            // all things being equal
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) console.log(err);
                        const date = Date.now();
                        // create the new user and save
                        new User({
                            email,
                            password: hash,
                            creationDate: date
                        }).save().then(user => {
                            console.log("User created successfully!");
                            // create the notes object in db for the new user
                            new Note({
                                uid: user._id,
                                notes: [],
                                creationDate: date
                            }).save().then(note => {
                                console.log("Notes obj created successfully!");
                                // after db operations done, authenticate the user
                                passport.authenticate('local', {
                                    successRedirect: '/success',
                                    failureRedirect: '/failure',
                                    failureFlash: false
                                })(req, res, next);
                            })
                        })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

exports.getLoginPage = function (req, res) {
    res.send("User controller login - GET!")
}

exports.loginUser = function (req, res, next) {
    console.log(req.body)
    // res.send("User controller login - POST!")

    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({value: false, msg:'Email or password is wrong'}); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send({value: true, msg:'Login successfull.'});
        });
      })(req, res, next);

    // passport.authenticate('local', {
    //     successRedirect: '/success',
    //     failureRedirect: '/failure',
    //     failureFlash: false
    // })(req, res, next);
}

exports.logoutUser = function (req, res, next) {
    req.logout();
    res.redirect('/user/login');
}