const db = require('../utils/database'); // importing db pool

const Cart = require('./cart');

module.exports = class Product {
    // passing title through constructor
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // this is a meathod to store
    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static deleteById(id) {}

    // fetchAll fetches all the products, thus we use static to use it just for one
    static fetchAll() {
        return db.execute('SELECT *  FROM products');
    }

    static findById(id) {}
};
