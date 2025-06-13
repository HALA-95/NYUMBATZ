import React, { useState } from 'react';
import { Search, Menu, X, User, Heart, Bell } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Real-time search as user types (with debouncing effect)
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch(''); // Clear search results
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-teal-600">
                Nyumba<span className="text-orange-500">TZ</span>
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search by location, price, or house type... (e.g., Mbeya, 500000, apartment)"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full pl-3 pr-2 py-1 hover:shadow-md transition-shadow duration-200">
                  <span className="text-sm font-medium text-gray-700">David M.</span>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search properties... (location, price, type)"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">David Mwakibolwa</div>
                    <div className="text-sm text-gray-500">david.mwakibolwa@email.com</div>
                  </div>
                </div>
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </a>
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </a>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;