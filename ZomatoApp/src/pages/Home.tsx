import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import RestaurantsList from '../components/RestaurantsList';
import { ArrowRight, Utensils, MapPin, Trophy } from 'lucide-react';
import { useRestaurantContext } from '../context/RestaurantContext';
import { getRestaurants } from '../utils/api';
import { Link } from 'react-router-dom';

const popularCuisines = [
  { name: 'Italian', image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg' },
  { name: 'Indian', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
  { name: 'Mexican', image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg' },
  { name: 'Japanese', image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg' },
  { name: 'Thai', image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg' },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg' }
];

const Home: React.FC = () => {
  const { 
    restaurants, 
    setRestaurants, 
    setLoading, 
    setError, 
    pagination, 
    setPagination, 
    setFilters 
  } = useRestaurantContext();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await getRestaurants();
        setRestaurants(response.data);
        setPagination({
          page: response.pagination.page,
          pages: response.pagination.pages,
          total: response.pagination.total
        });
        setError(null);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [setRestaurants, setLoading, setError, setPagination]);

  const handleCuisineClick = (cuisine: string) => {
    setFilters(prev => ({ ...prev, cuisines: [cuisine] }));
  };

  return (
    <div>
      <Hero />
      
      {/* Top Rated Restaurants */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Top Rated Restaurants</h2>
              <p className="text-text-light">Discover the highest-rated places near you</p>
            </div>
            <Link 
              to="/search" 
              className="hidden md:flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <span className="font-medium">View all</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          <RestaurantsList />
        </div>
      </section>
      
      {/* Popular Cuisines */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-2 text-center">Popular Cuisines</h2>
          <p className="text-text-light text-center mb-8">Explore restaurants by your favorite cuisine</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCuisines.map((cuisine) => (
              <Link 
                key={cuisine.name}
                to="/search"
                onClick={() => handleCuisineClick(cuisine.name)}
                className="group"
              >
                <div className="relative rounded-lg overflow-hidden h-36 shadow-md group-hover:shadow-lg transition-shadow">
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <h3 className="text-white font-semibold">{cuisine.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Why Choose ZomatoClone?</h2>
            <p className="text-text-light">We help you find the perfect dining experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-md border border-gray-100 bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Restaurants</h3>
              <p className="text-text-light">We carefully select the best restaurants to ensure high quality dining experiences.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-md border border-gray-100 bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 text-secondary rounded-full mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nearby Options</h3>
              <p className="text-text-light">Find the perfect dining options close to your location with our accurate search feature.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-md border border-gray-100 bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-text-light">Real customer reviews and ratings to help you make the best dining decisions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;