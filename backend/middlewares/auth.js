const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token not provided'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (error) {
    next(error);
  }
};
