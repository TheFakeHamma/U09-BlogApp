const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blog = require('../models/blogModel');

// User register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user's created blogs
exports.getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user's liked blogs
exports.getUserLikedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ likes: req.user.id }).populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user's comments
exports.getUserComments = async (req, res) => {
    try {
        const blogs = await Blog.find({ 'comments.user': req.user.id }).populate('comments.user', 'name');
        const comments = blogs.reduce((acc, blog) => {
            const userComments = blog.comments.filter(comment => comment.user._id.toString() === req.user.id);
            userComments.forEach(comment => acc.push({ ...comment._doc, blog: blog._id, blogTitle: blog.title }));
            return acc;
        }, []);
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};