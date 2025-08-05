import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Heart } from 'lucide-react';
import { HeroSection } from '../components/layout/HeroSection';
import { FeaturedAnimals } from '../components/home/FeaturedAnimals';
import { MissionSection } from '../components/home/MissionSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { CallToAction } from '../components/home/CallToAction';
import { Button } from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        title="Saving Lives, One Rescue at a Time"
        subtitle="Join our mission to rescue, rehabilitate, and rehome animals in need across Pakistan. Every animal deserves love, care, and a second chance at happiness."
        statistics={[
          { label: 'Animals Rescued', value: '847' },
          { label: 'Successful Adoptions', value: '623' },
          { label: 'Active Volunteers', value: '156' },
        ]}
      >
        <Button 
          asChild 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold animate-pulse"
        >
          <Link to="/rescue">
            <Phone className="w-5 h-5 mr-2" />
            Report Emergency
          </Link>
        </Button>
        
        <Button 
          asChild 
          size="lg" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold"
        >
          <Link to="/adopt">
            <Heart className="w-5 h-5 mr-2" />
            Adopt Now
          </Link>
        </Button>
        
        <Button 
          asChild 
          size="lg" 
          variant="outline" 
          className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
        >
          <Link to="/donate">
            Donate Today
          </Link>
        </Button>
      </HeroSection>

      <FeaturedAnimals />
      <MissionSection />
      <SuccessStories />
      <CallToAction />
    </div>
  );
};

export { HomePage };
