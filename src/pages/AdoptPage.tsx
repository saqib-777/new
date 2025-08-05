import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
