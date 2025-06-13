import React, { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import PropertyDetails from '../components/PropertyDetails';
import { mockProperties } from '../data/mockData';
import { Property, SearchFilters as SearchFiltersType } from '../types';

const HomePage: React.FC = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'featured'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const applyFilters = (newFilters: SearchFiltersType, query: string = searchQuery) => {
    let filtered = [...properties];

    // Text search filter - enhanced to handle multiple search terms
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const searchTerms = searchTerm.split(' ').filter(term => term.length > 0);
      
      filtered = filtered.filter(property => {
        const searchableText = [
          property.title,
          property.location.city,
          property.location.district,
          property.location.neighborhood || '',
          property.description,
          property.propertyType,
          property.priceMonthly.toString(),
          property.bedrooms.toString(),
          property.bathrooms.toString(),
          ...property.amenities
        ].join(' ').toLowerCase();

        // Check if any search term matches
        return searchTerms.some(term => {
          // Check for exact matches or partial matches
          if (searchableText.includes(term)) return true;
          
          // Check for price ranges (e.g., "500k", "1m", "2.5m")
          if (term.includes('k') || term.includes('m')) {
            const priceValue = parseFloat(term.replace(/[km]/g, ''));
            const multiplier = term.includes('m') ? 1000000 : 1000;
            const searchPrice = priceValue * multiplier;
            const propertyPrice = property.priceMonthly;
            
            // Allow for price range matching (±20%)
            return Math.abs(propertyPrice - searchPrice) <= (searchPrice * 0.2);
          }
          
          // Check for numeric price matches
          if (!isNaN(Number(term))) {
            const searchPrice = Number(term);
            return Math.abs(property.priceMonthly - searchPrice) <= (searchPrice * 0.1);
          }
          
          return false;
        });
      });
      
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }

    // Location filter
    if (newFilters.location) {
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(newFilters.location!.toLowerCase())
      );
    }

    // Price range filter
    if (newFilters.priceMin) {
      filtered = filtered.filter(property => property.priceMonthly >= newFilters.priceMin!);
    }
    if (newFilters.priceMax) {
      filtered = filtered.filter(property => property.priceMonthly <= newFilters.priceMax!);
    }

    // Property type filter
    if (newFilters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === newFilters.propertyType);
    }

    // Bedrooms filter
    if (newFilters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= newFilters.bedrooms!);
    }

    // Bathrooms filter
    if (newFilters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= newFilters.bathrooms!);
    }

    // Amenities filter
    if (newFilters.amenities && newFilters.amenities.length > 0) {
      filtered = filtered.filter(property => 
        newFilters.amenities!.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceMonthly - b.priceMonthly);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceMonthly - a.priceMonthly);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    setFilteredProperties(filtered);
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: typeof sortBy) => {
    setSortBy(newSortBy);
    applyFilters(filters, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(filters, query);
  };

  const handleHeroSearch = (heroFilters: SearchFiltersType) => {
    applyFilters(heroFilters, searchQuery);
  };

  // Listen for search from header (via URL params or global state)
  useEffect(() => {
    const handleHeaderSearch = (event: CustomEvent) => {
      const query = event.detail;
      handleSearch(query);
    };

    // Listen for custom search events
    window.addEventListener('headerSearch', handleHeaderSearch as EventListener);
    
    return () => {
      window.removeEventListener('headerSearch', handleHeaderSearch as EventListener);
    };
  }, []);

  // Apply filters when sortBy changes
  useEffect(() => {
    applyFilters(filters, searchQuery);
  }, [sortBy]);

  if (selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty}
        onBack={() => setSelectedProperty(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show Hero if not searching */}
      {!showSearchResults && <Hero onSearch={handleHeroSearch} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        {showSearchResults && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">
                  Search Results for: "{searchQuery}"
                </h2>
                <p className="text-blue-700">
                  Found {filteredProperties.length} properties matching your search
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                  applyFilters(filters, '');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {showSearchResults ? 'Search Results' : `${filteredProperties.length} Properties Available`}
            </h2>
            <p className="text-gray-600 mt-1">
              {showSearchResults 
                ? `${filteredProperties.length} properties found`
                : `Mali ${filteredProperties.length} zinapatikana Tanzania`
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => applyFilters(newFilters, searchQuery)}
                  onClose={() => setShowFilters(false)}
                  isOpen={showFilters}
                />
              </div>
            </div>
          )}

          {/* Properties Grid/List */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="h-24 w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {showSearchResults ? `No properties found for "${searchQuery}"` : 'No properties found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {showSearchResults 
                    ? 'Try searching with different keywords like location, price, or property type'
                    : 'Try adjusting your filters or search criteria / Jaribu kubadilisha vigezo vyako vya utafutaji'
                  }
                </p>
                {showSearchResults && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Search examples: "Mbeya", "500000", "apartment", "3 bedrooms", "parking"
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                        applyFilters(filters, '');
                      }}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear search and show all properties
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Load More Properties / Pakia Mali Zaidi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;