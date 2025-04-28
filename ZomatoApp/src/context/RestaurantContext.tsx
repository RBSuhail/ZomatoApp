import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Restaurant, SearchFilters } from '../types';

interface RestaurantContextType {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  pagination: {
    page: number;
    pages: number;
    total: number;
  };
  setPagination: React.Dispatch<React.SetStateAction<{
    page: number;
    pages: number;
    total: number;
  }>>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    country: '',
    cuisines: [],
    minCost: 0,
    maxCost: 10000,
    lat: null,
    lng: null,
    radius: 3,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  return (
    <RestaurantContext.Provider value={{
      restaurants,
      setRestaurants,
      loading,
      setLoading,
      error,
      setError,
      filters,
      setFilters,
      pagination,
      setPagination
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  return context;
};