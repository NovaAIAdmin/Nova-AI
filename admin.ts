import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Video from '../models/Video';

const router = express.Router();

// Middleware to verify admin token
const adminAuth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset user credits
router.put('/users/:id/credits', adminAuth, async (req, res) => {
  try {
    const { credits } = req.body;
    
    // Special handling for admin user
    if (req.params.id === 'admin') {
      return res.json({ message: 'Admin credits unchanged' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
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

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    if (req.params.id === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }
    
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user's videos
    await Video.deleteMany({ userId: req.params.id });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get system stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const videoCount = await Video.countDocuments();
    const completedVideos = await Video.countDocuments({ status: 'completed' });
    
    res.json({
      users: userCount,
      videos: videoCount,
      completedVideos,
      serverStatus: 'operational',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;