import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedAnimals } from '../components/home/FeaturedAnimals';
import { AboutSection } from '../components/home/AboutSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { CallToAction } from '../components/home/CallToAction';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedAnimals />
      <AboutSection />
      <SuccessStories />
      <CallToAction />
    </div>
  );
};