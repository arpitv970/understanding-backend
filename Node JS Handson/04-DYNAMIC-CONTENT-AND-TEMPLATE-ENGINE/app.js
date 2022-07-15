const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// importing required controller(s)
const getController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
    'mongodb+srv://arpit:admin@cluster0.numu8.mongodb.net/shop?retryWrites=true&w=majority';

const app = express(); // running express as function
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

app.set('view engine', 'ejs'); // this would set template engine to ejs
app.set('views', 'views'); // this can be omitted here, as it is useful when we uses name other than views

// importing route(s)
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use((req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
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
app.use(authRoutes);

// utilizing the imported controller(s)
app.use(getController.get404);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: 'Arpit',
                    email: 'arpitv970@gmail.com',
                    cart: {
                        items: [{}],
                    },
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
