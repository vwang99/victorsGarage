const db = require('../database/db');

function getAllProducts() {
    return db.prepare("SELECT * FROM products").all();
}

function getProductById(id) {
    return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
}

function searchProducts(query) {
    return db.prepare("SELECT * FROM products WHERE name LIKE ?").all(`%${query}%`);
}

module.exports = { getAllProducts, getProductById, searchProducts };