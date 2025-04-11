const db = require('../database/db');

function addProduct(product) {
    const { name, price, category, description } = product;
    db.prepare("INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)")
      .run(name, price, category, description);
    return db.prepare("SELECT * FROM products").all();
}

function editProduct(id, updatedData) {
    const { name, price, category, description } = updatedData;
    db.prepare("UPDATE products SET name = ?, price = ?, category = ?, description = ? WHERE id = ?")
      .run(name, price, category, description, id);
    return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
}

function bulkUploadProducts(products) {
    const stmt = db.prepare("INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)");
    products.forEach(product => {
        stmt.run(product.name, product.price, product.category, product.description);
    });
    return db.prepare("SELECT * FROM products").all();
}

module.exports = { addProduct, editProduct, bulkUploadProducts };
