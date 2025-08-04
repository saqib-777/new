import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, ArrowRight, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const successStories = [
  {
    id: '1',
    title: 'From Street to Sweet Home',
    animalName: 'Max',
    adoptionDate: '2024-12-15',
    beforeImage: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
    story: 'Max was found injured and malnourished on the streets of Lahore. After months of medical care and rehabilitation, he transformed into a healthy, happy dog.',
    adopter: 'Ahmed Family',
    testimonial: 'Max has brought so much joy to our family. He\'s gentle with our children and has become our best friend.',
    location: 'Lahore'
  },
  {
    id: '2',
    title: 'A Second Chance at Life',
    animalName: 'Bella',
    adoptionDate: '2024-11-28',
    beforeImage: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    story: 'Bella was rescued from an abusive situation. With love, patience, and proper care, she learned to trust humans again.',
    adopter: 'Khan Family',
    testimonial: 'Bella is the sweetest cat. She purrs constantly and loves to cuddle. We can\'t imagine life without her.',
    location: 'Karachi'
  },
  {
    id: '3',
    title: 'From Abandoned to Adored',
    animalName: 'Rocky',
    adoptionDate: '2024-11-20',
    beforeImage: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400',
    story: 'Rocky was abandoned as a puppy. Through our training program, he became a certified therapy dog bringing joy to hospital patients.',
    adopter: 'Ali Family',
    testimonial: 'Rocky is not just our pet, he\'s our hero. Watching him help others brings tears to our eyes.',
    location: 'Islamabad'
  }
];

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lives Transformed - Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every rescue has a story, and every adoption creates a new chapter. 
            Here are some of our favorite transformations that inspire us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {successStories.map((story) => (
            <Card key={story.id} hover className="group overflow-hidden h-full">
              <div className="relative">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 h-56">
                  <div className="relative overflow-hidden">
                    <img
                      src={story.beforeImage}
                      alt={`${story.animalName} before rescue`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={story.afterImage}
                      alt={`${story.animalName} after adoption`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      After
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col h-full">
                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.title}</h3>
                    <p className="text-primary-600 font-semibold">{story.animalName}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {story.story}
                  </p>
                  
                  {/* Testimonial */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Quote className="w-4 h-4 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-700 italic mb-2">
                      "{story.testimonial}"
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      - {story.adopter}, {story.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Adopted {new Date(story.adoptionDate).toLocaleDateString()}</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Happy Ending
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="group">
            <Link to="/success-stories">
              View All Success Stories
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};