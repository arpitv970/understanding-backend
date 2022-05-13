# Serving Files statically
- Serving a file statically simply means: not to handle that file by any routes/middleware, instead directly forwarded to the file system
- Thus we uses `express.static()` method to serve the file statically & now we just need to pass the path of that file

And that's how our `app.js` looks like
```js
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));    // serving public folder statically

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
```