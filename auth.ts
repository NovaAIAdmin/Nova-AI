import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Admin credentials
const ADMIN_EMAIL = "novaai@gmail.com";
const ADMIN_PASSWORD = "Platts686@";

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Special handling for admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { 
          id: 'admin', 
          email, 
          name: 'Admin User', 
          isAdmin: true,
          plan: 'admin'
        }, 
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      
      return res.json({
        token,
        user: {
          id: 'admin',
          email,
          name: 'Admin User',
          isAdmin: true,
          plan: 'admin',
          credits: 999
        }
      });
    }
    
    // Regular user authentication
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        plan: user.plan 
      }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        credits: user.credits
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = new User({ email, password, name });
    await user.save();
    
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        plan: user.plan 
      }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        credits: user.credits
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;