const User = require("../model/schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

// Create New User
exports.createUser = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { name, email, role, age, password } = req.body;

        if (!name || !email || !role || !age || !password) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, role, age, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ status: true, message: 'User created successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id },secretKey , {
            expiresIn: '1h'
        });

        // ✅ Send role along with user data
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            age: user.age
        };

        return res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            data: userData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


// Get User Profile
exports.userProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: false, message: 'No token provided' });
        }

        jwt.verify(token, secretKey, async (err, decode) => {
            const user = await User.findById(decode?.id);
            if (!user) {
                return res.status(404).json({ status: false, message: 'User not found' });
            }
            const userData = {
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: user?.role,
                age: user?.age
            }
            return res.status(200).json({ status: true, message: 'Profile fetched successfully', data: userData });
        });



    } catch (err) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token' });
    }
};



//get User
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // exclude password
        return res.status(200).json({ status: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

