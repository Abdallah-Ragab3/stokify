const Product = require('../models/productModel');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Product with this barcode already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    try {
        const { category, search, lowStock } = req.query;
        const query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Search by name or barcode
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { barcode: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter low stock items
        if (lowStock === 'true') {
            query.quantity = { $lte: '$minQuantity' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Product with this barcode already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            if (product.quantity > 0) {
                return res.status(400).json({ message: 'Cannot delete product with existing stock' });
            }
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update stock quantity
// @route   PUT /api/products/:id/stock
// @access  Private
const updateStock = async (req, res) => {
    try {
        const { quantity, type } = req.body;
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (type === 'add') {
            product.quantity += Number(quantity);
        } else if (type === 'subtract') {
            if (product.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            product.quantity -= Number(quantity);
        } else {
            return res.status(400).json({ message: 'Invalid stock update type' });
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Private
const getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ['$quantity', '$minQuantity']
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    getLowStockProducts
};
