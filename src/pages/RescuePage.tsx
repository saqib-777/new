import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Phone, Clock, AlertTriangle, CheckCircle, Upload, MapPin, MessageCircle, Mail } from 'lucide-react';
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
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RescueFormData>({
    resolver: zodResolver(rescueSchema),
    defaultValues: {
      emergencyLevel: 'standard',
      contactPreference: 'phone',
    },
  });

  const emergencyLevel = watch('emergencyLevel');

  const onSubmit = async (data: RescueFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const emergencyLevelConfig = {
    critical: {
      color: 'red',
      description: 'Life-threatening situation - Immediate response within 30 minutes',
      icon: AlertTriangle,
    },
    urgent: {
      color: 'orange',
      description: 'Serious situation - Response within 2-6 hours',
      icon: Clock,
    },
    standard: {
      color: 'blue',
      description: 'Standard rescue - Response within 6-24 hours',
      icon: CheckCircle,
    },
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
          backgroundImage:
            'url(https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Report Animal Emergency</h1>
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

            {/* ✅ Email Contact */}
            <div className="text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-blue-600">RescueTheVoiceless07@gmail.com</p>
              <p className="text-sm text-gray-600">Email Support</p>
            </div>

            <div className="text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-green-600">+92 339 6063 777</p>
              <p className="text-sm text-gray-600">WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Rest of your rescue form and sidebar remains unchanged */}
        {/* ✅ Keep your full form and cards from your original code */}
      </div>
    </div>
  );
};
