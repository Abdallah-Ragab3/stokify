const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    getLowStockProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', protect, getProducts);
router.get('/low-stock', protect, getLowStockProducts);
router.get('/:id', protect, getProduct);

// Admin only routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// Stock management routes
router.put('/:id/stock', protect, updateStock);

module.exports = router;
