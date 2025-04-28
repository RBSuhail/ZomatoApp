import React from 'react';
import { useRestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RestaurantsList: React.FC = () => {
  const { restaurants, loading, error, pagination, setPagination } = useRestaurantContext();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      // The parent component should handle fetching new data when pagination changes
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-error mb-4">{error}</p>
        <button 
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
        <p className="text-text-light">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`p-2 rounded-md ${
                pagination.page === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-text-dark hover:bg-gray-100'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Generate page buttons */}
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-md ${
                    pagination.page === pageNum
                      ? 'bg-primary text-white'
                      : 'text-text-dark hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className={`p-2 rounded-md ${
                pagination.page === pagination.pages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-text-dark hover:bg-gray-100'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default RestaurantsList;