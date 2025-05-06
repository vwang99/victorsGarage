const db = require('../database/db');

function addToCart(productId) {
    console.log("Received productId:", productId);

    const cartId = 1;
    const existingItem = db.prepare("SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?").get(cartId, productId);

    if (existingItem) {
        db.prepare("UPDATE CartProducts SET quantity = quantity + 1 WHERE id = ?").run(existingItem.id);
    } else {
        const productExists = db.prepare("SELECT id FROM Products WHERE id = ?").get(productId);
        if (!productExists) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }

        db.prepare("INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, 1)").run(cartId, productId);
    }

    return db.prepare("SELECT * FROM CartProducts WHERE cart_id = ?").all(cartId);
}

function getCart() {
    const cartId = 1; 
    return db.prepare("SELECT * FROM CartProducts WHERE cart_id = ?").all(cartId);
}

function removeFromCart(productId) {
    const cartId = 1;
    db.prepare("DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?").run(cartId, productId);
    return db.prepare("SELECT * FROM CartProducts WHERE cart_id = ?").all(cartId);
}

function checkoutCart() {
    const cartId = 1;
    db.prepare("DELETE FROM CartProducts WHERE cart_id = ?").run(cartId);
    return [];
}

module.exports = { addToCart, getCart, removeFromCart, checkoutCart };