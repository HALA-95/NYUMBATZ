import { useState } from 'react';

export type Language = 'en' | 'sw';

interface Translations {
  // Header
  search: string;
  properties: string;
  about: string;
  contact: string;
  signIn: string;
  favorites: string;
  notifications: string;
  
  // Hero
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
  
  // Property types
  house: string;
  apartment: string;
  studio: string;
  villa: string;
  
  // Stats
  propertiesListed: string;
  citiesCovered: string;
  happyTenants: string;
  
  // Property details
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
  
  // Search results
  propertiesAvailable: string;
  searchResultsFor: string;
  noPropertiesFound: string;
  tryAdjusting: string;
  clearSearch: string;
  loadMore: string;
  
  // Common
  back: string;
  save: string;
  share: string;
  report: string;
  submit: string;
  cancel: string;
  close: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    search: 'Search',
    properties: 'Properties',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    favorites: 'Favorites',
    notifications: 'Notifications',
    
    // Hero
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
    
    // Property types
    house: 'House',
    apartment: 'Apartment',
    studio: 'Studio',
    villa: 'Villa',
    
    // Stats
    propertiesListed: 'Properties Listed',
    citiesCovered: 'Cities Covered',
    happyTenants: 'Happy Tenants',
    
    // Property details
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
    
    // Search results
    propertiesAvailable: 'Properties Available',
    searchResultsFor: 'Search results for:',
    noPropertiesFound: 'No properties found',
    tryAdjusting: 'Try adjusting your filters or search criteria',
    clearSearch: 'Clear search and show all properties',
    loadMore: 'Load More Properties',
    
    // Common
    back: 'Back',
    save: 'Save',
    share: 'Share',
    report: 'Report',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close'
  },
  sw: {
    // Header
    search: 'Tafuta',
    properties: 'Mali',
    about: 'Kuhusu',
    contact: 'Mawasiliano',
    signIn: 'Ingia',
    favorites: 'Vipendwa',
    notifications: 'Arifa',
    
    // Hero
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
    
    // Property types
    house: 'Nyumba',
    apartment: 'Ghorofa',
    studio: 'Studio',
    villa: 'Villa',
    
    // Stats
    propertiesListed: 'Mali Zilizoorodheshwa',
    citiesCovered: 'Miji Iliyofunikwa',
    happyTenants: 'Wapangaji Wenye Furaha',
    
    // Property details
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
    
    // Search results
    propertiesAvailable: 'Mali Zinapatikana',
    searchResultsFor: 'Matokeo ya utafutaji kwa:',
    noPropertiesFound: 'Hakuna mali zilizopatikana',
    tryAdjusting: 'Jaribu kubadilisha vigezo vyako vya utafutaji',
    clearSearch: 'Futa utafutaji na onyesha mali zote',
    loadMore: 'Pakia Mali Zaidi',
    
    // Common
    back: 'Rudi',
    save: 'Hifadhi',
    share: 'Shiriki',
    report: 'Ripoti',
    submit: 'Wasilisha',
    cancel: 'Ghairi',
    close: 'Funga'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = translations[language];
  
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };
  
  return {
    language,
    t,
    changeLanguage
  };
};