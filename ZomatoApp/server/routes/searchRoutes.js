import express from 'express';
import Restaurant from '../models/Restaurant.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Search restaurants by name or description
router.get('/text', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const restaurants = await Restaurant.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit);
    
    const totalCount = await Restaurant.countDocuments(
      { $text: { $search: query } }
    );
    
    res.json({
      data: restaurants,
      pagination: {
        total: totalCount,
        page,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search restaurants by location (nearby)
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 3 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Convert radius from km to meters
    const radiusInMeters = parseInt(radius) * 1000;
    
    const restaurants = await Restaurant.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInMeters
        }
      }
    })
      .skip(skip)
      .limit(limit);
    
    const totalCount = await Restaurant.countDocuments({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInMeters
        }
      }
    });
    
    res.json({
      data: restaurants,
      pagination: {
        total: totalCount,
        page,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload food image and search for restaurants with matching cuisine
// Note: In a real app, this would involve image recognition AI
// For this demo, we'll simulate by extracting keywords from the filename
router.post('/image', upload.single('foodImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    // In a real app, this would be replaced with AI image recognition
    // For this demo, we'll extract keywords from filename or use query param
    const foodType = req.body.foodType || 'general';
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Search for restaurants with matching cuisine
    const restaurants = await Restaurant.find({
      cuisines: { $regex: foodType, $options: 'i' }
    })
      .skip(skip)
      .limit(limit);
    
    const totalCount = await Restaurant.countDocuments({
      cuisines: { $regex: foodType, $options: 'i' }
    });
    
    res.json({
      data: restaurants,
      pagination: {
        total: totalCount,
        page,
        pages: Math.ceil(totalCount / limit)
      },
      uploadedImage: `/uploads/${req.file.filename}`,
      detectedFood: foodType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;