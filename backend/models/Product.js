const { Schema, model } = require('mongoose');

const variantSchema = new Schema({
  colorName: {type: String, required: true},
  colorCode: {type: String, required: true},
  sku: {type: String, required: true, unique: true, trim: true},
  stock: {type: Number, required: true, min: 0, default: 0},
  price: {type: Number, required: true, min: 0}
});

const productSchema = new Schema({
  name: {type: String, required: [true, 'name is require'], trim: true},
  description: {type: String, required: true},
  category: {type: String, required: true, enum: ['Guitar', 'Piano', 'Drums', 'Violin', 'Other']},
  brand: {type: String, required: true},
  images: {type: [String], default: []},
  variants: {
    type: [variantSchema],
    required: true,
    validate: [v => v.length > 0, 'At least one variant is required.']
  }
}, {
  timestamps: true
});


module.exports = model('Product', productSchema);
