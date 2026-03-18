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

// Generate video (simulated)
router.post('/generate', auth, async (req: any, res) => {
  try {
    const { prompt, model } = req.body;
    
    // Check credits for non-admin users
    if (!req.user.isAdmin) {
      const user = await User.findById(req.user.id);
      if (!user || user.credits <= 0) {
        return res.status(400).json({ message: 'Insufficient credits' });
      }
      
      // Deduct credit
      user.credits -= 1;
      await user.save();
    }
    
    // Create video record
    const video = new Video({
      userId: req.user.isAdmin ? null : req.user.id,
      title: prompt.substring(0, 50) + '...',
      prompt,
      model,
      status: 'processing'
    });
    
    await video.save();
    
    // Simulate video generation process
    setTimeout(async () => {
      video.status = 'completed';
      video.videoUrl = '/sample-video.mp4';
      video.thumbnailUrl = '/sample-thumbnail.jpg';
      await video.save();
    }, 5000);
    
    res.json({
      videoId: video._id,
      message: 'Video generation started'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get video status
router.get('/:id', auth, async (req: any, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Admin can access any video, regular users only their own
    if (!req.user.isAdmin && video.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;