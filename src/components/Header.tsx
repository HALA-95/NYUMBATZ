import React, { useState } from 'react';
import { Search, Menu, X, User, Heart, Bell } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Header Component - Main navigation header for the application
 * 
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - Search functionality with real-time input
 * - Language toggle (English/Swahili)
 * - Authentication state handling
 * - User profile dropdown for authenticated users
 * - Sticky positioning for better UX
 * 
 * @param onSearch - Callback function to handle search queries
 * @param isAuthenticated - Boolean to show authenticated user state
 * @param onAuthClick - Callback function for authentication actions
 */
interface HeaderProps {
  onSearch?: (query: string) => void;
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch = () => {}, 
  isAuthenticated = false, 
  onAuthClick = () => {} 
}) => {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for search input value
  const [searchQuery, setSearchQuery] = useState('');
  // Translation hook for bilingual support
  const { language, t, changeLanguage } = useTranslation();

  /**
   * Handles search form submission
   * Prevents default form submission and calls onSearch callback
   * 
   * @param e - Form submission event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo Section - Brand identity with Tanzanian colors */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-teal-600">
                Nyumba<span className="text-orange-500">TZ</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile, visible on medium screens and up */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              {t.properties}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              {t.about}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              {t.contact}
            </a>
          </nav>

          {/* Desktop Search Bar - Responsive search with icon */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                {/* Search icon positioned absolutely inside input */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`${t.search} ${t.properties.toLowerCase()}...`}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                />
              </div>
            </form>
          </div>

          {/* Desktop Actions - Language toggle, user actions, auth button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            
            {/* Authenticated User Actions */}
            {isAuthenticated ? (
              <>
                {/* Favorites button with heart icon */}
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
                {/* Notifications button with bell icon */}
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                </button>
                {/* User profile section with avatar */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full pl-3 pr-2 py-1 hover:shadow-md transition-shadow duration-200">
                  <span className="text-sm font-medium text-gray-700">David M.</span>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              </>
            ) : (
              /* Sign In Button for non-authenticated users */
              <button
                onClick={onAuthClick}
                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                {t.signIn}
              </button>
            )}
          </div>

          {/* Mobile Controls - Language toggle and hamburger menu */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Only visible on mobile devices */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`${t.search} ${t.properties.toLowerCase()}...`}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu - Collapsible menu for mobile devices */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Mobile navigation links */}
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200">
              {t.properties}
            </a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200">
              {t.about}
            </a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200">
              {t.contact}
            </a>
            
            {/* Mobile authenticated user section */}
            {isAuthenticated ? (
              <>
                {/* User profile section in mobile menu */}
                <div className="flex items-center space-x-3 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">David Mwakibolwa</div>
                    <div className="text-sm text-gray-500">david.mwakibolwa@email.com</div>
                  </div>
                </div>
                {/* Mobile favorites link */}
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                  <span>{t.favorites}</span>
                </a>
                {/* Mobile notifications link */}
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                  <span>{t.notifications}</span>
                </a>
              </>
            ) : (
              /* Mobile sign in button */
              <button
                onClick={onAuthClick}
                className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                {t.signIn}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;