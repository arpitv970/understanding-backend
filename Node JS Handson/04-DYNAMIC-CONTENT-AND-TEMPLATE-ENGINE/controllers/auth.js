const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                req.flash('error', 'Invalid email or password');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then((match) => {
                    if (match) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid email or password');
                    res.redirect('/login');
                })
                .catch((err) => {
                    req.flash('error', 'Invalid email or password');
                    // console.log(err);
                    res.redirect('/login');
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then((userDoc) => {
            if (password === '') {
                req.flash('error', 'Please set password for your account!');
                return res.redirect('/signup');
            }

            if (confirmPassword === '') {
                req.flash('error', 'Please confirm your password!');
                return res.redirect('/signup');
            }

            if (userDoc) {
                req.flash('error', 'Email already exists!');
                return res.redirect('/signup');
            }

            if (password !== confirmPassword) {
                req.flash('error', 'The passwords does not matches!');
                return res.redirect('/signup');
            }

            return bcrypt
                .hash(password, 12)
                .then((hashedPass) => {
                    const user = new User({
                        email: email,
                        password: hashedPass,
                        cart: { items: [] },
                    });
                    return user.save();
                })
                .then((results) => {
                    res.redirect('/login');
                    return sgMail.send({
                        to: email,
                        // from: 'arpitv970@gmail.com',
                        from: {
                            name: 'Arpit Verma',
                            email: 'arpitv970@gmail.com',
                        },
                        subject: 'Signup Sucessfully completed',
                        text: 'Welcome to the Cold Spine Ecommerce!',
                        html: '<h1>Welcome to the Cold Spine Ecommerce!</h1>',
                    });
                })
                .catch((err) => {
                    console.log('Error: ', err);
                });
        })

        .catch((err) => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
