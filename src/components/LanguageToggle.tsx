import React from 'react';
import { Globe } from 'lucide-react';

/**
 * LanguageToggle Component - Bilingual language switcher
 * 
 * Features:
 * - Toggle between English (EN) and Swahili (SW)
 * - Globe icon for international context
 * - Smooth hover transitions
 * - Accessible button with proper labeling
 * - Compact design suitable for header placement
 * 
 * @param currentLanguage - Currently selected language ('en' or 'sw')
 * @param onLanguageChange - Callback function to handle language changes
 */
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
        {/* Globe icon to indicate language/international functionality */}
        <Globe className="h-4 w-4" />
        {/* Display current language code in uppercase */}
        <span className="text-sm font-medium">
          {currentLanguage === 'en' ? 'EN' : 'SW'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;