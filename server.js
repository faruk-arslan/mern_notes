const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// local file calls
var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
// models
const User = require('./models/userModel');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config()

mongoose.connect(process.env.DB_URL_START+process.env.DB_USER+":"+process.env.DB_PASS+process.env.DB_CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true }).
    catch(error => { console.log(error) })
// error handling after connection
mongoose.connection.on('error', err => {
    logError(err);
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

// passport
app.use(passport.initialize());
app.use(passport.session());
// passport config
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            bcrypt.compare(password, user.password, function(err, result) {
                if(err) console.log(err);
                // result == true
                if(result) return done(null, user);
                else return done(null, false, { message: 'Incorrect password.' });
            });

            // if (user.password != password) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            // return done(null, user);
        });
    }
));
// serialsda
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
}); 

// app.use(function (req, res, next) {
//     console.log("middleware cacth")
//     console.log(req.path)
//     if(req.user || (req.path==="/user/login")) next()
//     else res.redirect("/user/login")
//   })

/** Route distributions */
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/user', userRouter);
app.use('/notes', notesRouter);




const port = process.env.PORT || port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
