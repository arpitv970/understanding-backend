const path = require('path');   // utitlity by express

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));   // this would yeild an address that would be compatible for both linux and windows OS
});

module.exports = router;
