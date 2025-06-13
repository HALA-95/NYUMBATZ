import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

/**
 * Footer Component - Comprehensive site footer with multiple sections
 * 
 * Features:
 * - Brand section with social media links
 * - Quick navigation links
 * - Popular locations in Tanzania
 * - Contact information
 * - Newsletter subscription
 * - Legal links (privacy, terms, cookies)
 * - Bilingual support (English/Swahili)
 * - Responsive design with proper spacing
 * 
 * @param language - Current language setting ('en' or 'sw')
 */
interface FooterProps {
  language?: 'en' | 'sw';
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  /**
   * Translation object containing all footer text in both languages
   * Organized by sections for easy maintenance
   */
  const translations = {
    en: {
      tagline: "Find Your Perfect Home in Tanzania",
      quickLinks: "Quick Links",
      properties: "Properties",
      about: "About Us",
      contact: "Contact",
      help: "Help & Support",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
      locations: "Popular Locations",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      address: "Address",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to get updates on new properties",
      subscribe: "Subscribe",
      copyright: "All rights reserved.",
      madeWith: "Made with",
      forTanzania: "for Tanzania"
    },
    sw: {
      tagline: "Pata Nyumba Yako Bora Tanzania",
      quickLinks: "Viungo vya Haraka",
      properties: "Mali",
      about: "Kuhusu Sisi",
      contact: "Mawasiliano",
      help: "Msaada na Usaidizi",
      legal: "Kisheria",
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Huduma",
      cookies: "Sera ya Cookies",
      locations: "Maeneo Maarufu",
      contactInfo: "Maelezo ya Mawasiliano",
      email: "Barua Pepe",
      phone: "Simu",
      address: "Anwani",
      followUs: "Tufuate",
      newsletter: "Jarida",
      newsletterText: "Jiandikishe kupata habari za mali mpya",
      subscribe: "Jiandikishe",
      copyright: "Haki zote zimehifadhiwa.",
      madeWith: "Imetengenezwa kwa",
      forTanzania: "kwa ajili ya Tanzania"
    }
  };

  // Get translations for current language
  const t = translations[language];

  /**
   * Popular locations in Tanzania for quick navigation
   * These are the major cities where properties are available
   */
  const popularLocations = [
    'Dar es Salaam',
    'Mwanza',
    'Arusha',
    'Mbeya',
    'Morogoro',
    'Tanga'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section - Logo, tagline, and social media */}
          <div className="lg:col-span-1">
            {/* Brand Logo */}
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold text-teal-400">
                Nyumba<span className="text-orange-400">TZ</span>
              </h3>
            </div>
            
            {/* Brand Tagline */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t.tagline}
            </p>
            
            {/* Social Media Links Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.followUs}</h4>
              <div className="flex space-x-4">
                {/* Facebook Link */}
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                {/* Twitter Link */}
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                {/* Instagram Link */}
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                {/* LinkedIn Link */}
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section - Navigation and legal links */}
          <div>
            {/* Main Navigation Links */}
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.properties}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.help}
                </a>
              </li>
            </ul>

            {/* Legal Links Section */}
            <h4 className="text-lg font-semibold mb-4 mt-8">{t.legal}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {t.cookies}
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Locations Section - Major Tanzanian cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.locations}</h4>
            <ul className="space-y-3">
              {/* Map through popular locations array */}
              {popularLocations.map((location) => (
                <li key={location}>
                  <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information and Newsletter Section */}
          <div>
            {/* Contact Information */}
            <h4 className="text-lg font-semibold mb-4">{t.contactInfo}</h4>
            <div className="space-y-4 mb-8">
              {/* Email Contact */}
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">{t.email}</div>
                  <div className="text-gray-300">info@nyumbatz.com</div>
                </div>
              </div>
              
              {/* Phone Contact */}
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">{t.phone}</div>
                  <div className="text-gray-300">+255 123 456 789</div>
                </div>
              </div>
              
              {/* Physical Address */}
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-400 mr-3 mt-1" />
                <div>
                  <div className="text-sm text-gray-400">{t.address}</div>
                  <div className="text-gray-300">
                    Dar es Salaam, Tanzania
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.newsletter}</h4>
              <p className="text-gray-300 text-sm mb-4">
                {t.newsletterText}
              </p>
              {/* Newsletter Subscription Form */}
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-teal-400 text-white"
                />
                <button className="bg-teal-600 text-white px-6 py-2 rounded-r-lg hover:bg-teal-700 transition-colors duration-200">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright and attribution */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright Notice */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 NyumbaTZ. {t.copyright}
            </div>
            {/* Attribution with heart icon */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>{t.madeWith}</span>
              <Heart className="h-4 w-4 text-red-500 mx-2 fill-current" />
              <span>{t.forTanzania}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;