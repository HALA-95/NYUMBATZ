/**
 * OPTIMIZED SEARCH HOOK - PERFORMANCE & EFFICIENCY
 * 
 * Combines debouncing, memoization, and intelligent caching
 * for optimal search performance.
 */

import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { memoizeWithTTL } from '../utils/performance';
import { Property, SearchFilters } from '../types';

interface UseOptimizedSearchProps {
  properties: Property[];
  searchDelay?: number;
  cacheTimeout?: number;
}

// Memoized search function with 5-minute cache
const memoizedSearch = memoizeWithTTL((
  properties: Property[],
  filters: SearchFilters,
  query: string
): Property[] => {
  let filtered = [...properties];

  // Text search with intelligent matching
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

      return searchTerms.some(term => {
        // Direct text matching
        if (searchableText.includes(term)) return true;
        
        // Price matching with intelligent parsing
        if (term.includes('k') || term.includes('m')) {
          const priceValue = parseFloat(term.replace(/[km]/g, ''));
          const multiplier = term.includes('m') ? 1000000 : 1000;
          const searchPrice = priceValue * multiplier;
          const propertyPrice = property.priceMonthly;
          
          return Math.abs(propertyPrice - searchPrice) <= (searchPrice * 0.2);
        }
        
        // Numeric price matching
        if (!isNaN(Number(term))) {
          const searchPrice = Number(term);
          return Math.abs(property.priceMonthly - searchPrice) <= (searchPrice * 0.1);
        }
        
        return false;
      });
    });
  }

  // Apply filters
  if (filters.location) {
    filtered = filtered.filter(property => 
      property.location.city.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.priceMin) {
    filtered = filtered.filter(property => property.priceMonthly >= filters.priceMin!);
  }

  if (filters.priceMax) {
    filtered = filtered.filter(property => property.priceMonthly <= filters.priceMax!);
  }

  if (filters.propertyType) {
    filtered = filtered.filter(property => property.propertyType === filters.propertyType);
  }

  if (filters.bedrooms) {
    filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
  }

  if (filters.bathrooms) {
    filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms!);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(property => 
      filters.amenities!.every(amenity => 
        property.amenities.includes(amenity)
      )
    );
  }

  return filtered;
}, 5 * 60 * 1000); // 5-minute cache

export function useOptimizedSearch({
  properties,
  searchDelay = 300,
  cacheTimeout = 5 * 60 * 1000
}: UseOptimizedSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  const debouncedQuery = useDebounce(query, searchDelay);
  const debouncedFilters = useDebounce(filters, searchDelay);

  // Perform search with memoization
  const searchResults = useMemo(() => {
    setIsSearching(true);
    
    try {
      const results = memoizedSearch(properties, debouncedFilters, debouncedQuery);
      return results;
    } finally {
      setIsSearching(false);
    }
  }, [properties, debouncedFilters, debouncedQuery]);

  // Search statistics
  const searchStats = useMemo(() => ({
    totalProperties: properties.length,
    filteredProperties: searchResults.length,
    hasActiveSearch: debouncedQuery.trim().length > 0 || Object.keys(debouncedFilters).length > 0,
    searchQuery: debouncedQuery
  }), [properties.length, searchResults.length, debouncedQuery, debouncedFilters]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    searchResults,
    searchStats,
    isSearching
  };
}