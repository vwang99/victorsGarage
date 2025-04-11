const db = require('../database/db');

let cart = [];

function addToCart(productId) {
    db.prepare("INSERT INTO cart (product_id) VALUES (?)").run(productId);
    return db.prepare("SELECT * FROM cart").all();
}

function removeFromCart(productId) {
    db.prepare("DELETE FROM cart WHERE product_id = ?").run(productId);
    return db.prepare("SELECT * FROM cart").all();
}

function checkoutCart() {
    db.prepare("DELETE FROM cart").run();
    return [];
}

module.exports = { addToCart, removeFromCart, checkoutCart };
