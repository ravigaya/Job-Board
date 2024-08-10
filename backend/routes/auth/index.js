
const express = require('express');
const router = express.Router();
const User = require('../../schema/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Wrong email or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Wrong email or password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).json({ message: "Logged in successfully" });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: "Server error" });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { email, name, phone, password } = req.body;
    console.log("req body", req.body);

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
         
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashPassword, phone });
        await newUser.save();

        res.status(200).json({ message: "New user created successfully" });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
