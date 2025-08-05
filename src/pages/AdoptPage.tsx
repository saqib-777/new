import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection'; // ✅ Added
import { useAppStore } from '../store/useAppStore';
import { Search, Filter, Heart, Clock, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AdoptionModal } from '../components/adoption/AdoptionModal';

export const AdoptPage = () => {
  const { searchFilters, updateSearchFilters } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const animalsPerPage = 12;

  // ✅ Hero Section Added
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Find Your Perfect Companion"
        subtitle="Every animal deserves a loving home. Browse our available pets and discover your new best friend."
        backgroundImage="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
      />
