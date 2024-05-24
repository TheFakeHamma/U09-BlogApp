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

// Search blogs by title or content with pagination
exports.searchBlogs = async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    try {
        const titleMatches = await Blog.find({
            title: { $regex: query, $options: 'i' }
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('author', 'name');

        const contentMatches = await Blog.find({
            content: { $regex: query, $options: 'i' }
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('author', 'name');

        const titleCount = await Blog.countDocuments({ title: { $regex: query, $options: 'i' } });
        const contentCount = await Blog.countDocuments({ content: { $regex: query, $options: 'i' } });

        res.json({
            titleMatches,
            contentMatches,
            totalPagesTitle: Math.ceil(titleCount / limit),
            totalPagesContent: Math.ceil(contentCount / limit),
            totalTitleMatches: titleCount,
            totalContentMatches: contentCount,
            currentPage: page,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get top 3 liked blogs
exports.getTopBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ likes: -1 }).limit(3).populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get latest 5 blogs
exports.getLatestBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5).populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all blogs with pagination
exports.getAllBlogsPaginated = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('author', 'name');

        const count = await Blog.countDocuments();

        res.json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalBlogs: count
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
