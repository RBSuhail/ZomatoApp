import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { useRestaurantContext } from '../context/RestaurantContext';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setFilters } = useRestaurantContext();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, query: searchQuery }));
      navigate('/search');
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFilters(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
            radius: 3
          }));
          navigate('/search');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please try again or enter your location manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)'
        }}></div>
      </div>
      
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Discover the Best Food & Drinks
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-slideUp">
            Find amazing restaurants, cafés, and bars around you
          </p>
          
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row mb-6 animate-slideUp">
            <form onSubmit={handleSearch} className="flex-1 flex">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search for restaurants, cuisines..." 
                  className="w-full p-3 pl-10 rounded-l-md text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button 
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-r-md font-medium hover:bg-primary-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          
          <button
            onClick={handleUseLocation}
            className="inline-flex items-center text-white bg-secondary/80 hover:bg-secondary px-6 py-3 rounded-full transition-colors shadow-md"
          >
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">Use My Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;