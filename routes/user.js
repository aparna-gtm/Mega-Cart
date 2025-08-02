const express = require('express');
const User = require('../models/User');
const router = express.Router(); // mini instance of app from app.js as we cannot export app 
const passport = require('passport');

// show form of signup
router.get('/register', (req, res) => {
    res.render('auth/signup');
})

// actual sign up in db
router.post('/register', async (req, res) => {
    try {
        let { email, password, username,role } = req.body;
        const user = new User({ email, username,role });

        const newUser = await User.register(user, password);

        req.login(newUser, function (err) {
            if (err) return next(err);
            req.flash('success', 'Welcome');
            return res.redirect('/products');
        });
    }
     catch (err) {
        req.flash('error', 'Something went wrong!');
        res.status(500).render('error', { err: err.message });
    }
});


// to get login form
router.get('/login', (req, res) => {
    res.render('auth/login');
})


// actual login via DB
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    (req, res) => {
        req.flash('success', "Welcome Back!")
        res.redirect('/products');
    }

)

// logout
router.get('/logout', (req, res) => {
    () => {
        req.logout();
    }
    req.flash('success', "See you soon, friend!")
    res.redirect('/login');
})
module.exports = router;