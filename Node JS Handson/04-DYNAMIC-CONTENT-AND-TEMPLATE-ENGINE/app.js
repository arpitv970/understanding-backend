const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// importing required controller(s)
const getController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = express(); // running express as function

app.set('view engine', 'ejs'); // this would set template engine to ejs
app.set('views', 'views'); // this can be omitted here, as it is useful when we uses name other than views

// importing route(s)
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('62c4696244884fe398dd7ff5')
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

mongoConnect(() => {
    app.listen(3000);
});
