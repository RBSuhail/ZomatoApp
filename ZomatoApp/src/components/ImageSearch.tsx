import React, { useState } from 'react';
import { Upload, Image, X } from 'lucide-react';
import { searchRestaurantsByImage } from '../utils/api';
import { useRestaurantContext } from '../context/RestaurantContext';

const ImageSearch: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [foodType, setFoodType] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const { setRestaurants, setLoading, setError, setPagination } = useRestaurantContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to search');
      return;
    }
    
    try {
      setUploading(true);
      setLoading(true);
      
      const response = await searchRestaurantsByImage(selectedFile, foodType || 'food');
      
      setRestaurants(response.data);
      setPagination({
        page: response.pagination.page,
        pages: response.pagination.pages,
        total: response.pagination.total
      });
      
      setError(null);
    } catch (error) {
      console.error('Error during image search:', error);
      setError('Failed to search by image. Please try again.');
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Image className="w-5 h-5 mr-2 text-primary" />
        <span>Search by Food Image</span>
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Type (helps improve search results)
          </label>
          <input
            type="text"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            placeholder="e.g., pizza, sushi, curry"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="mb-6">
          {preview ? (
            <div className="relative">
              <img 
                src={preview} 
                alt="Food preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Remove image"
              >
                <X className="w-5 h-5 text-error" />
              </button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => document.getElementById('food-image-upload')?.click()}
            >
              <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload a food image or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: JPG, PNG, WebP
              </p>
            </div>
          )}
          <input
            id="food-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        <button
          type="submit"
          disabled={!selectedFile || uploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            !selectedFile || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark transition-colors'
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            'Search by Image'
          )}
        </button>
      </form>
    </div>
  );
};

export default ImageSearch;