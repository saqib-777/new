import React from 'react';
import { Heart, Shield, Users, Award, Stethoscope, Home } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const missionPoints = [
  {
    icon: Heart,
    title: 'Emergency Rescue',
    description: 'We respond to emergency calls 24/7, rescuing animals from dangerous situations and providing immediate medical care.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Stethoscope,
    title: 'Medical Care',
    description: 'Our veterinary team provides comprehensive medical treatment, surgeries, and rehabilitation for all rescued animals.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Home,
    title: 'Safe Shelter',
    description: 'We provide temporary homes where animals can recover, socialize, and prepare for their forever families.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Users,
    title: 'Perfect Matching',
    description: 'We carefully match animals with families to ensure lasting, loving relationships that benefit both pets and people.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Shield,
    title: 'Ongoing Support',
    description: 'Our commitment continues after adoption with training resources, medical support, and lifetime guidance.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Award,
    title: 'Community Education',
    description: 'We educate the community about responsible pet ownership, animal welfare, and prevention of cruelty.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

export const MissionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Mission to Save Lives
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For over 8 years, Rescue The Voiceless has been at the forefront of animal welfare in Pakistan. 
            We believe every animal deserves love, care, and a chance at a better life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionPoints.map((point, index) => (
            <Card key={index} hover className="group h-full">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${point.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className={`w-8 h-8 ${point.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {point.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Whether you adopt, volunteer, or donate, your support helps us continue our life-saving work. 
              Join our community of animal lovers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More About Us
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                View Our Impact Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};