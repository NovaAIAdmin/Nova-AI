import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Video from '../models/Video';

const router = express.Router();

// Middleware to verify token
const auth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get user profile
router.get('/profile', auth, async (req: any, res) => {
  try {
    if (req.user.isAdmin) {
      return res.json({
        id: 'admin',
        email: req.user.email,
        name: 'Admin User',
        plan: 'admin',
        credits: 999
      });
    }
    
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user credits
router.put('/credits', auth, async (req: any, res) => {
  try {
    const { credits } = req.body;
    
    if (req.user.isAdmin) {
      return res.json({ message: 'Admin has unlimited credits' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { credits },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;