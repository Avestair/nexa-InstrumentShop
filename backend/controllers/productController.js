const Product = require('../models/Product');

// @desc Get all products
// @route GET /api/products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: 'Products fetched successfully',
      data: products
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get a single product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    };

    res.status(200).json({
      message: 'Product fetched successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create a new product (Admin only)
// @route POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const {name, description, price, category, brand, stock, images } = req.body;
    const newProduct = Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images
    });

    res.status(201).json({
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update a product (Admin only)
// @route PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      data: updateProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a product (Admin only)
// @route DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

