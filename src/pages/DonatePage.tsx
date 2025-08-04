import React, { useState } from 'react';
import { Heart, DollarSign, CreditCard, Smartphone, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
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

export const DonatePage = () => {
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
      // Simulate payment processing
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
      {/* Header */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6816869/pexels-photo-6816869.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Make a Life-Saving Donation
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Your generosity directly impacts the lives of rescued animals. Every donation helps us provide 
              medical care, food, shelter, and love to animals in need.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
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

                  {/* Purpose */}
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

                  {/* Donor Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Donor Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name *"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input
                          label="Email Address *"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      
                      <Input
                        label="Phone Number (Optional)"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, phone: e.target.value }))}
                      />
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={donorInfo.anonymous}
                          onChange={(e) => setDonorInfo(prev => ({ ...prev, anonymous: e.target.checked }))}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Make this an anonymous donation</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    
                    {/* Local Payment Methods */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Local Payment Methods (Pakistan)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          onClick={() => setPaymentMethod('jazzcash')}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'jazzcash'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-orange-600">JazzCash</div>
                          <div className="text-sm text-gray-600">Mobile wallet</div>
                        </button>
                        
                        <button
                          onClick={() => setPaymentMethod('easypaisa')}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'easypaisa'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-green-600">EasyPaisa</div>
                          <div className="text-sm text-gray-600">Mobile wallet</div>
                        </button>
                        
                        <button
                          onClick={() => setPaymentMethod('bank_transfer')}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            paymentMethod === 'bank_transfer'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-blue-600">Bank Transfer</div>
                          <div className="text-sm text-gray-600">HBL, UBL, MCB</div>
                        </button>
                      </div>
                    </div>
                    
                    {/* International Payment Methods */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">International Payment Methods</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-6 h-6 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <p className="font-bold text-primary-600">Rs. {finalAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">can help save lives</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Rs. 500</span>
                      <span className="text-gray-600">Food for 1 animal for 1 week</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rs. 2,000</span>
                      <span className="text-gray-600">Basic medical checkup</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rs. 10,000</span>
                      <span className="text-gray-600">Emergency surgery</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rs. 25,000</span>
                      <span className="text-gray-600">Complete rescue & rehabilitation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ahmed K.</p>
                      <p className="text-sm text-gray-600">Rs. 5,000 • 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah M.</p>
                      <p className="text-sm text-gray-600">Rs. 2,500 • 5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Anonymous</p>
                      <p className="text-sm text-gray-600">Rs. 10,000 • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    Rescue The Voiceless is a registered non-profit organization. 
                    Your donations may be tax-deductible.
                  </p>
                  <p>
                    Tax registration number: <span className="font-mono">NPO-2024-RTF-001</span>
                  </p>
                  <p>
                    We'll email you a receipt for your records.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};