const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save(); // this saves the title in the array created in models
    res.redirect("/");
  };

  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    });
  };