const products = [];

module.exports = class Product {

    // passing title through constructor
    constructor(t) {
        this.title = t;
    }

    // this is a meathod to store
    save() {
        products.push(this);    // "this" refers to the object created
    }

    // fetchAll fetches all the products, thus we use static to use it just for one
    static fetchAll() {
        return products;
    }
}