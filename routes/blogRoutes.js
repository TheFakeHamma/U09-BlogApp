const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, likeBlog, unlikeBlog } = require('../controllers/blogController');


// Route to create a blog
router.post('/', auth, createBlog);

// Route to get all blogs
router.get('/', getBlogs);

// Route to get a single blog by ID
router.get('/:id', getBlogById);

// Route to update a blog
router.put('/:id', auth, updateBlog);

// Route to delete a blog
router.delete('/:id', auth, deleteBlog);

// Like a blog
router.put('/like/:id', auth, likeBlog);

// Unlike a blog
router.put('/unlike/:id', auth, unlikeBlog);

module.exports = router;
