const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const User = require('./mongo');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

const JWT_SECRET = '5e18ce06a77d184d0ff1a26232ae320125bb567ee1dbcae1f1e4fbadcfbf3829fa3224114de0865a40bf32002f713af1478d273bbb1ece4edec1f0c2ea689ab6'; // In production, use process.env.JWT_SECRET

app.get('/', (req, res) => {
    res.json({ message: 'Auth API is running' });
});

//get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});


// Register Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password, Fname, Lname, email, dob } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ username, Fname, Lname, email, password: hashedPassword, dob });

        // Generate JWT Token using the newly created user's ID
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt_token', token, {
            httpOnly: true,
            maxAge: 600000 // 10 minutes 
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

app.post('/login', async (req, res) => {



    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // Check user and password match
        if (user && await bcrypt.compare(password, user.password)) {
            //Generate JWT Token
            const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

            // 1. Set the cookie (HttpOnly prevents JS access)
            res.cookie('jwt_token', token, {
                httpOnly: true,
                maxAge: 600000 // 10 minutes 
            });
            res.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(8083, () => {
    console.log('Auth service running on port 8083');
})
