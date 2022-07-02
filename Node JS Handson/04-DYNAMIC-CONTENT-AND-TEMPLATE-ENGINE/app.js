const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// importing required controller(s)
const getController = require('./controllers/error');
const sequelize = require('./utils/database'); // this would be the pool of connections
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express(); // running express as function

app.set('view engine', 'ejs'); // this would set template engine to ejs
app.set('views', 'views'); // this can be omitted here, as it is useful when we uses name other than views

// importing route(s)
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

// utilizing the imported route(s)
app.use('/admin', adminRoutes); // '/admin' is used to filter url
app.use(shopRoutes);

// utilizing the imported controller(s)
app.use(getController.get404);

Product.belongsTo(User, {
    constraint: true,
    onDelete: 'CASCADE',
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) => {
        // console.log(result);
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: 'Arpit', email: 'test@gmail.com' });
        }
        return user;
    })
    .then((user) => {
        // console.log(user);
        return user.createCart();
    })
    .then((cart) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
