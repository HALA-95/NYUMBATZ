import React, { useState } from 'react';
import { Search, Menu, X, User, Heart, Bell, Home, Info, Phone, LogIn, UserPlus } from 'lucide-react';

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

  const navigationLinks = [
    { name: 'Properties', href: '#properties', icon: Home, nameSwahili: 'Mali' },
    { name: 'About', href: '#about', icon: Info, nameSwahili: 'Kuhusu' },
    { name: 'Contact', href: '#contact', icon: Phone, nameSwahili: 'Wasiliana' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-teal-600 cursor-pointer hover:text-teal-700 transition-colors">
                Nyumba<span className="text-orange-500">TZ</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links - Only visible on large screens (1024px+) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium group"
              >
                <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          {/* Desktop Search - Large screens only */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search by location, price, or house type..."
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

          {/* Desktop Authentication & User Actions - Large screens only */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </button>
                <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                </button>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full pl-3 pr-2 py-1 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">David M.</span>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Medium Screen Search - Visible on medium screens only */}
          <div className="hidden md:flex lg:hidden flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search properties..."
                  className="block w-full pl-9 pr-9 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Hamburger menu button - Now visible on medium and small screens */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on small screens */}
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

      {/* Mobile/Medium Screen Menu - Now visible on both medium and small screens */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Navigation Links */}
            <div className="space-y-1 mb-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <div>
                    <span className="font-medium">{link.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({link.nameSwahili})</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Authentication Section */}
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
                <a 
                  href="#favorites" 
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">3</span>
                </a>
                <a 
                  href="#notifications" 
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">2</span>
                </a>
                <button className="w-full text-left flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200">
                  <LogIn className="h-5 w-5 rotate-180" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors duration-200 font-medium"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-3 rounded-md hover:bg-teal-700 transition-colors duration-200 font-medium"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;