import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, ArrowRight } from 'lucide-react';
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
    story: 'Max was found injured on the streets of Lahore. After months of rehabilitation, he found his forever family with the Ahmed family.',
    adopter: 'Ahmed Family'
  },
  {
    id: '2',
    title: 'A Second Chance at Life',
    animalName: 'Bella',
    adoptionDate: '2024-11-28',
    beforeImage: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    story: 'Bella was rescued from an abusive situation. With love and care, she transformed into a confident, happy cat.',
    adopter: 'Khan Family'
  },
  {
    id: '3',
    title: 'From Abandoned to Adored',
    animalName: 'Rocky',
    adoptionDate: '2024-11-20',
    beforeImage: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400',
    story: 'Rocky was abandoned as a puppy. Now he\'s a therapy dog bringing joy to children in hospitals.',
    adopter: 'Ali Family'
  }
];

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Heartwarming Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every rescue has a story, and every adoption creates a new chapter. 
            Here are some of our favorite happy endings that inspire us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {successStories.map((story) => (
            <Card key={story.id} hover className="group overflow-hidden">
              <div className="relative">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 h-48">
                  <div className="relative overflow-hidden">
                    <img
                      src={story.beforeImage}
                      alt={`${story.animalName} before rescue`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={story.afterImage}
                      alt={`${story.animalName} after adoption`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{story.title}</h3>
                    <p className="text-primary-600 font-medium">{story.animalName}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {story.story}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Adopted by {story.adopter}</span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(story.adoptionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full group">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/success-stories">
              View All Success Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};