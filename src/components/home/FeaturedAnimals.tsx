import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const featuredAnimals = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever Mix',
    age: '2 years',
    location: 'Lahore',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Friendly', 'Energetic', 'Good with kids'],
    adoptionFee: 'Rs. 15,000'
  },
  {
    id: '2',
    name: 'Shadow',
    type: 'cat',
    breed: 'Persian',
    age: '3 years',
    location: 'Karachi',
    image: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Calm', 'Affectionate', 'Indoor'],
    adoptionFee: 'Rs. 12,000'
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'dog',
    breed: 'Labrador',
    age: '1 year',
    location: 'Islamabad',
    image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Playful', 'Loyal', 'Training ready'],
    adoptionFee: 'Rs. 18,000'
  }
];

export const FeaturedAnimals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Animals Looking for Love
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet some of our amazing rescue animals who are ready to find their forever homes. 
            Each one has a unique story and is waiting for someone special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredAnimals.map((animal) => (
            <Card key={animal.id} hover className="group overflow-hidden">
              <div className="relative">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-900 capitalize">{animal.type}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{animal.name}</h3>
                    <p className="text-gray-600">{animal.breed}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{animal.age}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{animal.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {animal.personality.slice(0, 3).map((trait, index) => (
                      <span
                        key={index}
                        className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-primary-600">{animal.adoptionFee}</span>
                    <Button asChild size="sm">
                      <Link to={`/adopt/animal/${animal.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/adopt">
              View All Animals
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};