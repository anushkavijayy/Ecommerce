const Product = require('../models/product');

// Controller function to get all products with pagination
exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for order
exports.order =  async (req, res) => {
    try {
        const { productId, size } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sizeIndex = product.inventory.findIndex(item => item.size === size);

        if (sizeIndex === -1) {
            return res.status(400).json({ message: 'Size not found in inventory' });
        }

        if (product.inventory[sizeIndex].quantity > 0) {
            product.inventory[sizeIndex].quantity -= 1;
        } else {
            return res.status(400).json({ message: 'Size out of stock' });
        }

        await product.save();

        res.json({ message: 'Product quantity decreased successfully' });
    } catch (error) {
        console.error('Error decreasing product quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
