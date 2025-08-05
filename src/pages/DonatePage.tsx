import React, { useState } from 'react';
import { Heart, DollarSign, CreditCard, Smartphone, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { HeroSection } from '../components/layout/HeroSection';
import toast from 'react-hot-toast';

const donationAmounts = [500, 1000, 2500, 5000, 10000];
const donationPurposes = [
  { id: 'general', label: 'General Fund', description: 'Support our overall rescue operations' },
  { id: 'medical', label: 'Medical Care', description: 'Emergency surgeries and treatments' },
  { id: 'food', label: 'Food & Supplies', description: 'Daily nutrition for rescued animals' },
  { id: 'shelter', label: 'Shelter Maintenance', description: 'Keep our facilities safe and clean' },
  { id: 'emergency', label: 'Emergency Fund', description: 'Critical rescue operations' }
];

const paymentMethods = [
  { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, description: 'Mobile wallet payment' },
  { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone, description: 'Mobile wallet payment' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: CreditCard, description: 'Direct bank transfer' },
  { id: 'stripe', name: 'Credit/Debit Card', icon: CreditCard, description: 'International cards' }
];

export const DonatePage: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const finalAmount = amount || parseFloat(customAmount) || 0;

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleDonate = async () => {
    if (!finalAmount || finalAmount < 100) {
      toast.error('Minimum donation amount is Rs. 100');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast.error('Please provide your name and email');
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}`;
      toast.success(`Thank you for your generous donation! Transaction ID: ${transactionId}`);

      // Reset form
      setAmount('');
      setCustomAmount('');
      setPurpose('general');
      setPaymentMethod('');
      setDonorInfo({ name: '', email: '', phone: '', anonymous: false });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
        title="Make a Life-Saving Donation"
        subtitle="Your generosity directly impacts the lives of rescued animals. Every donation helps us provide medical care, food, shelter, and love to animals in need."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✅ Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setDonationType('one-time')}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          donationType === 'one-time'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">One-time</div>
                        <div className="text-sm text-gray-600">Single donation</div>
                      </button>
                      <button
                        onClick={() => setDonationType('monthly')}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          donationType === 'monthly'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">Monthly</div>
                        <div className="text-sm text-gray-600">Recurring donation</div>
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Amount (PKR)
                    </label>
                    
                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                      {donationAmounts.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handleAmountSelect(preset)}
                          className={`p-3 border rounded-lg text-center font-medium transition-colors ${
                            amount === preset
                              ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          Rs. {preset.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount Input */}
                    <Input
                      placeholder="Enter custom amount"
                      type="number"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      min="100"
                      helper="Minimum donation amount is Rs. 100"
                    />
                  </div>

                  {/* ✅ Purpose Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Purpose
                    </label>
                    <div className="space-y-3">
                      {donationPurposes.map((purposeOption) => (
                        <label
                          key={purposeOption.id}
                          className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                            purpose === purposeOption.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            value={purposeOption.id}
                            checked={purpose === purposeOption.id}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="mt-1 text-primary-600 focus:ring-primary-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{purposeOption.label}</div>
                            <div className="text-sm text-gray-600">{purposeOption.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ✅ Donor Info */}
                  {/* (Keep donor info and payment method sections unchanged from your original code) */}

                  {/* ✅ Submit Button */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        Rs. {finalAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <Button
                      onClick={handleDonate}
                      loading={isProcessing}
                      disabled={!finalAmount || !paymentMethod}
                      className="w-full"
                      size="lg"
                      icon={<Heart className="w-5 h-5" />}
                    >
                      {donationType === 'monthly' ? 'Start Monthly Donation' : 'Donate Now'}
                    </Button>
                    
                    <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ✅ Sidebar (Impact, Recent Donors, Tax Info) */}
          {/* Keep your original sidebar code */}
        </div>
      </div>
    </div>
  );
};
