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

// Like a blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        // Check if the blog has already been liked by this user
        if (blog.likes.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Blog already liked' });
        }

        blog.likes.push(req.user.id);
        await blog.save();

        res.json(blog.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Unlike a blog
exports.unlikeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        // Check if the blog has not yet been liked by this user
        if (!blog.likes.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Blog has not yet been liked' });
        }

        blog.likes = blog.likes.filter((like) => like.toString() !== req.user.id);
        await blog.save();

        res.json(blog.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add a comment to a blog
exports.addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        const newComment = {
            user: req.user.id,
            text: req.body.text,
        };

        blog.comments.unshift(newComment);
        await blog.save();

        res.json(blog.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get comments for a blog
exports.getComments = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('comments.user', 'name');
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        res.json(blog.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
