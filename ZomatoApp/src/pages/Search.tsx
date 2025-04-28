import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRestaurants, searchNearbyRestaurants, searchRestaurantsByText } from '../utils/api';
import RestaurantsList from '../components/RestaurantsList';
import SearchFilters from '../components/SearchFilters';
import ImageSearch from '../components/ImageSearch';
import { useRestaurantContext } from '../context/RestaurantContext';
import { Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const location = useLocation();
  const { 
    restaurants, 
    setRestaurants, 
    loading, 
    setLoading, 
    setError, 
    filters, 
    pagination, 
    setPagination 
  } = useRestaurantContext();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        let response;

        // If we have coordinates, do a location-based search
        if (filters.lat && filters.lng) {
          response = await searchNearbyRestaurants(
            filters.lat,
            filters.lng,
            filters.radius,
            pagination.page
          );
        }
        // If we have a text query, do a text search
        else if (filters.query) {
          response = await searchRestaurantsByText(filters.query, pagination.page);
        }
        // Otherwise, get restaurants with filters
        else {
          response = await getRestaurants(
            pagination.page,
            10,
            {
              country: filters.country,
              minCost: filters.minCost,
              maxCost: filters.maxCost,
              cuisines: filters.cuisines
            }
          );
        }

        setRestaurants(response.data);
        setPagination({
          page: response.pagination.page,
          pages: response.pagination.pages,
          total: response.pagination.total
        });
        setError(null);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setError('Failed to load search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [filters, pagination.page, setRestaurants, setLoading, setError, setPagination]);

  // Prepare the search result description
  const getSearchResultsDescription = () => {
    let description = '';
    
    if (filters.lat && filters.lng) {
      description = `Restaurants within ${filters.radius}km of your location`;
    } else if (filters.query) {
      description = `Search results for "${filters.query}"`;
    } else if (filters.cuisines.length > 0) {
      description = `${filters.cuisines.join(', ')} restaurants`;
    } else if (filters.country) {
      description = `Restaurants in ${filters.country}`;
    } else {
      description = 'All restaurants';
    }
    
    return description;
  };

  return (
    <div className="bg-background py-8">
      <div className="container-custom">
        <div className="flex items-center mb-6">
          <SearchIcon className="w-6 h-6 text-primary mr-2" />
          <h1 className="text-3xl font-bold">{getSearchResultsDescription()}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <SearchFilters />
            <ImageSearch />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center">
                <p className="text-text-light">
                  {loading ? 'Searching...' : 
                    `Found ${pagination.total} restaurants`}
                </p>
                
                {filters.lat && filters.lng && (
                  <div className="flex items-center">
                    <span className="text-sm text-accent font-medium">
                      Within {filters.radius}km
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <RestaurantsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;