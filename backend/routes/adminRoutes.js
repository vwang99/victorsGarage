const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add a new product
router.post('/admin/products', adminController.addProduct);

// Edit an existing product
router.put('/admin/products/:id', adminController.editProduct);

// Bulk upload products
router.post('/admin/bulk-upload', adminController.bulkUpload);

module.exports = router;