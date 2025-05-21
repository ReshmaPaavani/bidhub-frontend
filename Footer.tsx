import { Link } from 'react-router-dom';
import { Gavel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center text-2xl font-bold text-white">
              <Gavel className="mr-2 h-7 w-7" />
              <span>BidHub</span>
            </Link>
            <p className="mt-4 text-sm">
              Discover unique treasures and bid on exclusive items on the web's premier auction platform.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auctions" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link to="/create-auction" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link to="/help" className="inline-block text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="inline-block text-gray-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auctions?category=Art" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Art
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Antiques" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Antiques
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Collectibles" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Collectibles
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Jewelry" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Electronics" className="inline-block text-gray-300 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                <span>123 Auction Ave, Suite 100<br />San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                <span>support@bidhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BidHub. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};