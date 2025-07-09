const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ').[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token not provided...'
    })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (error) {
    next(error);
  }
};
