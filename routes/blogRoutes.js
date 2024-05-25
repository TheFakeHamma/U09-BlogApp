const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { searchBlogs, getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, likeBlog, unlikeBlog, getComments, getTopBlogs, getLatestBlogs, getAllBlogsPaginated } = require('../controllers/blogController');
const blogController = require('../controllers/blogController');

// Search blogs
router.get('/search', searchBlogs);

// Get top 3 liked blogs
router.get('/top', getTopBlogs);

// Get latest 5 blogs
router.get('/latest', getLatestBlogs);

// Get all blogs with pagination
router.get('/paginated', getAllBlogsPaginated);

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
router.post('/comment/:id', auth, blogController.addComment);

// Edit a comment on a blog
router.put('/comment/:id/:comment_id', auth, blogController.editComment);

// Delete a comment on a blog
router.delete('/comment/:id/:comment_id', auth, blogController.deleteComment);

// Get comments for a blog
router.get('/comment/:id', getComments);

module.exports = router;
