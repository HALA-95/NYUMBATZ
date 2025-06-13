import { useState } from 'react';

/**
 * Language type definition for TypeScript support
 * Supports English (en) and Swahili (sw)
 */
export type Language = 'en' | 'sw';

/**
 * Translations interface defining all translatable strings
 * Organized by feature/section for better maintainability
 */
interface Translations {
  // Header Navigation
  search: string;
  properties: string;
  about: string;
  contact: string;
  signIn: string;
  favorites: string;
  notifications: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  searchProperties: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  maxPrice: string;
  allCities: string;
  allTypes: string;
  any: string;
  anyPrice: string;
  
  // Property Types
  house: string;
  apartment: string;
  studio: string;
  villa: string;
  
  // Statistics
  propertiesListed: string;
  citiesCovered: string;
  happyTenants: string;
  
  // Property Details
  month: string;
  bathrooms: string;
  availableFrom: string;
  amenities: string;
  aboutProperty: string;
  requestViewing: string;
  contactOwner: string;
  propertyOwner: string;
  verifiedOwner: string;
  callOwner: string;
  sendMessage: string;
  
  // Search Results
  propertiesAvailable: string;
  searchResultsFor: string;
  noPropertiesFound: string;
  tryAdjusting: string;
  clearSearch: string;
  loadMore: string;
  
  // Common Actions
  back: string;
  save: string;
  share: string;
  report: string;
  submit: string;
  cancel: string;
  close: string;
}

/**
 * Complete translations object containing all text in both languages
 * Organized by language code for easy access
 */
const translations: Record<Language, Translations> = {
  en: {
    // Header Navigation
    search: 'Search',
    properties: 'Properties',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    favorites: 'Favorites',
    notifications: 'Notifications',
    
    // Hero Section
    heroTitle: 'Find Your Perfect Home in Tanzania',
    heroSubtitle: 'Discover beautiful houses and apartments for rent across Tanzania\'s major cities. Your dream home is just a click away.',
    searchProperties: 'Search Properties',
    location: 'Location',
    propertyType: 'Property Type',
    bedrooms: 'Bedrooms',
    maxPrice: 'Max Price (TSh)',
    allCities: 'All Cities',
    allTypes: 'All Types',
    any: 'Any',
    anyPrice: 'Any Price',
    
    // Property Types
    house: 'House',
    apartment: 'Apartment',
    studio: 'Studio',
    villa: 'Villa',
    
    // Statistics
    propertiesListed: 'Properties Listed',
    citiesCovered: 'Cities Covered',
    happyTenants: 'Happy Tenants',
    
    // Property Details
    month: 'month',
    bathrooms: 'bathrooms',
    availableFrom: 'Available From',
    amenities: 'Amenities',
    aboutProperty: 'About this property',
    requestViewing: 'Request Viewing',
    contactOwner: 'Contact Owner',
    propertyOwner: 'Property Owner',
    verifiedOwner: 'Verified owner',
    callOwner: 'Call Owner',
    sendMessage: 'Send Message',
    
    // Search Results
    propertiesAvailable: 'Properties Available',
    searchResultsFor: 'Search results for:',
    noPropertiesFound: 'No properties found',
    tryAdjusting: 'Try adjusting your filters or search criteria',
    clearSearch: 'Clear search and show all properties',
    loadMore: 'Load More Properties',
    
    // Common Actions
    back: 'Back',
    save: 'Save',
    share: 'Share',
    report: 'Report',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close'
  },
  sw: {
    // Header Navigation
    search: 'Tafuta',
    properties: 'Mali',
    about: 'Kuhusu',
    contact: 'Mawasiliano',
    signIn: 'Ingia',
    favorites: 'Vipendwa',
    notifications: 'Arifa',
    
    // Hero Section
    heroTitle: 'Pata Nyumba Yako Bora Tanzania',
    heroSubtitle: 'Gundua nyumba na vyumba vya kupanga nzuri kote Tanzania. Nyumba ya ndoto yako ni mbali ya kubofya tu.',
    searchProperties: 'Tafuta Mali',
    location: 'Eneo',
    propertyType: 'Aina ya Mali',
    bedrooms: 'Vyumba vya Kulala',
    maxPrice: 'Bei ya Juu (TSh)',
    allCities: 'Miji Yote',
    allTypes: 'Aina Zote',
    any: 'Yoyote',
    anyPrice: 'Bei Yoyote',
    
    // Property Types
    house: 'Nyumba',
    apartment: 'Ghorofa',
    studio: 'Studio',
    villa: 'Villa',
    
    // Statistics
    propertiesListed: 'Mali Zilizoorodheshwa',
    citiesCovered: 'Miji Iliyofunikwa',
    happyTenants: 'Wapangaji Wenye Furaha',
    
    // Property Details
    month: 'mwezi',
    bathrooms: 'bafu',
    availableFrom: 'Inapatikana Kutoka',
    amenities: 'Huduma',
    aboutProperty: 'Kuhusu mali hii',
    requestViewing: 'Omba Kuonyeshwa',
    contactOwner: 'Wasiliana na Mmiliki',
    propertyOwner: 'Mmiliki wa Mali',
    verifiedOwner: 'Mmiliki aliyethibitishwa',
    callOwner: 'Piga Simu Mmiliki',
    sendMessage: 'Tuma Ujumbe',
    
    // Search Results
    propertiesAvailable: 'Mali Zinapatikana',
    searchResultsFor: 'Matokeo ya utafutaji kwa:',
    noPropertiesFound: 'Hakuna mali zilizopatikana',
    tryAdjusting: 'Jaribu kubadilisha vigezo vyako vya utafutaji',
    clearSearch: 'Futa utafutaji na onyesha mali zote',
    loadMore: 'Pakia Mali Zaidi',
    
    // Common Actions
    back: 'Rudi',
    save: 'Hifadhi',
    share: 'Shiriki',
    report: 'Ripoti',
    submit: 'Wasilisha',
    cancel: 'Ghairi',
    close: 'Funga'
  }
};

/**
 * Custom hook for managing translations and language state
 * 
 * Features:
 * - Language state management with React useState
 * - Easy access to translated strings via 't' object
 * - Language switching functionality
 * - TypeScript support for translation keys
 * 
 * @returns Object containing current language, translations, and change function
 */
export const useTranslation = () => {
  // State for current language (defaults to English)
  const [language, setLanguage] = useState<Language>('en');
  
  // Get translations for current language
  const t = translations[language];
  
  /**
   * Function to change the current language
   * Updates the language state which triggers re-render with new translations
   * 
   * @param newLanguage - The language to switch to ('en' or 'sw')
   */
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };
  
  return {
    language,    // Current language code
    t,          // Translated strings object
    changeLanguage  // Function to change language
  };
};