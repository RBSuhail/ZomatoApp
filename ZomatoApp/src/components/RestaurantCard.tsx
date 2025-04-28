import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  // Helper function to render price range
  const renderPriceRange = (range: number) => {
    const dollars = [];
    for (let i = 0; i < 4; i++) {
      dollars.push(
        <DollarSign
          key={i}
          className={`w-4 h-4 ${i < range ? 'text-secondary' : 'text-gray-300'}`}
        />
      );
    }
    return dollars;
  };

  return (
    <Link 
      to={`/restaurant/${restaurant._id}`}
      className="card group hover:translate-y-[-4px]"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.featured_image || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center">
          <div className="flex items-center bg-white px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-secondary mr-1" />
            <span className="font-bold text-sm">{restaurant.user_rating.aggregate_rating}</span>
            <span className="text-gray-500 text-xs ml-1">({restaurant.user_rating.votes})</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{restaurant.name}</h3>
        <p className="text-sm text-text-light line-clamp-1 mb-2">
          {restaurant.cuisines.join(', ')}
        </p>
        <div className="flex items-center text-text-light mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm truncate">{restaurant.location.locality || restaurant.location.city}, {restaurant.location.country}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            {renderPriceRange(restaurant.price_range)}
          </div>
          <div className="flex items-center text-sm text-accent-dark">
            <Clock className="w-4 h-4 mr-1" />
            <span>{restaurant.is_delivering_now ? 'Delivering Now' : 'View Hours'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;