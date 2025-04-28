import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    address: { type: String, required: true },
    locality: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: locationSchema
  },
  cuisines: [{
    type: String,
    required: true
  }],
  average_cost_for_two: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: '$'
  },
  has_online_delivery: {
    type: Boolean,
    default: false
  },
  is_delivering_now: {
    type: Boolean,
    default: false
  },
  has_table_booking: {
    type: Boolean,
    default: false
  },
  price_range: {
    type: Number,
    min: 1,
    max: 4,
    default: 2
  },
  user_rating: {
    aggregate_rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    rating_text: String,
    votes: {
      type: Number,
      default: 0
    }
  },
  photos: [{
    url: String,
    thumb_url: String,
    caption: String
  }],
  featured_image: {
    type: String
  },
  opening_hours: {
    type: String
  },
  phone_numbers: {
    type: String
  },
  highlights: [String]
}, {
  timestamps: true
});

// Index for geospatial queries
restaurantSchema.index({ 'location.coordinates': '2dsphere' });

// Text index for text search
restaurantSchema.index({
  name: 'text',
  description: 'text',
  'cuisines': 'text'
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;