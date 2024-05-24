const Blog = require('../models/blogModel');

// Create a new blog
exports.createBlog = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const newBlog = new Blog({
            title,
            content,
            category,
            author: req.user.id, // assuming req.user.id contains the authenticated user's ID
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        // Check user
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content, category } },
            { new: true }
        );

        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        // Check user
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Blog removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
