const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<h1>This is created using Express meathod</h1>');
});

module.exports = router;