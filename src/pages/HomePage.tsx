import React from 'react';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/layout/HeroSection';
import { FeaturedAnimals } from '../components/home/FeaturedAnimals';
import { MissionSection } from '../components/home/MissionSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { CallToAction } from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Main Content with top padding to avoid overlap */}
      <div className="pt-20">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="/images/hero.jpg"
          title="Rescue The Voiceless"
          subtitle="Saving lives, one step at a time"
          statistics={[
            { label: 'Animals Rescued', value: '500+' },
            { label: 'Volunteers', value: '150+' },
            { label: 'Adoptions', value: '300+' },
          ]}
        >
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg">
            Adopt Now
          </button>
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg">
            Donate
          </button>
        </HeroSection>

        {/* Other Sections */}
        <FeaturedAnimals />
        <MissionSection />
        <SuccessStories />
        <CallToAction />
      </div>
    </>
  );
};

export default HomePage;
