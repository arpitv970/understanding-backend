# Serving HTML file using express
Here is the sample code illustrating the serving of HTML file using express.js & its utilites
```js
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
```
- The HTML file is sent using `sendFile()` method, which takes path of the file as attribute
- Here is a **major catch** in path description of the file as in windows the path syntax have '\\' but for linux based system uses '/'
- Usually servers are linux based but problem may arise at developer end with non-linux system
- Thus we use an utitly for express.js `path()`, it ustilises a global variable provided by express.js i.e. `__dirname` and take the path address in same way as mentioned in sample code