const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {type: String, required: [true, 'name is require'], trim: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, min: 0},
  category: {type: String, required: true, enum: ['Guitar', 'Piano', 'Drums', 'Violin', 'Other']},
  brand: {type: String, required: true},
  stock: {type: Number, required: true, default: 0, min: 0},
  images: {type: [String], default: []}
}, {
  timestamps: true
});


module.exports = model('Product', productSchema);
