import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../model/user.js';

const router = express.Router();
const JWT_SECRET = '1f3d7a9c-e8b6-4d92-a9f4-93e52c82b4f0'; // Keep in .env in real projects

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log('Request body:', req.body);
    const existingUser = await User.findOne({ email });
    console.log("JWT + ", JWT_SECRET)
console.log("before token");

    if (existingUser) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
console.log("after token");

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '3h' } // longer token for convenience
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

export default router;
