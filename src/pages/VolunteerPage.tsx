import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, Heart, Clock, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

const volunteerSchema = z.object({
  age: z.number().min(16, 'Must be at least 16 years old').max(80, 'Invalid age'),
  occupation: z.string().optional(),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Valid phone number required'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  availabilityDays: z.array(z.string()).min(1, 'Please select at least one day'),
  availabilityHours: z.string().min(1, 'Please specify your available hours'),
  frequencyPreference: z.enum(['weekly', 'bi-weekly', 'monthly', 'event-based']),
  animalExperience: z.string().optional(),
  volunteerExperience: z.string().optional(),
  referenceName: z.string().min(2, 'Reference name is required'),
  referencePhone: z.string().min(10, 'Reference phone is required'),
  backgroundCheckConsent: z.boolean().refine(val => val === true, 'Background check consent is required')
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const volunteerInterests = [
  'Animal care & feeding', 'Dog walking & exercise', 'Cat socialization', 'Administrative tasks',
  'Event organization', 'Photography', 'Transportation', 'Fundraising', 'Social media', 'Education & outreach'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const VolunteerPage = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register, handleSubmit, formState: { errors }, setValue
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema)
  });

  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(updated);
    setValue('interests', updated);
  };

  const toggleDay = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    setValue('availabilityDays', updated);
  };

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const applicationNumber = `VA-${Date.now().toString(36).toUpperCase()}`;
      toast.success(`Application submitted successfully! Reference: ${applicationNumber}`);
      setShowApplication(false);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showApplication) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Volunteer Application</CardTitle>
              <p className="text-gray-600">Fill out your details and join our mission to save lives.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Age *" type="number" {...register('age', { valueAsNumber: true })} error={errors.age?.message} />
                  <Input label="Occupation" {...register('occupation')} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Emergency Contact *" {...register('emergencyContactName')} error={errors.emergencyContactName?.message} />
                  <Input label="Contact Phone *" {...register('emergencyContactPhone')} error={errors.emergencyContactPhone?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Interests *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {volunteerInterests.map((interest) => (
                      <label key={interest} className={`p-2 border rounded ${selectedInterests.includes(interest) ? 'bg-primary-50 border-primary-500' : 'border-gray-300'}`}>
                        <input type="checkbox" className="mr-2" checked={selectedInterests.includes(interest)} onChange={() => toggleInterest(interest)} />
                        {interest}
                      </label>
                    ))}
                  </div>
                  {errors.interests && <p className="text-red-500 text-sm">{errors.interests.message}</p>}
                </div>
                <Button type="submit" loading={isSubmitting} className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Side: Image & Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-lg overflow-hidden shadow-xl"
          >
            <img src="https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg" alt="Volunteer" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700/70 to-secondary-700/70 flex items-center justify-center text-center text-white p-6">
              <h2 className="text-3xl font-bold">Your Time Can Save Lives</h2>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: 'url(https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80" />
  <div className="relative z-10 text-center text-white pt-40 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Volunteer Team</h1>
          <p className="text-lg max-w-2xl mx-auto mb-6">Make a difference in the lives of rescued animals. Be part of our compassionate community.</p>
          <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100" onClick={() => setShowApplication(true)}>
            Apply Now
          </Button>
        </div>
      </div>

      {/* Opportunities Section */}
      <motion.div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        {[
          { title: 'Animal Care', desc: 'Help feed and care for rescued animals', icon: Heart, color: 'bg-red-100 text-red-600' },
          { title: 'Dog Walking', desc: 'Give dogs the exercise and joy they deserve', icon: Users, color: 'bg-blue-100 text-blue-600' },
          { title: 'Event Support', desc: 'Assist with adoption events and fundraisers', icon: Award, color: 'bg-purple-100 text-purple-600' }
        ].map((item, idx) => (
          <Card key={idx} className="hover:shadow-xl transition">
            <CardContent className="text-center p-6">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
