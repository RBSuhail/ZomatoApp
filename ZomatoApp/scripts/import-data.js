import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load models
import '../server/models/Restaurant.js';

// Initialize environment variables
dotenv.config();

// Get dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zomato-clone')
  .then(() => console.log('Connected to MongoDB for data import'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

const Restaurant = mongoose.model('Restaurant');

// Sample restaurant data
// In a real app, you would fetch this from an API or a larger JSON file
const sampleRestaurants = [
  {
    name: "Spice Delight",
    description: "Authentic Indian cuisine with a modern twist. Our chefs use traditional spices and cooking techniques to create flavorful dishes.",
    location: {
      address: "123 Curry Lane",
      locality: "Downtown",
      city: "Mumbai",
      country: "India",
      coordinates: {
        type: "Point",
        coordinates: [72.8777, 19.0760] // [longitude, latitude]
      }
    },
    cuisines: ["Indian", "Curry", "Vegetarian"],
    average_cost_for_two: 800,
    currency: "₹",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.5,
      rating_text: "Excellent",
      votes: 1245
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        thumb_url: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Butter Chicken with Naan"
      },
      {
        url: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg",
        thumb_url: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Vegetable Biryani"
      }
    ],
    featured_image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    opening_hours: "11:00 AM - 11:00 PM",
    phone_numbers: "+91 9876543210",
    highlights: ["Outdoor Seating", "WiFi", "Live Music"]
  },
  {
    name: "Pasta Paradise",
    description: "Authentic Italian pasta and pizza made with fresh ingredients imported from Italy.",
    location: {
      address: "456 Marinara Street",
      locality: "Little Italy",
      city: "Rome",
      country: "Italy",
      coordinates: {
        type: "Point",
        coordinates: [12.4964, 41.9028] // [longitude, latitude]
      }
    },
    cuisines: ["Italian", "Pizza", "Pasta"],
    average_cost_for_two: 60,
    currency: "€",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.7,
      rating_text: "Excellent",
      votes: 2134
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
        thumb_url: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Spaghetti Carbonara"
      },
      {
        url: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
        thumb_url: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Margherita Pizza"
      }
    ],
    featured_image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
    opening_hours: "12:00 PM - 10:00 PM",
    phone_numbers: "+39 0123456789",
    highlights: ["Wine Selection", "Authentic", "Family Friendly"]
  },
  {
    name: "Sushi Master",
    description: "Traditional Japanese sushi and sashimi prepared by expert chefs with fresh seafood.",
    location: {
      address: "789 Wasabi Way",
      locality: "Shibuya",
      city: "Tokyo",
      country: "Japan",
      coordinates: {
        type: "Point",
        coordinates: [139.7030, 35.6580] // [longitude, latitude]
      }
    },
    cuisines: ["Japanese", "Sushi", "Seafood"],
    average_cost_for_two: 8000,
    currency: "¥",
    has_online_delivery: false,
    is_delivering_now: false,
    has_table_booking: true,
    price_range: 4,
    user_rating: {
      aggregate_rating: 4.9,
      rating_text: "Exceptional",
      votes: 3021
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
        thumb_url: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Assorted Sushi Platter"
      },
      {
        url: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
        thumb_url: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Salmon Sashimi"
      }
    ],
    featured_image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
    opening_hours: "5:00 PM - 11:00 PM",
    phone_numbers: "+81 0123456789",
    highlights: ["Omakase", "Sake Selection", "Chef's Counter"]
  },
  {
    name: "Burger Bistro",
    description: "Gourmet burgers made with premium beef and fresh ingredients. We offer a variety of unique toppings and house-made sauces.",
    location: {
      address: "101 Patty Place",
      locality: "Downtown",
      city: "New York",
      country: "USA",
      coordinates: {
        type: "Point",
        coordinates: [-74.0060, 40.7128] // [longitude, latitude]
      }
    },
    cuisines: ["American", "Burgers", "Fast Food"],
    average_cost_for_two: 40,
    currency: "$",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: false,
    price_range: 2,
    user_rating: {
      aggregate_rating: 4.3,
      rating_text: "Very Good",
      votes: 1876
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        thumb_url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Classic Cheeseburger"
      },
      {
        url: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
        thumb_url: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Loaded Fries"
      }
    ],
    featured_image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    opening_hours: "11:00 AM - 10:00 PM",
    phone_numbers: "+1 212-555-0123",
    highlights: ["Craft Beer", "Outdoor Seating", "Takeout"]
  },
  {
    name: "Taco Fiesta",
    description: "Authentic Mexican tacos, burritos, and quesadillas made with traditional recipes and fresh ingredients.",
    location: {
      address: "202 Salsa Street",
      locality: "Zona Rosa",
      city: "Mexico City",
      country: "Mexico",
      coordinates: {
        type: "Point",
        coordinates: [-99.1332, 19.4326] // [longitude, latitude]
      }
    },
    cuisines: ["Mexican", "Tacos", "Latin American"],
    average_cost_for_two: 400,
    currency: "Mex$",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: false,
    price_range: 2,
    user_rating: {
      aggregate_rating: 4.4,
      rating_text: "Very Good",
      votes: 1543
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
        thumb_url: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Street Tacos"
      },
      {
        url: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg",
        thumb_url: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Chicken Quesadilla"
      }
    ],
    featured_image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
    opening_hours: "10:00 AM - 9:00 PM",
    phone_numbers: "+52 55-1234-5678",
    highlights: ["Margaritas", "Salsa Bar", "Fast Service"]
  },
  {
    name: "Thai Spice",
    description: "Authentic Thai cuisine with bold flavors and fresh ingredients. Our chefs create traditional dishes with a modern presentation.",
    location: {
      address: "303 Lemongrass Lane",
      locality: "Sukhumvit",
      city: "Bangkok",
      country: "Thailand",
      coordinates: {
        type: "Point",
        coordinates: [100.5018, 13.7563] // [longitude, latitude]
      }
    },
    cuisines: ["Thai", "Asian", "Curry"],
    average_cost_for_two: 800,
    currency: "฿",
    has_online_delivery: true,
    is_delivering_now: false,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.6,
      rating_text: "Excellent",
      votes: 1987
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
        thumb_url: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Pad Thai"
      },
      {
        url: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
        thumb_url: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Green Curry"
      }
    ],
    featured_image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
    opening_hours: "11:30 AM - 10:30 PM",
    phone_numbers: "+66 2-123-4567",
    highlights: ["Spicy", "Vegetarian Options", "Street Food"]
  },
  {
    name: "Café Parisienne",
    description: "Charming French café serving pastries, sandwiches, and classic French dishes in an authentic Parisian atmosphere.",
    location: {
      address: "404 Baguette Boulevard",
      locality: "Montmartre",
      city: "Paris",
      country: "France",
      coordinates: {
        type: "Point",
        coordinates: [2.3522, 48.8566] // [longitude, latitude]
      }
    },
    cuisines: ["French", "Café", "Bakery"],
    average_cost_for_two: 50,
    currency: "€",
    has_online_delivery: false,
    is_delivering_now: false,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.5,
      rating_text: "Excellent",
      votes: 1456
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg",
        thumb_url: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Croissants and Coffee"
      },
      {
        url: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg",
        thumb_url: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Coq au Vin"
      }
    ],
    featured_image: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg",
    opening_hours: "7:00 AM - 8:00 PM",
    phone_numbers: "+33 1-23-45-67-89",
    highlights: ["Outdoor Seating", "Pastries", "Wine Selection"]
  },
  {
    name: "Mediterranean Oasis",
    description: "Fresh Mediterranean cuisine featuring mezze platters, kebabs, and seafood dishes made with locally sourced ingredients.",
    location: {
      address: "505 Olive Avenue",
      locality: "Seaside",
      city: "Athens",
      country: "Greece",
      coordinates: {
        type: "Point",
        coordinates: [23.7275, 37.9838] // [longitude, latitude]
      }
    },
    cuisines: ["Mediterranean", "Greek", "Seafood"],
    average_cost_for_two: 55,
    currency: "€",
    has_online_delivery: false,
    is_delivering_now: false,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.8,
      rating_text: "Excellent",
      votes: 2134
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
        thumb_url: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Greek Salad"
      },
      {
        url: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
        thumb_url: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Mezze Platter"
      }
    ],
    featured_image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
    opening_hours: "12:00 PM - 11:00 PM",
    phone_numbers: "+30 21-0123-4567",
    highlights: ["Seaside View", "Fresh Seafood", "Outdoor Dining"]
  },
  {
    name: "Dragon Wok",
    description: "Authentic Chinese cuisine specializing in hand-pulled noodles, dim sum, and traditional stir-fry dishes.",
    location: {
      address: "606 Dumpling Drive",
      locality: "Chinatown",
      city: "Beijing",
      country: "China",
      coordinates: {
        type: "Point",
        coordinates: [116.4074, 39.9042] // [longitude, latitude]
      }
    },
    cuisines: ["Chinese", "Dim Sum", "Noodles"],
    average_cost_for_two: 200,
    currency: "¥",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: true,
    price_range: 2,
    user_rating: {
      aggregate_rating: 4.4,
      rating_text: "Very Good",
      votes: 1765
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
        thumb_url: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Dim Sum"
      },
      {
        url: "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg",
        thumb_url: "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Hand-Pulled Noodles"
      }
    ],
    featured_image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
    opening_hours: "11:00 AM - 10:00 PM",
    phone_numbers: "+86 10-1234-5678",
    highlights: ["Family Style", "Tea Selection", "Chef Specials"]
  },
  {
    name: "Tandoori Nights",
    description: "Northern Indian restaurant specializing in tandoori dishes, curries, and fresh-baked naan bread.",
    location: {
      address: "707 Curry Court",
      locality: "Little India",
      city: "New Delhi",
      country: "India",
      coordinates: {
        type: "Point",
        coordinates: [77.2090, 28.6139] // [longitude, latitude]
      }
    },
    cuisines: ["North Indian", "Tandoori", "Curry"],
    average_cost_for_two: 1200,
    currency: "₹",
    has_online_delivery: true,
    is_delivering_now: true,
    has_table_booking: true,
    price_range: 3,
    user_rating: {
      aggregate_rating: 4.7,
      rating_text: "Excellent",
      votes: 2356
    },
    photos: [
      {
        url: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
        thumb_url: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Tandoori Chicken"
      },
      {
        url: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg",
        thumb_url: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
        caption: "Garlic Naan"
      }
    ],
    featured_image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
    opening_hours: "12:00 PM - 11:00 PM",
    phone_numbers: "+91 11-2345-6789",
    highlights: ["Lunch Buffet", "Vegan Options", "Clay Oven"]
  }
];

// Import data function
const importData = async () => {
  try {
    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Previous data cleared');
    
    // Import new data
    await Restaurant.insertMany(sampleRestaurants);
    
    console.log(`Successfully imported ${sampleRestaurants.length} restaurants`);
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run the import
importData();