import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Phone, Clock, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

const rescueSchema = z.object({
  animalType: z.enum(['dog', 'cat', 'bird', 'livestock', 'wildlife', 'other']),
  emergencyLevel: z.enum(['critical', 'urgent', 'standard']),
  locationAddress: z.string().min(10, 'Please provide a detailed address'),
  contactName: z.string().min(2, 'Name is required'),
  contactPhone: z.string().regex(/^(\+92|0)?3[0-9]{9}$/, 'Please enter a valid Pakistani phone number'),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactPreference: z.enum(['phone', 'email', 'whatsapp']),
  description: z.string().min(20, 'Please provide more details about the situation'),
});

type RescueFormData = z.infer<typeof rescueSchema>;

export const RescuePage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RescueFormData>({
    resolver: zodResolver(rescueSchema),
    defaultValues: {
      emergencyLevel: 'standard',
      contactPreference: 'phone'
    }
  });

  const emergencyLevel = watch('emergencyLevel');

  const onSubmit = async (data: RescueFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const referenceNumber = `RR-${Date.now().toString(36).toUpperCase()}`;
      
      toast.success(`Rescue request submitted successfully! Reference: ${referenceNumber}`);
      reset();
      setImages([]);
    } catch (error) {
      toast.error('Failed to submit rescue request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const emergencyLevelConfig = {
    critical: {
      color: 'red',
      description: 'Life-threatening situation - Immediate response within 30 minutes',
      icon: AlertTriangle
    },
    urgent: {
      color: 'orange',
      description: 'Serious situation - Response within 2-6 hours',
      icon: Clock
    },
    standard: {
      color: 'blue',
      description: 'Standard rescue - Response within 6-24 hours',
      icon: CheckCircle
    }
  };

  const config = emergencyLevelConfig[emergencyLevel];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4">
            <Shield className="w-6 h-6" />
            <span className="font-bold text-lg">24/7 Emergency Hotline: 1122</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">For immediate assistance, call now!</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Report Animal Emergency
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Found an animal in need? Report it here and our rescue team will respond as quickly as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-bold text-red-600 text-xl">1122</p>
              <p className="text-sm text-gray-600">Emergency Hotline</p>
            </div>
          import { Mail } from "lucide-react";

export default function RescuePage() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {/* Email Icon */}
        <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />

        {/* Email Text */}
        <p className="text-xl font-bold text-blue-600">
          RescueTheVoiceless07@gmail.com
        </p>

        {/* Subtitle */}
        <p className="text-gray-600 mt-2 text-sm">Email Support</p>

        {/* Optional Button */}
        <a
          href="mailto:RescueTheVoiceless07@gmail.com"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Email
        </a>
      </div>
    </section>
  );
}

            <div className="text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-green-600">+92 339 6063 777</p>
              <p className="text-sm text-gray-600">WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Rescue Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Animal Type and Emergency Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Animal Type *
                      </label>
                      <select
                        {...register('animalType')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select animal type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="livestock">Livestock</option>
                        <option value="wildlife">Wildlife</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.animalType && (
                        <p className="mt-1 text-sm text-red-600">{errors.animalType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Level *
                      </label>
                      <select
                        {...register('emergencyLevel')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="standard">Standard</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                      {errors.emergencyLevel && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyLevel.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Emergency Level Info */}
                  <div className={`p-4 rounded-lg border ${
                    config.color === 'red' ? 'bg-red-50 border-red-200' :
                    config.color === 'orange' ? 'bg-orange-50 border-orange-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <config.icon className={`w-5 h-5 ${
                        config.color === 'red' ? 'text-red-600' :
                        config.color === 'orange' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                      <p className={`text-sm font-medium ${
                        config.color === 'red' ? 'text-red-800' :
                        config.color === 'orange' ? 'text-orange-800' :
                        'text-blue-800'
                      }`}>
                        {config.description}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <Input
                    label="Location Address *"
                    placeholder="Provide detailed address with landmarks (e.g., Near Main Market, Gulberg III, Lahore)"
                    {...register('locationAddress')}
                    error={errors.locationAddress?.message}
                  />
                  
                  {/* GPS Location Button */}
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((position) => {
                            setLocation({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                            });
                            toast.success('Location captured successfully!');
                          });
                        }
                      }}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Get My Location</span>
                    </button>
                    {location && (
                      <span className="text-sm text-green-600 font-medium">
                        ✓ GPS Location Captured
                      </span>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                    
                    <Input
                      label="Your Name *"
                      {...register('contactName')}
                      error={errors.contactName?.message}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number *"
                        placeholder="+92 300 1234567"
                        {...register('contactPhone')}
                        error={errors.contactPhone?.message}
                      />

                      <Input
                        label="Email Address *"
                        type="email"
                        {...register('contactEmail')}
                        error={errors.contactEmail?.message}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method *
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['phone', 'email', 'whatsapp'].map((method) => (
                          <label key={method} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              value={method}
                              {...register('contactPreference')}
                              className="text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Situation Description *
                    </label>
                    <textarea
                      {...register('description')}
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe the animal's condition, behavior, and surroundings in detail..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload photos or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Maximum 5 images, up to 10MB each
                        </p>
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    Submit Rescue Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="font-bold text-xl text-red-600">+92 311 RESCUE</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                  <Button asChild variant="danger" className="w-full">
                    <a href="tel:+923117372837">Call Emergency Line</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Immediate Confirmation</h4>
                      <p className="text-sm text-gray-600">You'll receive a reference number and confirmation email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Team Assessment</h4>
                      <p className="text-sm text-gray-600">Our team will assess the situation and priority level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Rescue Response</h4>
                      <p className="text-sm text-gray-600">Our rescue team will be dispatched to the location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Updates</h4>
                      <p className="text-sm text-gray-600">You'll receive updates on the rescue progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Rescue Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Stay at a safe distance from the animal</li>
                  <li>• Don't attempt to feed or touch injured animals</li>
                  <li>• Take photos if safe to do so</li>
                  <li>• Note the exact location and landmarks</li>
                  <li>• Keep your phone available for our team</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};