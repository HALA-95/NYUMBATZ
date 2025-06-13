import React, { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import PropertyDetails from '../components/PropertyDetails';
import { mockProperties } from '../data/mockData';
import { Property, SearchFilters as SearchFiltersType } from '../types';

const PROPERTIES_PER_PAGE = 9; // Show 9 properties initially, then load 6 more each time

const HomePage: React.FC = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProperties, setHasMoreProperties] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Reset pagination when filters change
    setCurrentPage(1);
    updateDisplayedProperties(filtered, 1);
  };

  const updateDisplayedProperties = (allProperties: Property[], page: number) => {
    const startIndex = 0;
    const endIndex = page === 1 ? PROPERTIES_PER_PAGE : PROPERTIES_PER_PAGE + (page - 1) * 6;
    const newDisplayed = allProperties.slice(startIndex, endIndex);
    
    setDisplayedProperties(newDisplayed);
    setHasMoreProperties(endIndex < allProperties.length);
  };

  const loadMoreProperties = () => {
    if (isLoading || !hasMoreProperties) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateDisplayedProperties(filteredProperties, nextPage);
      setIsLoading(false);
    }, 800);
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
    // When hero search is used, also set search results mode
    setShowSearchResults(true);
    applyFilters(heroFilters, searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
    applyFilters(filters, '');
  };

  // Listen for search from header
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

  // Initialize displayed properties
  useEffect(() => {
    updateDisplayedProperties(filteredProperties, 1);
  }, [filteredProperties]);

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
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Results Header - Mobile-First */}
        {showSearchResults && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="text-center sm:text-left">
                <h2 className="text-base sm:text-lg font-semibold text-blue-900">
                  {searchQuery ? `Search Results for: "${searchQuery}"` : 'Filtered Results'}
                </h2>
                <p className="text-sm sm:text-base text-blue-700">
                  Found {filteredProperties.length} properties {searchQuery ? 'matching your search' : 'matching your criteria'}
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                {searchQuery ? 'Clear Search' : 'Show All'}
              </button>
            </div>
          </div>
        )}

        {/* Results Header - Mobile-First */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0 mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {showSearchResults ? 'Search Results' : `${filteredProperties.length} Properties Available`}
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {showSearchResults 
                ? `${filteredProperties.length} properties found • Showing ${displayedProperties.length} of ${filteredProperties.length}`
                : `Mali ${filteredProperties.length} zinapatikana Tanzania • Showing ${displayedProperties.length} of ${filteredProperties.length}`
              }
            </p>
          </div>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 lg:space-x-4">
            {/* Sort Dropdown - Responsive */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Toggle - Hidden on Mobile, Responsive on larger screens */}
            <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <Grid className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <List className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>

            {/* Filters Toggle - Mobile-First */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm lg:text-base"
            >
              <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Sidebar - Mobile-First */}
          {showFilters && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-16 sm:top-20 lg:top-24">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => applyFilters(newFilters, searchQuery)}
                  onClose={() => setShowFilters(false)}
                  isOpen={showFilters}
                />
              </div>
            </div>
          )}

          {/* Properties Grid/List - Mobile-First */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                  {showSearchResults ? `No properties found${searchQuery ? ` for "${searchQuery}"` : ''}` : 'No properties found'}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
                  {showSearchResults 
                    ? 'Try searching with different keywords like location, price, or property type'
                    : 'Try adjusting your filters or search criteria / Jaribu kubadilisha vigezo vyako vya utafutaji'
                  }
                </p>
                {showSearchResults && (
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-gray-500 px-4">
                      Search examples: "Mbeya", "500000", "apartment", "3 bedrooms", "parking"
                    </p>
                    <button
                      onClick={clearSearch}
                      className="text-blue-600 hover:text-blue-800 underline text-sm sm:text-base"
                    >
                      Clear search and show all properties
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className={`grid gap-4 sm:gap-6 ${
                  // Always use responsive grid layout
                  'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}>
                  {displayedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={setSelectedProperty}
                    />
                  ))}
                </div>

                {/* Load More Button - Mobile-First */}
                {hasMoreProperties && (
                  <div className="text-center mt-8 sm:mt-12">
                    <button 
                      onClick={loadMoreProperties}
                      disabled={isLoading}
                      className="bg-white border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto min-w-[160px] sm:min-w-[200px] text-sm sm:text-base"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Properties</span>
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Showing {displayedProperties.length} of {filteredProperties.length} properties
                    </p>
                  </div>
                )}

                {/* End of Results Message - Mobile-First */}
                {!hasMoreProperties && filteredProperties.length > PROPERTIES_PER_PAGE && (
                  <div className="text-center mt-8 sm:mt-12 py-6 sm:py-8 border-t border-gray-200">
                    <div className="text-gray-500 mb-2">
                      <svg className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                      You've seen all properties!
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
                      You've viewed all {filteredProperties.length} properties matching your criteria.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => {
                          setCurrentPage(1);
                          updateDisplayedProperties(filteredProperties, 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                      >
                        Back to Top
                      </button>
                      <button
                        onClick={() => {
                          clearSearch();
                          setShowFilters(true);
                        }}
                        className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                      >
                        Modify Search
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;