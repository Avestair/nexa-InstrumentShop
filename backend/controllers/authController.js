const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { fullname, email, phone, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        message: 'User already exists'
      });
    }

    await User.create({
      fullname,
      email,
      phone,
      password: hashPassword,
    })

    res.status(201).json({
      message: 'User created successfully'
    });

  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isEqual = await bcrypt.compare(password, user.password);
    if (!user || !isEqual) {
      return res.status(401).json({
        message: 'Wrong credentials...',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fullname: user.fullname,
        email: user.email
      },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: '7h'}
    );

    res.status(200).json({
      token,
      message: 'Login successful'
    });

  } catch (error) {
    next(error);
  }
};
