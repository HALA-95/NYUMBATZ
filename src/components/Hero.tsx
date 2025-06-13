import React, { useState } from 'react';
import { Search, MapPin, Home, Users } from 'lucide-react';
import { tanzanianCities } from '../data/mockData';
import { SearchFilters } from '../types';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    priceRange: { min: 0, max: 3000000 },
    bedrooms: null,
    bathrooms: null,
    houseType: '',
    amenities: []
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchFilters);
  };

  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-blue-600/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block text-teal-600 mt-2">Home in Tanzania</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover beautiful houses and apartments for rent across Tanzania's major cities. 
            Your dream home is just a click away.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">All Cities</option>
                      {tanzanianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* House Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.houseType}
                      onChange={(e) => setSearchFilters({ ...searchFilters, houseType: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">All Types</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={searchFilters.bedrooms || ''}
                      onChange={(e) => setSearchFilters({ ...searchFilters, bedrooms: e.target.value ? parseInt(e.target.value) : null })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (TSh)</label>
                  <select
                    value={searchFilters.priceRange.max}
                    onChange={(e) => setSearchFilters({ 
                      ...searchFilters, 
                      priceRange: { ...searchFilters.priceRange, max: parseInt(e.target.value) }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  >
                    <option value={3000000}>Any Price</option>
                    <option value={500000}>500K</option>
                    <option value={1000000}>1M</option>
                    <option value={1500000}>1.5M</option>
                    <option value={2000000}>2M</option>
                    <option value={2500000}>2.5M</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Search className="h-5 w-5" />
                <span>Search Properties</span>
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Tenants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;