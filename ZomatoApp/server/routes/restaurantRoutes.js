import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// Get all restaurants with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || a;
    const skip = (page - 1) * limit;
    
    // Apply filters if provided
    const filter = {};
    
    if (req.query.country) {
      filter['location.country'] = req.query.country;
    }
    
    if (req.query.minCost && req.query.maxCost) {
      filter.average_cost_for_two = { 
        $gte: parseInt(req.query.minCost), 
        $lte: parseInt(req.query.maxCost) 
      };
    }
    
    if (req.query.cuisine) {
      filter.cuisines = { $in: [req.query.cuisine] };
    }
    
    const restaurants = await Restaurant.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ 'user_rating.aggregate_rating': -1 });
    
    const totalCount = await Restaurant.countDocuments(filter);
    
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

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;