import React, { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import PropertyDetails from '../components/PropertyDetails';
import FeaturedCarousel from '../components/FeaturedCarousel';
import Footer from '../components/Footer';
import { mockProperties } from '../data/mockData';
import { Property, SearchFilters as SearchFiltersType } from '../types';
import { useTranslation } from '../hooks/useTranslation';

/**
 * HomePage Component - Main landing page for the NyumbaTZ application
 * 
 * Features:
 * - Hero section with search functionality
 * - Featured properties carousel
 * - Property search and filtering system
 * - Grid/list view toggle for property display
 * - Sorting options (price, date, featured)
 * - Property details modal/page
 * - Responsive design for all devices
 * - Bilingual support (English/Swahili)
 * - Search results with pagination
 * 
 * State Management:
 * - Properties data and filtered results
 * - Search filters and query
 * - View mode and sorting preferences
 * - Selected property for details view
 */
const HomePage: React.FC = () => {
  // Properties data state
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  
  // Search and filter state
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'featured'>('featured');
  
  // Translation hook for bilingual support
  const { t, language } = useTranslation();

  /**
   * Apply filters to properties based on search criteria
   * Handles text search, location, price range, property type, bedrooms, bathrooms, and amenities
   * Also applies sorting based on current sort preference
   * 
   * @param newFilters - Filter criteria to apply
   * @param query - Text search query (defaults to current searchQuery)
   */
  const applyFilters = (newFilters: SearchFiltersType, query: string = searchQuery) => {
    let filtered = [...properties];

    // Text search filter - searches across multiple property fields
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.city.toLowerCase().includes(searchTerm) ||
        property.location.district.toLowerCase().includes(searchTerm) ||
        property.location.neighborhood?.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.propertyType.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter - matches city names
    if (newFilters.location) {
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(newFilters.location!.toLowerCase())
      );
    }

    // Price range filters
    if (newFilters.priceMin) {
      filtered = filtered.filter(property => property.priceMonthly >= newFilters.priceMin!);
    }
    if (newFilters.priceMax) {
      filtered = filtered.filter(property => property.priceMonthly <= newFilters.priceMax!);
    }

    // Property type filter (supports both propertyType and legacy houseType)
    if (newFilters.propertyType || newFilters.houseType) {
      const typeFilter = newFilters.propertyType || newFilters.houseType;
      filtered = filtered.filter(property => property.propertyType === typeFilter);
    }

    // Bedrooms filter - minimum number of bedrooms
    if (newFilters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= newFilters.bedrooms!);
    }

    // Bathrooms filter - minimum number of bathrooms
    if (newFilters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= newFilters.bathrooms!);
    }

    // Amenities filter - property must have all selected amenities
    if (newFilters.amenities && newFilters.amenities.length > 0) {
      filtered = filtered.filter(property => 
        newFilters.amenities!.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }

    // Apply sorting based on current sort preference
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

    // Update state with filtered results
    setFilteredProperties(filtered);
    setFilters(newFilters);
    setShowSearchResults(true);
  };

  /**
   * Handle sort option change
   * Updates sort preference and re-applies filters
   * 
   * @param newSortBy - New sorting option
   */
  const handleSortChange = (newSortBy: typeof sortBy) => {
    setSortBy(newSortBy);
    applyFilters(filters, searchQuery);
  };

  /**
   * Handle search query from header search bar
   * Updates search query and applies filters
   * 
   * @param query - Search query string
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(filters, query);
  };

  /**
   * Handle search from hero section
   * Applies hero filters and scrolls to results section
   * 
   * @param heroFilters - Filter criteria from hero search form
   */
  const handleHeroSearch = (heroFilters: SearchFiltersType) => {
    applyFilters(heroFilters, searchQuery);
    // Smooth scroll to results section
    const resultsSection = document.getElementById('search-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Effect to re-apply filters when sort option changes
   * Only runs when search results are visible
   */
  useEffect(() => {
    if (showSearchResults) {
      applyFilters(filters, searchQuery);
    }
  }, [sortBy]);

  // If a property is selected, show property details view
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
      {/* Hero Section with Search */}
      <Hero onSearch={handleHeroSearch} />
      
      {/* Featured Properties Carousel */}
      <FeaturedCarousel 
        properties={properties} 
        onPropertyClick={setSelectedProperty}
      />
      
      {/* Search Results Section - Only visible after search */}
      {showSearchResults && (
        <div id="search-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header with Count and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              {/* Results Count */}
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} {t.propertiesAvailable}
              </h2>
              {/* Swahili Translation */}
              <p className="text-gray-600 mt-1">
                Mali {filteredProperties.length} zinapatikana Tanzania
              </p>
              {/* Search Query Display */}
              {searchQuery && (
                <p className="text-sm text-blue-600 mt-1">
                  {t.searchResultsFor} "{searchQuery}"
                </p>
              )}
            </div>
            
            {/* Controls Section */}
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

              {/* View Mode Toggle (Grid/List) */}
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

              {/* Filters Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Collapsible */}
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

            {/* Properties Display Area */}
            <div className="flex-1">
              {/* No Results State */}
              {filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    {/* No Results Icon */}
                    <svg className="h-24 w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{t.noPropertiesFound}</h3>
                  <p className="text-gray-600">
                    {t.tryAdjusting}
                  </p>
                  {/* Clear Search Button */}
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters(filters, '');
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-800 underline"
                    >
                      {t.clearSearch}
                    </button>
                  )}
                </div>
              ) : (
                /* Properties Grid/List Display */
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

          {/* Load More Button - For pagination */}
          {filteredProperties.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                {t.loadMore}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer Section */}
      <Footer language={language} />
    </div>
  );
};

export default HomePage;