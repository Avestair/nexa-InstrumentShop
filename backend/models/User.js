const { Schema, model } = require('mongoose');


const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Full name is require!'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  }
}, { timestamps: true });

module.exports = model('User', userSchema);
