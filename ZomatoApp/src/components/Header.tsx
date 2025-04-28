import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, MapPin } from 'lucide-react';
import { useRestaurantContext } from '../context/RestaurantContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { setFilters } = useRestaurantContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Zomato<span className="text-accent">Clone</span></h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-dark hover:text-primary transition-colors">Home</Link>
            <button 
              onClick={handleUseLocation}
              className="flex items-center text-text-dark hover:text-primary transition-colors"
            >
              <MapPin className="w-5 h-5 mr-1" />
              <span>Near Me</span>
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1 rounded-full hover:bg-primary-dark transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideUp">
          <div className="container-custom py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1 rounded-full hover:bg-primary-dark transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="py-2 px-4 hover:bg-gray-100 rounded-md">Home</Link>
              <button 
                onClick={handleUseLocation}
                className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-left"
              >
                <MapPin className="w-5 h-5 mr-2" />
                <span>Near Me</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;