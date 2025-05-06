const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/", productController.fetchAllProducts);
router.get("/:id", productController.fetchProductById);
router.get('/products/search', productController.searchProducts);


module.exports = router;