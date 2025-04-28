import axios from 'axios';
import { SearchFilters, SearchResponse, Restaurant } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getRestaurants = async (page = 1, limit = 10, filters?: Partial<SearchFilters>): Promise<SearchResponse> => {
  try {
    const params: Record<string, any> = { page, limit };
    
    if (filters) {
      if (filters.country) params.country = filters.country;
      if (filters.minCost) params.minCost = filters.minCost;
      if (filters.maxCost) params.maxCost = filters.maxCost;
      if (filters.cuisines && filters.cuisines.length > 0) params.cuisine = filters.cuisines[0];
    }
    
    const response = await api.get('/restaurants', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    throw error;
  }
};

export const searchRestaurantsByText = async (query: string, page = 1, limit = 10): Promise<SearchResponse> => {
  try {
    const response = await api.get('/search/text', {
      params: { q: query, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching restaurants by text:', error);
    throw error;
  }
};

export const searchNearbyRestaurants = async (lat: number, lng: number, radius = 3, page = 1, limit = 10): Promise<SearchResponse> => {
  try {
    const response = await api.get('/search/nearby', {
      params: { lat, lng, radius, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching nearby restaurants:', error);
    throw error;
  }
};

export const searchRestaurantsByImage = async (imageFile: File, foodType: string): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    formData.append('foodImage', imageFile);
    formData.append('foodType', foodType);
    
    const response = await api.post('/search/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching restaurants by image:', error);
    throw error;
  }
};