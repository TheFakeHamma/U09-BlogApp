const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// User register
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get user's created blogs
router.get('/blogs', auth, userController.getUserBlogs);

// Get user's liked blogs
router.get('/liked-blogs', auth, userController.getUserLikedBlogs);

// Get user's comments
router.get('/comments', auth, userController.getUserComments);

module.exports = router;
