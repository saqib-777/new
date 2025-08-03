import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, Heart, Clock, Award, CheckCircle } from 'lucide-react';
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
  'Animal care & feeding',
  'Dog walking & exercise',
  'Cat socialization',
  'Administrative tasks',
  'Event organization',
  'Photography',
  'Transportation',
  'Fundraising',
  'Social media',
  'Education & outreach'
];

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const VolunteerPage = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
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
      // Simulate API call
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Application</CardTitle>
              <p className="text-gray-600">
                Join our team of dedicated volunteers and help us save more lives.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Age *"
                      type="number"
                      {...register('age', { valueAsNumber: true })}
                      error={errors.age?.message}
                    />
                    <Input
                      label="Occupation"
                      {...register('occupation')}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Contact Name *"
                      {...register('emergencyContactName')}
                      error={errors.emergencyContactName?.message}
                    />
                    <Input
                      label="Contact Phone *"
                      {...register('emergencyContactPhone')}
                      error={errors.emergencyContactPhone?.message}
                    />
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Areas of Interest *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {volunteerInterests.map((interest) => (
                      <label
                        key={interest}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedInterests.includes(interest)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedInterests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="text-sm text-red-600">{errors.interests.message}</p>
                  )}
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Availability</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Days *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {daysOfWeek.map((day) => (
                        <label
                          key={day}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedDays.includes(day)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDays.includes(day)}
                            onChange={() => toggleDay(day)}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                    {errors.availabilityDays && (
                      <p className="text-sm text-red-600">{errors.availabilityDays.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Available Hours *"
                      placeholder="e.g., 9 AM - 5 PM"
                      {...register('availabilityHours')}
                      error={errors.availabilityHours?.message}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequency Preference *
                      </label>
                      <select
                        {...register('frequencyPreference')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="event-based">Event-based</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Animal Experience
                    </label>
                    <textarea
                      {...register('animalExperience')}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe your experience with animals..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volunteer Experience
                    </label>
                    <textarea
                      {...register('volunteerExperience')}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe any previous volunteer work..."
                    />
                  </div>
                </div>

                {/* Reference */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Reference</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Reference Name *"
                      {...register('referenceName')}
                      error={errors.referenceName?.message}
                    />
                    <Input
                      label="Reference Phone *"
                      {...register('referencePhone')}
                      error={errors.referencePhone?.message}
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register('backgroundCheckConsent')}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to a background check as part of the volunteer screening process. 
                      I understand this is required for the safety of animals and other volunteers.
                    </span>
                  </label>
                  {errors.backgroundCheckConsent && (
                    <p className="text-sm text-red-600">{errors.backgroundCheckConsent.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplication(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Volunteer Team
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
              Make a difference in the lives of rescued animals. Join our passionate team of volunteers 
              and help us create more success stories.
            </p>
            <Button
              onClick={() => setShowApplication(true)}
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
              icon={<Heart className="w-5 h-5" />}
            >
              Apply to Volunteer
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Volunteer Opportunities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Volunteer Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Animal Care',
                description: 'Help with daily care, feeding, and socialization of rescued animals.',
                icon: Heart,
                color: 'text-red-600',
                commitment: '4-6 hours/week'
              },
              {
                title: 'Dog Walking',
                description: 'Provide exercise and outdoor time for dogs in our care.',
                icon: Users,
                color: 'text-blue-600',
                commitment: '2-3 hours/week'
              },
              {
                title: 'Administrative Support',
                description: 'Help with paperwork, data entry, and office tasks.',
                icon: Clock,
                color: 'text-green-600',
                commitment: 'Flexible hours'
              },
              {
                title: 'Event Coordination',
                description: 'Organize adoption events, fundraisers, and community outreach.',
                icon: Award,
                color: 'text-purple-600',
                commitment: '5-10 hours/month'
              },
              {
                title: 'Transportation',
                description: 'Help transport animals to vet appointments and adoption events.',
                icon: Users,
                color: 'text-orange-600',
                commitment: 'As needed'
              },
              {
                title: 'Foster Care',
                description: 'Provide temporary homes for animals needing special care.',
                icon: Heart,
                color: 'text-pink-600',
                commitment: 'Varies'
              }
            ].map((opportunity, index) => (
              <Card key={index} hover>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${opportunity.color}`}>
                    <opportunity.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {opportunity.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Time Commitment:</strong> {opportunity.commitment}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Volunteer Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Volunteer With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                'Make a real difference in animals\' lives',
                'Gain valuable experience and skills',
                'Meet like-minded animal lovers',
                'Flexible scheduling to fit your lifestyle',
                'Training and ongoing support provided',
                'Volunteer appreciation events and recognition'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Volunteers with animals"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Volunteer Testimonials */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What Our Volunteers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Ahmed',
                role: 'Dog Walker Volunteer',
                quote: 'Volunteering here has been the most rewarding experience. Seeing the animals find their forever homes brings me so much joy.',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
              },
              {
                name: 'Ali Hassan',
                role: 'Foster Care Volunteer',
                quote: 'The training and support provided is excellent. I\'ve learned so much about animal care and made lifelong friends.',
                image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200'
              },
              {
                name: 'Fatima Khan',
                role: 'Event Coordinator',
                quote: 'Being part of this amazing team has given me purpose. Every adoption event we organize means more animals find homes.',
                image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200'
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <blockquote className="text-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};</parameter>