const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin/products', adminController.addProduct);
router.post('/admin/bulk-upload', adminController.bulkUpload);
// Edit an existing product
router.put('/admin/products/:id', adminController.editProduct);

// Bulk upload products

module.exports = router;