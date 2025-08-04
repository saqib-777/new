import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, Clock, MapPin, Star, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAppStore } from '../store/useAppStore';
import { AdoptionModal } from '../components/adoption/AdoptionModal';

const mockAnimals = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever Mix',
    age: '2 years',
    gender: 'female',
    size: 'large',
    location: 'Lahore',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Friendly', 'Energetic', 'Good with kids'],
    adoptionFee: 15000,
    specialNeeds: false
  },
  {
    id: '2',
    name: 'Shadow',
    type: 'cat',
    breed: 'Persian',
    age: '3 years',
    gender: 'male',
    size: 'medium',
    location: 'Karachi',
    image: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Calm', 'Affectionate', 'Indoor'],
    adoptionFee: 12000,
    specialNeeds: false
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'dog',
    breed: 'Labrador',
    age: '1 year',
    gender: 'male',
    size: 'large',
    location: 'Islamabad',
    image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Playful', 'Loyal', 'Training ready'],
    adoptionFee: 18000,
    specialNeeds: false
  },
  {
    id: '4',
    name: 'Mia',
    type: 'cat',
    breed: 'Siamese Mix',
    age: '4 years',
    gender: 'female',
    size: 'small',
    location: 'Lahore',
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Independent', 'Quiet', 'Gentle'],
    adoptionFee: 10000,
    specialNeeds: true
  },
  {
    id: '5',
    name: 'Charlie',
    type: 'dog',
    breed: 'German Shepherd',
    age: '5 years',
    gender: 'male',
    size: 'extra-large',
    location: 'Faisalabad',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Protective', 'Intelligent', 'Experienced'],
    adoptionFee: 20000,
    specialNeeds: false
  },
  {
    id: '6',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: '6 months',
    gender: 'female',
    size: 'small',
    location: 'Karachi',
    image: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=400',
    personality: ['Curious', 'Social', 'Kitten energy'],
    adoptionFee: 8000,
    specialNeeds: false
  }
];

export const AdoptPage = () => {
  const { searchFilters, updateSearchFilters } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const animalsPerPage = 12;

  const filteredAnimals = mockAnimals.filter(animal => {
    if (searchFilters.type !== 'all' && animal.type !== searchFilters.type) return false;
    if (searchFilters.size !== 'all' && animal.size !== searchFilters.size) return false;
    if (searchFilters.gender !== 'all' && animal.gender !== searchFilters.gender) return false;
    if (searchFilters.specialNeeds && !animal.specialNeeds) return false;
    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      return animal.name.toLowerCase().includes(query) || 
             animal.breed.toLowerCase().includes(query) ||
             animal.personality.some(trait => trait.toLowerCase().includes(query));
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAnimals.length / animalsPerPage);
  const startIndex = (currentPage - 1) * animalsPerPage;
  const paginatedAnimals = filteredAnimals.slice(startIndex, startIndex + animalsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Companion
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Every animal deserves a loving home. Browse our available pets and discover your new best friend.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                placeholder="Search by name, breed, or personality..."
                value={searchFilters.query || ''}
                onChange={(e) => updateSearchFilters({ query: e.target.value })}
                icon={<Search className="w-4 h-4" />}
                className="pr-24"
              />
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                icon={<Filter className="w-4 h-4" />}
              >
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={searchFilters.type}
                      onChange={(e) => updateSearchFilters({ type: e.target.value as any })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="all">All Animals</option>
                      <option value="dog">Dogs</option>
                      <option value="cat">Cats</option>
                      <option value="bird">Birds</option>
                      <option value="rabbit">Rabbits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <select
                      value={searchFilters.size}
                      onChange={(e) => updateSearchFilters({ size: e.target.value as any })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="all">All Sizes</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={searchFilters.gender}
                      onChange={(e) => updateSearchFilters({ gender: e.target.value as any })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="all">All Genders</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <select
                      value={searchFilters.age}
                      onChange={(e) => updateSearchFilters({ age: e.target.value as any })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="all">All Ages</option>
                      <option value="young">Young (0-2 years)</option>
                      <option value="adult">Adult (3-7 years)</option>
                      <option value="senior">Senior (8+ years)</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.specialNeeds}
                        onChange={(e) => updateSearchFilters({ specialNeeds: e.target.checked })}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Special Needs</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + animalsPerPage, filteredAnimals.length)} of {filteredAnimals.length} animals available for adoption
          </p>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedAnimals.map((animal) => (
            <Card key={animal.id} hover className="group overflow-hidden">
              <div className="relative">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Favorite Button */}
                <div className="absolute top-3 right-3">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                
                {/* Animal Type Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                  <span className="text-sm font-medium text-gray-900 capitalize">{animal.type}</span>
                </div>
                
                {/* Special Needs Badge */}
                {animal.specialNeeds && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                    Special Needs
                  </div>
                )}
                
                {/* Featured Badge */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{animal.name}</h3>
                    <p className="text-gray-600">{animal.breed}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{animal.age}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{animal.location}</span>
                    </div>
                    <div>
                      <span className="capitalize font-medium">{animal.gender}</span>
                    </div>
                    <div>
                      <span className="capitalize font-medium">{animal.size}</span>
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
                    <span className="text-lg font-bold text-primary-600">
                      Rs. {animal.adoptionFee.toLocaleString()}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-primary-600 hover:bg-primary-700"
                      onClick={() => {
                        setSelectedAnimal(animal);
                        setShowAdoptionModal(true);
                      }}
                    >
                        Adopt Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === index + 1
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No animals found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <Button
              onClick={() => updateSearchFilters({
                query: '',
                type: 'all',
                size: 'all',
                gender: 'all',
                age: 'all',
                specialNeeds: false
              })}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Adoption Modal */}
        {selectedAnimal && (
          <AdoptionModal
            isOpen={showAdoptionModal}
            onClose={() => {
              setShowAdoptionModal(false);
              setSelectedAnimal(null);
            }}
            animal={selectedAnimal}
          />
        )}
      </div>
    </div>
  );
};