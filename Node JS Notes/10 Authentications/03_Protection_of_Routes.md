# Protection of Routes
## Why to protect routes?

- To understand the gravity of this, consider a situation where user have logged out itself but try to access some crucial routes (such has admin routes) by simply hard-coding the url link
- In this case user can manipulate the data even without getting authenticated, thus it is a great threat to the security of the system

## How to protect our routes?
- So inorder to protect our routes from anonymous user's attack, we would mostly like want the page not even load itself until user is not authorized
- Thus, we would create a simple middleware, and pass it to all routes that need protection
- This middle ware would funnel-in only authorized users

> Let us set middlewar at ./middleware/isAuth.js
```js
module.exports = (req, res, next) => {
    // filtering out un-authorzied users
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};
```

- Now placing this middleware at desired routes

```js
...

// importing middleware as 'isAuth'
const isAuth = require('../middleware/isAuth');

...

// if un-authorized user tried to access '/add-product', the isAuth middleware would filter it out
router.get('/add-product', isAuth, adminController.getAddProduct);

// similary here
router.get('/products', isAuth, adminController.getProducts);

// and so on
...

```