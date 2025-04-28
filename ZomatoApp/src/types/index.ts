export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  location: {
    address: string;
    locality: string;
    city: string;
    country: string;
    coordinates: {
      type: string;
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  cuisines: string[];
  average_cost_for_two: number;
  currency: string;
  has_online_delivery: boolean;
  is_delivering_now: boolean;
  has_table_booking: boolean;
  price_range: number;
  user_rating: {
    aggregate_rating: number;
    rating_text: string;
    votes: number;
  };
  photos: {
    url: string;
    thumb_url: string;
    caption: string;
  }[];
  featured_image: string;
  opening_hours: string;
  phone_numbers: string;
  highlights: string[];
}

export interface SearchFilters {
  query: string;
  country: string;
  cuisines: string[];
  minCost: number;
  maxCost: number;
  lat: number | null;
  lng: number | null;
  radius: number;
}

export interface SearchResponse {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}