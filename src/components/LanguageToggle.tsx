import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'sw';
  onLanguageChange: (language: 'en' | 'sw') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'sw' : 'en')}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        aria-label="Toggle language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentLanguage === 'en' ? 'EN' : 'SW'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;