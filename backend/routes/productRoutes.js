const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { authMiddleware } = require('../middlewares/auth');

// Public routes

// @desc Get all products
// @route GET /api/products
router.get('/', productController.getAllProducts);

// @desc Get a single product by ID
// @route GET /api/products/:id
router.get('/:id', productController.getProductById);

// Admin only routes

// @desc Create a new product (Admin only)
// @route POST /api/products
router.post('/', authMiddleware, productController.createProduct);

// @desc Update a product (Admin only)
// @route PUT /api/products/:id
router.put('/:id',authMiddleware, productController.updateProduct);

// @desc Delete a product (Admin only)
// @route DELETE /api/products/:id
router.delete('/:id',authMiddleware, productController.deleteProduct);

module.exports = router;
