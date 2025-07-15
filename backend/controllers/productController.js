const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

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
    const {name, description, category, brand, variants} = req.body;

    let parsedVariants;
    try {
      parsedVariants = JSON.parse(variants);
    } catch (e) {
      return res.status(400).json({
        message: 'Invalid variants JSON format'
      });
    }

    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({
        message: 'At least one variant is required'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'Please upload at least one image.'
      });
    }

    const images = req.files.map(file => `/uploads/${file.filename}`);
    const newProduct = Product.create({
      name,
      description,
      category,
      brand,
      images,
      variants: parsedVariants
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
    const { imagesToDelete, variants } = req.body; // ['/uploads/123.jpg', '/uploads/456.jpg']
    console.log('1', typeof imagesToDelete);
    let imagesToDeleteArr = [];
    
    if (imagesToDelete && typeof imagesToDelete === 'string') {
      try {
        const nestedArr = JSON.parse(`[${imagesToDelete}]`);
        imagesToDeleteArr = nestedArr.flat();
        console.log('2', imagesToDeleteArr);

        if (!Array.isArray(imagesToDeleteArr)) {
          imagesToDeleteArr = [imagesToDeleteArr];
        }
      } catch (e) {
        imagesToDeleteArr = [imagesToDelete];
      }
    } else if (Array.isArray(imagesToDelete)) {
      imagesToDeleteArr = imagesToDelete;
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    let currentImages = product.images;

    if (imagesToDeleteArr.length > 0) {
      imagesToDeleteArr.forEach(imageUrl => {
        const imagePath = path.join(process.cwd(), 'public', imageUrl)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      });

      currentImages = currentImages.filter(img => !imagesToDeleteArr.includes(img))
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      currentImages.push(...newImages);
    }

    req.body.images = currentImages;

    if (variants) {
      try {
        const parsedVariants = JSON.parse(variants);
        if (!Array.isArray(parsedVariants)) {
          throw new Error('Variants must be an array');
        }

        req.body.variants = parsedVariants
      } catch (e) {
        return res.status(400).json({
          message: 'Invalid variants JSON format'
        })
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a product (Admin only)
// @route DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach(imageUrl => {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      })
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

