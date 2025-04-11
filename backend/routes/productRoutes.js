const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Fetch all products
router.get('/products', productController.fetchAllProducts);

// Fetch a single product by ID
router.get('/products/:id', productController.fetchProductById);

// Search products by category or keyword
router.get('/products/search', productController.searchProducts);

module.exports = router;