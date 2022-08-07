const path = require('path'); // utitlity by express

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// the ":" is to tell express that the route path is dynamic
// if you have dynamic path similar to exact path like "/products/delete" & "/products/:productID", always put dynamic one at the last
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;
