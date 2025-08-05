import React from 'react';
import Hero from '../components/home/Hero';
import { FeaturedAnimals } from '../components/home/FeaturedAnimals';
import { MissionSection } from '../components/home/MissionSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { CallToAction } from '../components/home/CallToAction';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedAnimals />
      <MissionSection />
      <SuccessStories />
      <CallToAction />
    </div>
  );
};
function HomePage() {
  return (
    <>
      <Header />
      <div className="pt-20"> {/* Add top padding so header doesn't overlap */}
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
      </div>
    </>
  );
}

export default HomePage;
