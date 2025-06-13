import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Property } from '../types';

interface FeaturedCarouselProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ 
  properties, 
  onPropertyClick 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === featuredProperties.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredProperties.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === featuredProperties.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredProperties.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (featuredProperties.length === 0) return null;

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mali Maalum / Discover the best properties handpicked for you
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProperties.map((property) => (
                <div
                  key={property.id}
                  className="w-full flex-shrink-0 relative cursor-pointer group"
                  onClick={() => onPropertyClick?.(property)}
                >
                  <div className="relative h-96 lg:h-[500px]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                      <div className="max-w-4xl">
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                          <span className="text-sm font-medium">Featured Property</span>
                        </div>
                        
                        <h3 className="text-2xl lg:text-4xl font-bold mb-3 group-hover:text-teal-300 transition-colors">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-200 mb-4">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span className="text-lg">
                            {property.location.city}, {property.location.district}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-3xl lg:text-4xl font-bold text-teal-300">
                            {formatPrice(property.priceMonthly)}
                            <span className="text-lg text-gray-300 ml-2">/ month</span>
                          </div>
                          
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800 group-hover:text-teal-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 group"
          >
            <ChevronRight className="h-6 w-6 text-gray-800 group-hover:text-teal-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-teal-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Properties Button */}
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