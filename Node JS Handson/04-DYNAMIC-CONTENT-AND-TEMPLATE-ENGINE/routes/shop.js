const path = require("path"); // utitlity by express

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// the ":" is to tell express that the route path is dynamic
// if you have dynamic path similar to exact path like "/products/delete" & "/products/:productID", always put dynamic one at the last
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
