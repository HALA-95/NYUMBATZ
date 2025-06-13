import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Phone, 
  Mail, 
  MapPin,
  Heart,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' }
  ];

  const quickLinks = [
    { name: 'Search Properties', href: '#', nameSwahili: 'Tafuta Mali' },
    { name: 'List Your Property', href: '#', nameSwahili: 'Orodhesha Mali Yako' },
    { name: 'How It Works', href: '#', nameSwahili: 'Jinsi Inavyofanya Kazi' },
    { name: 'Pricing', href: '#', nameSwahili: 'Bei' },
    { name: 'FAQ', href: '#', nameSwahili: 'Maswali Yanayoulizwa Mara Kwa Mara' }
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '#', nameSwahili: 'Masharti ya Huduma' },
    { name: 'Privacy Policy', href: '#', nameSwahili: 'Sera ya Faragha' },
    { name: 'Cookie Policy', href: '#', nameSwahili: 'Sera ya Vidakuzi' },
    { name: 'Refund Policy', href: '#', nameSwahili: 'Sera ya Kurejesha Pesa' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#', nameSwahili: 'Kituo cha Msaada' },
    { name: 'Contact Support', href: '#', nameSwahili: 'Wasiliana na Msaada' },
    { name: 'Report Issue', href: '#', nameSwahili: 'Ripoti Tatizo' },
    { name: 'Safety Tips', href: '#', nameSwahili: 'Vidokezo vya Usalama' }
  ];

  const cities = [
    'Dar es Salaam',
    'Mwanza',
    'Arusha',
    'Mbeya',
    'Morogoro',
    'Tanga'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-teal-400">
                Nyumba<span className="text-orange-400">TZ</span>
              </h2>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                Your trusted partner for finding the perfect home in Tanzania. 
                Connecting property owners with tenants across major cities.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Mshirika wako wa kuaminika wa kupata nyumba kamili Tanzania.
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-3">Follow Us / Tufuate</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 bg-gray-800 rounded-full transition-colors duration-200 ${social.color} hover:bg-gray-700`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <span className="text-gray-500 text-xs">{link.nameSwahili}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Support & Legal</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Support / Msaada</h4>
                <ul className="space-y-1">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Legal / Kisheria</h4>
                <ul className="space-y-1">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info & Cities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Contact Us</h3>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-600 rounded-full">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">+255 123 456 789</p>
                  <p className="text-gray-500 text-xs">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-full">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">info@nyumbatz.com</p>
                  <p className="text-gray-500 text-xs">General inquiries</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">WhatsApp Support</p>
                  <p className="text-gray-500 text-xs">+255 987 654 321</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-600 rounded-full">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Mbeya, Tanzania</p>
                  <p className="text-gray-500 text-xs">Headquarters</p>
                </div>
              </div>
            </div>

            {/* Cities We Serve */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Cities We Serve</h4>
              <div className="grid grid-cols-2 gap-1">
                {cities.map((city) => (
                  <a
                    key={city}
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-xs"
                  >
                    {city}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Get the latest properties and updates delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email / Ingiza barua pepe yako"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-r-lg transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} NyumbaTZ. All rights reserved.</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by Mallick Technologies</span>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>Powered by modern technology</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;