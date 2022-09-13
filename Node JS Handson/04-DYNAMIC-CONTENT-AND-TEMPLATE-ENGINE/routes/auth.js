const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                // if (value === 'lakshayagarwal60245@gmail.com') {
                //     throw new Error('This email is banned here 🤣');
                // }
                // return true;
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject('Email already exists!');
                    }
                });
            }),
        body('password', 'Please enter choose password of lenght atleast 5')
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The passwords have to match');
            }
            return true;
        }),
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getResetPass);

router.post('/reset', authController.postResetPass);

router.get('/reset/:token', authController.getNewPass);

router.post('/new-pass', authController.postNewPass);

module.exports = router;
