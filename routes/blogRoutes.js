const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, likeBlog, unlikeBlog, addComment, getComments, searchBlogs } = require('../controllers/blogController');

// Search blogs
router.get('/search', searchBlogs);

// Get all blogs
router.get('/', getBlogs);

// Create a new blog
router.post('/', auth, createBlog);

// Get a single blog by ID
router.get('/:id', getBlogById);

// Update a blog
router.put('/:id', auth, updateBlog);

// Delete a blog
router.delete('/:id', auth, deleteBlog);

// Like a blog
router.put('/like/:id', auth, likeBlog);

// Unlike a blog
router.put('/unlike/:id', auth, unlikeBlog);

// Add a comment to a blog
router.post('/comment/:id', auth, addComment);

// Get comments for a blog
router.get('/comment/:id', getComments);

module.exports = router;
