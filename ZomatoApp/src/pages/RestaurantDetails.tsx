import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurantById } from '../utils/api';
import { Restaurant } from '../types';
import { Star, MapPin, Clock, Phone, DollarSign, ChevronLeft, Utensils, Globe, Check } from 'lucide-react';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getRestaurantById(id);
        setRestaurant(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
        setError('Failed to load restaurant details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-error mb-4">{error || 'Restaurant not found'}</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

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

  // Photos to display (including featured image)
  const allPhotos = [
    { url: restaurant.featured_image, thumb_url: restaurant.featured_image, caption: restaurant.name },
    ...restaurant.photos
  ];

  return (
    <div className="bg-background pb-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src={restaurant.featured_image || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-xl opacity-80">{restaurant.cuisines.join(', ')}</p>
          </div>
        </div>
        
        <Link to="/" className="absolute top-4 left-4 flex items-center text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="container-custom -mt-16 relative z-10">
        {/* Quick Info Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center bg-primary px-3 py-1 rounded-lg mr-4">
                <Star className="w-5 h-5 text-white mr-1" />
                <span className="text-white font-bold">{restaurant.user_rating.aggregate_rating}</span>
              </div>
              <div>
                <p className="font-medium">{restaurant.user_rating.rating_text}</p>
                <p className="text-sm text-text-light">{restaurant.user_rating.votes} reviews</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center mr-6 mb-2 md:mb-0">
                <Clock className="w-5 h-5 text-accent mr-2" />
                <span>{restaurant.opening_hours || 'Opening hours not available'}</span>
              </div>
              <div className="flex">
                {renderPriceRange(restaurant.price_range)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2">
            {/* Photos Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Photos</h2>
              
              {/* Main Photo */}
              <div className="mb-4 rounded-lg overflow-hidden h-80">
                <img 
                  src={allPhotos[activePhotoIndex]?.url || restaurant.featured_image} 
                  alt={allPhotos[activePhotoIndex]?.caption || restaurant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {allPhotos.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allPhotos.slice(0, 5).map((photo, index) => (
                    <div 
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                        activePhotoIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={photo.thumb_url || photo.url} 
                        alt={photo.caption || `${restaurant.name} photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-text mb-6">{restaurant.description}</p>
              
              <h3 className="font-semibold mb-2">Cuisines</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {restaurant.cuisines.map(cuisine => (
                  <span key={cuisine} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {cuisine}
                  </span>
                ))}
              </div>
              
              <h3 className="font-semibold mb-2">Average Cost</h3>
              <p className="mb-6">
                {restaurant.currency}{restaurant.average_cost_for_two} for two people (approx.)
              </p>
              
              {restaurant.highlights.length > 0 && (
                <>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    {restaurant.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-accent mr-2" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Right Column - Location, Contact */}
          <div>
            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" />
                <p>{restaurant.location.address}, {restaurant.location.locality}, {restaurant.location.city}, {restaurant.location.country}</p>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-60 bg-gray-200 rounded-md mb-4 overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  src={`https://www.google.com/maps/embed/v1/place?key=xxx.yyy.zzz=${encodeURIComponent(
                    `${restaurant.location.address}, ${restaurant.location.city}, ${restaurant.location.country}`
                  )}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              
              {restaurant.phone_numbers && (
                <div className="flex items-center mb-4">
                  <Phone className="w-5 h-5 text-primary mr-2" />
                  <p>{restaurant.phone_numbers}</p>
                </div>
              )}
              
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-primary mr-2" />
                <p className="text-primary">Website</p>
              </div>
            </div>
            
            {/* Additional Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">More Info</h2>
              
              <div className="grid grid-cols-2 gap-y-3">
                <div>
                  <p className="text-text-light text-sm">Online Delivery</p>
                  <p className="font-medium">{restaurant.has_online_delivery ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-text-light text-sm">Table Booking</p>
                  <p className="font-medium">{restaurant.has_table_booking ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-text-light text-sm">Delivering Now</p>
                  <p className="font-medium">{restaurant.is_delivering_now ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-text-light text-sm">Cuisine Type</p>
                  <p className="font-medium">{restaurant.cuisines[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
