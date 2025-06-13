import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Property } from '../types';

/**
 * FeaturedCarousel Component - Displays featured properties in an auto-advancing carousel
 * 
 * Features:
 * - Auto-advancing slides every 5 seconds
 * - Manual navigation with arrow buttons
 * - Dot indicators for direct slide access
 * - Responsive design with overlay content
 * - Property details display (price, location, specs)
 * - Click-to-view property details
 * - Smooth transitions and hover effects
 * 
 * @param properties - Array of all properties to filter for featured ones
 * @param onPropertyClick - Callback function when a property is clicked
 */
interface FeaturedCarouselProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ 
  properties, 
  onPropertyClick 
}) => {
  // State for tracking current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Filter properties to show only featured ones (max 6)
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  /**
   * Auto-advance carousel effect
   * Sets up interval to automatically move to next slide every 5 seconds
   * Cleans up interval on component unmount or dependency change
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === featuredProperties.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [featuredProperties.length]);

  /**
   * Navigate to next slide
   * Wraps around to first slide when reaching the end
   */
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === featuredProperties.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * Navigate to previous slide
   * Wraps around to last slide when at the beginning
   */
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredProperties.length - 1 : prev - 1
    );
  };

  /**
   * Format price in Tanzanian Shillings
   * Uses Intl.NumberFormat for proper currency formatting
   * 
   * @param price - Price amount in TZS
   * @returns Formatted price string
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Don't render if no featured properties
  if (featuredProperties.length === 0) return null;

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mali Maalum / Discover the best properties handpicked for you
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container with overflow hidden for slide effect */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Map through featured properties to create slides */}
              {featuredProperties.map((property) => (
                <div
                  key={property.id}
                  className="w-full flex-shrink-0 relative cursor-pointer group"
                  onClick={() => onPropertyClick?.(property)}
                >
                  {/* Property Image with hover effects */}
                  <div className="relative h-96 lg:h-[500px]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content Overlay with property details */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                      <div className="max-w-4xl">
                        {/* Featured Badge */}
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                          <span className="text-sm font-medium">Featured Property</span>
                        </div>
                        
                        {/* Property Title with hover effect */}
                        <h3 className="text-2xl lg:text-4xl font-bold mb-3 group-hover:text-teal-300 transition-colors">
                          {property.title}
                        </h3>
                        
                        {/* Location with map pin icon */}
                        <div className="flex items-center text-gray-200 mb-4">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span className="text-lg">
                            {property.location.city}, {property.location.district}
                          </span>
                        </div>
                        
                        {/* Price and Property Specifications */}
                        <div className="flex items-center justify-between">
                          {/* Monthly Price Display */}
                          <div className="text-3xl lg:text-4xl font-bold text-teal-300">
                            {formatPrice(property.priceMonthly)}
                            <span className="text-lg text-gray-300 ml-2">/ month</span>
                          </div>
                          
                          {/* Property Specs - Hidden on small screens */}
                          <div className="hidden sm:flex items-center space-x-6 text-gray-200">
                            <div className="text-center">
                              <div className="text-2xl font-bold">{property.bedrooms}</div>
                              <div className="text-sm">Bedrooms</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{property.bathrooms}</div>
                              <div className="text-sm">Bathrooms</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold capitalize">{property.propertyType}</div>
                              <div className="text-sm">Type</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Previous slide button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800 group-hover:text-teal-600" />
          </button>
          
          {/* Navigation Arrows - Next slide button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 group"
          >
            <ChevronRight className="h-6 w-6 text-gray-800 group-hover:text-teal-600" />
          </button>

          {/* Dot Indicators for direct slide navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-teal-600 w-8' // Active dot is wider and colored
                    : 'bg-gray-300 hover:bg-gray-400' // Inactive dots
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-12">
          <button className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Properties / Ona Mali Zote
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;