// Example Product Routes
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

// GET all products with pagination
router.get('/products', productController.getAllProducts);

// POST a new product
router.post('/products', productController.createProduct);
router.post('/order',productController.order)

// GET a single product by ID
router.get('/products/:productId', productController.getProductById);

// Update a product
router.put('/products/:productId', productController.updateProduct);

// DELETE a product
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
