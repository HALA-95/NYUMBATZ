import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Property } from '../types';

/**
 * PropertyCard Component - Individual property display card
 * 
 * Features:
 * - Property image gallery with navigation
 * - Like/favorite functionality with heart icon
 * - Property details (title, location, price)
 * - Hover effects and smooth transitions
 * - Click-to-view property details
 * - Responsive design for all screen sizes
 * - Featured property badge
 * - Image dots indicator for multiple images
 * 
 * @param property - Property object containing all property data
 * @param onViewDetails - Callback function when card is clicked for details
 */
interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  // State for like/favorite functionality
  const [isLiked, setIsLiked] = useState(false);
  // State for current image in gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Format price in Tanzanian Shillings currency
   * Uses Intl.NumberFormat for proper localization
   * 
   * @param price - Price amount in TZS
   * @returns Formatted currency string
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  /**
   * Navigate to next image in gallery
   * Prevents event bubbling to avoid triggering card click
   * Wraps around to first image when reaching the end
   * 
   * @param e - Mouse event from button click
   */
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * Navigate to previous image in gallery
   * Prevents event bubbling to avoid triggering card click
   * Wraps around to last image when at the beginning
   * 
   * @param e - Mouse event from button click
   */
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={() => onViewDetails?.(property)}
    >
      {/* Image Gallery Section */}
      <div className="relative h-64 overflow-hidden">
        {/* Main Property Image */}
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Image Navigation Controls - Only show if multiple images */}
        {property.images.length > 1 && (
          <>
            {/* Previous Image Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
            >
              <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Image Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
            >
              <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Like/Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-sm"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-700'
            }`}
          />
        </button>

        {/* Featured Property Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Property Information Section */}
      <div className="p-4">
        {/* Location with Map Pin Icon */}
        <div className="flex items-center text-gray-500 mb-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-sm">{property.location.city}, {property.location.district}</span>
        </div>

        {/* Property Title */}
        <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {property.title}
        </h3>

        {/* Price Information */}
        <div className="flex items-baseline">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(property.priceMonthly)}
          </span>
          <span className="text-gray-500 text-sm ml-1">/ month</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;