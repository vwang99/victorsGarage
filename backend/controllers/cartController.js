const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const db = require('../database/db');

function addToCart(productId) {
    console.log("Received productId:", productId); // Debugging line

    const cartId = 1; // Default cart ID (ensure this exists in the Carts table)
    const existingItem = db.prepare("SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?").get(cartId, productId);

    if (existingItem) {
        db.prepare("UPDATE CartProducts SET quantity = quantity + 1 WHERE id = ?").run(existingItem.id);
    } else {
        // Ensure the product exists in the Products table before inserting
        const productExists = db.prepare("SELECT id FROM Products WHERE id = ?").get(productId);
        if (!productExists) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }

        db.prepare("INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, 1)").run(cartId, productId);
    }

    return db.prepare("SELECT * FROM CartProducts WHERE cart_id = ?").all(cartId);
}

async function getCart(req, res) {
    try {
        const cart = cartModel.getCart();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function removeFromCart(req, res) {
    try {
        const { id } = req.params;
        const updatedCart = cartModel.removeFromCart(id);
        res.status(200).json({ message: "Item removed from cart", cart: updatedCart });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function checkoutCart(req, res) {
    try {
        const clearedCart = cartModel.checkoutCart();
        res.status(200).json({ message: "Cart checked out", cart: clearedCart });
    } catch (error) {
        console.error("Error in checkoutCart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { addToCart, getCart, removeFromCart, checkoutCart };