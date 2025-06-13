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
    <div className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-blue-600/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find Your Perfect
            <span className="block text-teal-600 mt-1 sm:mt-2">Home in Tanzania</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Discover beautiful houses and apartments for rent across Tanzania's major cities. 
            Your dream home is just a click away.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
              {/* Mobile-First Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Location / Eneo
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <select
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                      className="pl-10 sm:pl-10 w-full p-3 sm:p-3 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm sm:text-base appearance-none bg-white"
                    >
                      <option value="">All Cities / Miji Yote</option>
                      {tanzanianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Property Type / Aina ya Mali
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <select
                      value={searchFilters.houseType}
                      onChange={(e) => setSearchFilters({ ...searchFilters, houseType: e.target.value })}
                      className="pl-10 sm:pl-10 w-full p-3 sm:p-3 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm sm:text-base appearance-none bg-white"
                    >
                      <option value="">All Types / Aina Zote</option>
                      <option value="house">House / Nyumba</option>
                      <option value="apartment">Apartment / Ghorofa</option>
                      <option value="studio">Studio</option>
                      <option value="villa">Villa</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Bedrooms / Vyumba
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <select
                      value={searchFilters.bedrooms || ''}
                      onChange={(e) => setSearchFilters({ ...searchFilters, bedrooms: e.target.value ? parseInt(e.target.value) : null })}
                      className="pl-10 sm:pl-10 w-full p-3 sm:p-3 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm sm:text-base appearance-none bg-white"
                    >
                      <option value="">Any / Yoyote</option>
                      <option value="1">1+ bedroom</option>
                      <option value="2">2+ bedrooms</option>
                      <option value="3">3+ bedrooms</option>
                      <option value="4">4+ bedrooms</option>
                      <option value="5">5+ bedrooms</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Max Price / Bei ya Juu (TSh)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                      TSh
                    </span>
                    <select
                      value={searchFilters.priceRange?.max || 3000000}
                      onChange={(e) => setSearchFilters({ 
                        ...searchFilters, 
                        priceRange: { ...searchFilters.priceRange, max: parseInt(e.target.value) }
                      })}
                      className="pl-12 sm:pl-12 w-full p-3 sm:p-3 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm sm:text-base appearance-none bg-white"
                    >
                      <option value={3000000}>Any Price / Bei Yoyote</option>
                      <option value={300000}>300K</option>
                      <option value={500000}>500K</option>
                      <option value={750000}>750K</option>
                      <option value={1000000}>1M</option>
                      <option value={1500000}>1.5M</option>
                      <option value={2000000}>2M</option>
                      <option value={2500000}>2.5M</option>
                      <option value={3000000}>3M+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:transform active:translate-y-0"
              >
                <Search className="h-5 w-5" />
                <span>Search Properties / Tafuta Mali</span>
              </button>

              {/* Quick Search Tips - Mobile Friendly */}
              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-gray-600">
                  Quick tips: Try "Mbeya 500k", "3 bedrooms Dar", or "apartment parking"
                </p>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Properties Listed</div>
              <div className="text-gray-500 text-xs">Mali Zilizoorodheshwa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 text-sm sm:text-base">Cities Covered</div>
              <div className="text-gray-500 text-xs">Miji Iliyoshughulikiwa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Happy Tenants</div>
              <div className="text-gray-500 text-xs">Wapangaji Wenye Furaha</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;