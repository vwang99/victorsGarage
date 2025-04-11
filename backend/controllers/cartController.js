const cartModel = require('../models/cartModel');

function addToCart(req, res) {
    const { productId } = req.body;
    const updatedCart = cartModel.addToCart(productId);
    res.json(updatedCart);
}

function removeFromCart(req, res) {
    const { productId } = req.params;
    const updatedCart = cartModel.removeFromCart(productId);
    res.json(updatedCart);
}

function checkoutCart(req, res) {
    const emptiedCart = cartModel.checkoutCart();
    res.json({ message: "Cart emptied!", cart: emptiedCart });
}

module.exports = { addToCart, removeFromCart, checkoutCart };
