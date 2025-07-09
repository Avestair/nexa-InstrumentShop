const { Router }  = require('express');

const authController = require('../controllers/authController');


const router = new Router();

// @desc Register Handle
// @route POST /auth/register
router.post('/register', authController.register);

// @desc Login Handle
// @route POST /auth/login
router.post('/login', authController.login);

module.exports = router;
