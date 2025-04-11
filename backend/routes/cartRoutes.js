const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add product to cart
router.post('/cart', cartController.addToCart);

// Remove product from cart
router.delete('/cart/:id', cartController.removeFromCart);

// Checkout (empty cart)
router.delete('/cart/checkout', cartController.checkoutCart);

module.exports = router;
