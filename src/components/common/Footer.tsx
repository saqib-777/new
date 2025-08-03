import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Rescue The Voiceless</h3>
                <p className="text-sm text-gray-400">Saving Lives, One Rescue at a Time</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are dedicated to rescuing, rehabilitating, and rehoming animals in need. 
              Every life matters, and together we can make a difference.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/adopt" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link to="/rescue" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Report Rescue
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/adoption-process" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Adoption Process
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Pet Care Resources
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Emergency Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">info@rescuethevoiceless.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Rescue Street<br />
                  Lahore, Punjab 54000<br />
                  Pakistan
                </span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-primary-900 rounded-lg">
              <h5 className="font-semibold text-primary-200 mb-2">24/7 Emergency Hotline</h5>
              <p className="text-primary-100 font-bold text-lg">+92 311 RESCUE</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Rescue The Voiceless. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};