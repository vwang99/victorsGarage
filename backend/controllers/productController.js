const productModel = require('../models/productModel');

function fetchAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.json(products);
}

function fetchProductById(req, res) {
    const product = productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
}

function searchProducts(req, res) {
    const query = req.query.q;
    const results = productModel.searchProducts(query);
    res.json(results);
}

module.exports = { fetchAllProducts, fetchProductById, searchProducts };
