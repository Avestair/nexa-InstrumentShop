const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.log('Database connection error: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
