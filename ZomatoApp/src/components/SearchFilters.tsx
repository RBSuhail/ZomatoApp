import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useRestaurantContext } from '../context/RestaurantContext';

const CUISINE_OPTIONS = [
  'Indian', 'Italian', 'Chinese', 'Japanese', 'Thai', 
  'Mexican', 'French', 'Mediterranean', 'American', 'Greek'
];

const COUNTRY_OPTIONS = [
  'India', 'Italy', 'China', 'Japan', 'Thailand', 
  'Mexico', 'France', 'Greece', 'USA'
];

const SearchFilters: React.FC = () => {
  const { filters, setFilters } = useRestaurantContext();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, country: e.target.value }));
  };

  const handleCuisineToggle = (cuisine: string) => {
    setFilters(prev => {
      const cuisines = prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine];
      return { ...prev, cuisines };
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, minCost: min, maxCost: max }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, radius: parseInt(e.target.value) }));
  };

  const clearFilters = () => {
    setFilters({
      query: filters.query, // Keep the search query
      country: '',
      cuisines: [],
      minCost: 0,
      maxCost: 10000,
      lat: filters.lat, // Keep location if set
      lng: filters.lng,
      radius: 3,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <span className="text-sm text-gray-500">
          {filters.cuisines.length > 0 || filters.country || filters.minCost > 0 || filters.maxCost < 10000
            ? `${filters.cuisines.length + (filters.country ? 1 : 0) + (filters.minCost > 0 || filters.maxCost < 10000 ? 1 : 0)} filters applied`
            : 'No filters applied'}
        </span>
      </div>

      {isFiltersOpen && (
        <div className="p-4 border-t border-gray-100 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={filters.country}
                onChange={handleCountryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Countries</option>
                {COUNTRY_OPTIONS.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handlePriceRangeChange(0, 20)}
                  className={`flex-1 p-2 border rounded-md text-sm ${
                    filters.minCost === 0 && filters.maxCost === 20
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  $ (Budget)
                </button>
                <button 
                  onClick={() => handlePriceRangeChange(20, 50)}
                  className={`flex-1 p-2 border rounded-md text-sm ${
                    filters.minCost === 20 && filters.maxCost === 50
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  $$ (Medium)
                </button>
                <button 
                  onClick={() => handlePriceRangeChange(50, 10000)}
                  className={`flex-1 p-2 border rounded-md text-sm ${
                    filters.minCost === 50 && filters.maxCost === 10000
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  $$$ (Luxury)
                </button>
              </div>
            </div>

            {/* Distance Range (only visible if location is set) */}
            {filters.lat && filters.lng && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (within {filters.radius} km)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={filters.radius}
                  onChange={handleRadiusChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1km</span>
                  <span>5km</span>
                  <span>10km</span>
                </div>
              </div>
            )}
          </div>

          {/* Cuisines Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisines</label>
            <div className="flex flex-wrap gap-2">
              {CUISINE_OPTIONS.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filters.cuisines.includes(cuisine)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;