/**
 * OPTIMIZED PROPERTY CARD - HIGH PERFORMANCE VERSION
 * 
 * Optimized version of PropertyCard with:
 * - Image lazy loading
 * - Memoization
 * - Reduced re-renders
 * - Memory efficient
 */

import React, { memo, useCallback } from 'react';
import { Heart, MapPin, Eye, Bed, Bath, Home } from 'lucide-react';
import { Property } from '../types';
import { useImageOptimization } from '../hooks/useImageOptimization';

interface OptimizedPropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
}

const OptimizedPropertyCard: React.FC<OptimizedPropertyCardProps> = memo(({ 
  property, 
  onViewDetails,
  onToggleFavorite,
  isFavorite = false
}) => {
  // Optimize main image
  const { imgRef, src, isLoaded, handleLoad, placeholder } = useImageOptimization({
    src: property.images[0],
    width: 400,
    height: 300,
    quality: 80,
    lazy: true
  });

  // Memoized callbacks to prevent unnecessary re-renders
  const handleViewClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(property);
  }, [property, onViewDetails]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(property.id);
  }, [property.id, onToggleFavorite]);

  // Memoized price formatting
  const formattedPrice = React.useMemo(() => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(property.priceMonthly);
  }, [property.priceMonthly]);

  // Memoized amenities preview
  const amenitiesPreview = React.useMemo(() => {
    const visible = property.amenities.slice(0, 3);
    const remaining = property.amenities.length - 3;
    return { visible, remaining };
  }, [property.amenities]);

  return (
    <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Optimized Image Container */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer" onClick={handleViewClick}>
        {/* Placeholder while loading */}
        {placeholder && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Home className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        {/* Optimized Image */}
        <img
          ref={imgRef}
          src={src}
          alt={property.title}
          onLoad={handleLoad}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 transition-all duration-200 shadow-sm"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'
            }`}
          />
        </button>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Location */}
        <div className="flex items-center text-gray-500 mb-1.5 sm:mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-xs sm:text-sm truncate">
            {property.location.city}, {property.location.district}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-sm sm:text-base font-medium text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer leading-tight" 
          onClick={handleViewClick}
        >
          {property.title}
        </h3>

        {/* Property Details */}
        <div className="flex items-center space-x-3 sm:space-x-4 text-gray-600 mb-2 sm:mb-3">
          <div className="flex items-center space-x-1">
            <Bed className="h-3 w-3" />
            <span className="text-xs">{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-3 w-3" />
            <span className="text-xs">{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Home className="h-3 w-3" />
            <span className="text-xs capitalize">{property.propertyType}</span>
          </div>
        </div>

        {/* Price and Action Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-semibold text-gray-900">
              {formattedPrice}
            </span>
            <span className="text-gray-500 text-xs">per month</span>
          </div>

          <button
            onClick={handleViewClick}
            className="flex items-center space-x-1.5 sm:space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>View</span>
          </button>
        </div>

        {/* Amenities Preview */}
        {amenitiesPreview.visible.length > 0 && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {amenitiesPreview.visible.map((amenity) => (
                <span
                  key={amenity}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {amenitiesPreview.remaining > 0 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{amenitiesPreview.remaining} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

OptimizedPropertyCard.displayName = 'OptimizedPropertyCard';

export default OptimizedPropertyCard;