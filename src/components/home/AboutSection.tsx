import React from 'react';
import { Heart, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

const features = [
  {
    icon: Heart,
    title: 'Animal Rescue',
    description: 'We rescue animals from dangerous situations and provide immediate medical care and rehabilitation.',
    color: 'text-red-600'
  },
  {
    icon: Shield,
    title: 'Safe Haven',
    description: 'Our shelters provide a safe, loving environment where animals can recover and prepare for adoption.',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'We work with volunteers, veterinarians, and the community to create a network of care.',
    color: 'text-green-600'
  },
  {
    icon: Award,
    title: 'Success Stories',
    description: 'Every successful adoption is a victory. We celebrate the bonds between animals and their families.',
    color: 'text-purple-600'
  }
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Mission to Save Lives
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For over 8 years, Rescue The Voiceless has been at the forefront of animal welfare in Pakistan. 
                We believe every animal deserves love, care, and a chance at a better life.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">24/7 Emergency Response</h3>
                  <p className="text-gray-600">Our dedicated team responds to rescue calls around the clock, ensuring no animal is left behind.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Care</h3>
                  <p className="text-gray-600">From medical treatment to behavioral rehabilitation, we provide complete care for every rescued animal.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Perfect Matching</h3>
                  <p className="text-gray-600">We carefully match animals with families to ensure lasting, loving relationships.</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="group">
              Learn Our Story
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};</parameter>