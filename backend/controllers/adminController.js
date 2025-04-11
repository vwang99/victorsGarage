const adminModel = require('../models/adminModel');

function addProduct(req, res) {
    const newProduct = req.body;
    const result = adminModel.addProduct(newProduct);
    res.json({ message: "Product added successfully!", product: result });
}

function editProduct(req, res) {
    const productId = req.params.id;
    const updatedData = req.body;
    const result = adminModel.editProduct(productId, updatedData);
    res.json({ message: "Product updated!", product: result });
}

function bulkUpload(req, res) {
    const products = req.body;
    const result = adminModel.bulkUploadProducts(products);
    res.json({ message: "Products uploaded!", products: result });
}

module.exports = { addProduct, editProduct, bulkUpload };
