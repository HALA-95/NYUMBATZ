import React, { useState } from 'react';
import { Search, MapPin, Home, Users } from 'lucide-react';
import { tanzanianCities } from '../data/mockData';
import { SearchFilters } from '../types';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Hero Component - Main landing section with search functionality
 * 
 * Features:
 * - Prominent headline with call-to-action
 * - Advanced search form with multiple filters
 * - Location, property type, bedroom, and price filters
 * - Statistics display (properties, cities, tenants)
 * - Responsive design with gradient background
 * - Bilingual support (English/Swahili)
 * 
 * @param onSearch - Callback function to handle search form submission
 */
interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  // Translation hook for bilingual support
  const { t } = useTranslation();
  
  // State for managing search filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    priceRange: { min: 0, max: 3000000 },
    bedrooms: null,
    bathrooms: null,
    houseType: '',
    amenities: []
  });

  /**
   * Handles search form submission
   * Prevents default form behavior and calls onSearch callback with current filters
   * 
   * @param e - Form submission event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchFilters);
  };

  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 py-16 lg:py-24">
      {/* Background overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-blue-600/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline - Split into multiple lines for better visual impact */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {/* First part of the title */}
            {t.heroTitle.split(' ').slice(0, 3).join(' ')}
            {/* Highlighted second part with brand color */}
            <span className="block text-teal-600 mt-2">
              {t.heroTitle.split(' ').slice(3).join(' ')}
            </span>
          </h1>
          
          {/* Subtitle with description */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Advanced Search Form - Main interaction element */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search Filters Grid - Responsive layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Location Filter - Dropdown with Tanzanian cities */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.location}</label>
                  <div className="relative">
                    {/* Map pin icon for location context */}
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">{t.allCities}</option>
                      {/* Map through Tanzanian cities from mock data */}
                      {tanzanianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Property Type Filter - House, apartment, studio, villa */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.propertyType}</label>
                  <div className="relative">
                    {/* Home icon for property type context */}
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.houseType}
                      onChange={(e) => setSearchFilters({ ...searchFilters, houseType: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">{t.allTypes}</option>
                      <option value="house">{t.house}</option>
                      <option value="apartment">{t.apartment}</option>
                      <option value="studio">{t.studio}</option>
                      <option value="villa">{t.villa}</option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms Filter - Number of bedrooms selector */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.bedrooms}</label>
                  <div className="relative">
                    {/* Users icon representing occupancy */}
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.bedrooms || ''}
                      onChange={(e) => setSearchFilters({ ...searchFilters, bedrooms: e.target.value ? parseInt(e.target.value) : null })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">{t.any}</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>

                {/* Price Range Filter - Maximum price selector */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.maxPrice}</label>
                  <select
                    value={searchFilters.priceRange?.max || 3000000}
                    onChange={(e) => setSearchFilters({ 
                      ...searchFilters, 
                      priceRange: { ...searchFilters.priceRange, max: parseInt(e.target.value) }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  >
                    <option value={3000000}>{t.anyPrice}</option>
                    <option value={500000}>500K</option>
                    <option value={1000000}>1M</option>
                    <option value={1500000}>1.5M</option>
                    <option value={2000000}>2M</option>
                    <option value={2500000}>2.5M</option>
                  </select>
                </div>
              </div>

              {/* Search Submit Button - Prominent call-to-action */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Search className="h-5 w-5" />
                <span>{t.searchProperties}</span>
              </button>
            </form>
          </div>

          {/* Statistics Section - Platform metrics display */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Properties Listed Stat */}
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">{t.propertiesListed}</div>
            </div>
            {/* Cities Covered Stat */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">{t.citiesCovered}</div>
            </div>
            {/* Happy Tenants Stat */}
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">{t.happyTenants}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;