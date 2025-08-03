import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Hand as Hands, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            There are many ways to help animals in need. Whether you adopt, volunteer, or donate, 
            your contribution saves lives and creates happy endings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Adopt */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors group">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Adopt a Pet</h3>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Give a rescued animal a loving forever home. Browse our available pets and find your perfect companion.
            </p>
            <Button asChild variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
              <Link to="/adopt">
                Start Adopting
              </Link>
            </Button>
          </div>

          {/* Volunteer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors group">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Hands className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Volunteer</h3>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Join our team of dedicated volunteers. Help with animal care, events, or administrative tasks.
            </p>
            <Button asChild variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
              <Link to="/volunteer">
                Join Our Team
              </Link>
            </Button>
          </div>

          {/* Donate */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors group">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Donate</h3>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Your donation helps us provide medical care, food, shelter, and rehabilitation for rescued animals.
            </p>
            <Button asChild variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
              <Link to="/donate">
                Make a Donation
              </Link>
            </Button>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="bg-red-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Animal Emergency?</h3>
          <p className="text-red-100 mb-6 text-lg">
            If you've found an injured or abandoned animal, don't wait. Contact our emergency rescue team immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/rescue">
                Report Emergency
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
              <a href="tel:+923117372837">
                Call Now: +92 311 RESCUE
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};</parameter>