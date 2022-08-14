# Implementing Authentication
- First we would Implement code flow for Sign Up

```js
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                req.flash('error', 'Email already exists!');
                return res.redirect('/signup');
            }

            const user = new User({
                email: email,
                password: hashedPass,
                cart: { items: [] },
            });
            return user.save();
        })
        .then((result) => {
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
        });
};
```

# The real Problem
- The above setup is very vulernable as it exposes senitive data directly such as user password
- But we also need password to authenticate the user
- So we need to use a certain algorithim that would hash the password such that only that algo can retrive the password from the hashed one and validate user
- Thus we use a package called `bcryptjs` to do all heavy lifting for hashing password
```
npm install --save bcryptjs
```
- Now we store the hashed password into the data base
- 
```js
const bcrypt = require('bcryptjs');

...

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                return res.redirect('/signup');
            }

            // encryption takes place here
            return bcrypt

                // assigning length of hashing
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
                });
        })

        .catch((err) => {
            console.log(err);
        });
};
```
- Now the task for bcryptjs is to validate the credentials
- bcrypt uses a function called `compare()` to retrive password from it's hashing value and compare it with password provided by user during login process
```js
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
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
                    res.redirect('/login');
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch((err) => {
            console.log(err);
        });
};
```
