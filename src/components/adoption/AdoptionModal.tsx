import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const adoptionSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please provide your full address'),
  age: z.number().min(18, 'You must be at least 18 years old'),
  occupation: z.string().min(2, 'Occupation is required'),
  
  // Housing Details
  housingType: z.enum(['house', 'apartment', 'farm', 'other']),
  housingOwned: z.boolean(),
  yardAvailable: z.boolean(),
  yardFenced: z.boolean().optional(),
  
  // Experience & Lifestyle
  petExperience: z.string().min(20, 'Please describe your pet experience'),
  currentPets: z.string(),
  householdMembers: z.number().min(1),
  childrenAges: z.string(),
  workSchedule: z.string().min(10, 'Please describe your work schedule'),
  travelFrequency: z.string(),
  
  // Animal Care Commitment
  exercisePlan: z.string().min(20, 'Please describe your exercise plan'),
  trainingCommitment: z.boolean(),
  veterinaryBudget: z.number().min(1000, 'Minimum budget should be Rs. 1000'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Emergency contact phone is required'),
  
  // References
  reference1Name: z.string().min(2, 'Reference name is required'),
  reference1Phone: z.string().min(10, 'Reference phone is required'),
  reference2Name: z.string().min(2, 'Reference name is required'),
  reference2Phone: z.string().min(10, 'Reference phone is required'),
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: {
    id: string;
    name: string;
    type: string;
    breed: string;
    image: string;
  };
}

export const AdoptionModal = ({ isOpen, onClose, animal }: AdoptionModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    mode: 'onChange'
  });

  const yardAvailable = watch('yardAvailable');

  const stepTitles = [
    'Personal Information',
    'Housing Details',
    'Experience & Lifestyle',
    'Animal Care Commitment',
    'References'
  ];

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof AdoptionFormData)[] => {
    switch (step) {
      case 1:
        return ['fullName', 'email', 'phone', 'address', 'age', 'occupation'];
      case 2:
        return ['housingType', 'housingOwned', 'yardAvailable'];
      case 3:
        return ['petExperience', 'currentPets', 'householdMembers', 'workSchedule'];
      case 4:
        return ['exercisePlan', 'trainingCommitment', 'veterinaryBudget', 'emergencyContactName', 'emergencyContactPhone'];
      case 5:
        return ['reference1Name', 'reference1Phone', 'reference2Name', 'reference2Phone'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: AdoptionFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const applicationNumber = `APP-${Date.now().toString(36).toUpperCase()}`;
      
      toast.success(`Application submitted successfully! Reference: ${applicationNumber}`);
      onClose();
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                {...register('fullName')}
                error={errors.fullName?.message}
              />
              <Input
                label="Email Address *"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number *"
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Input
                label="Age *"
                type="number"
                {...register('age', { valueAsNumber: true })}
                error={errors.age?.message}
              />
            </div>
            
            <Input
              label="Full Address *"
              {...register('address')}
              error={errors.address?.message}
            />
            
            <Input
              label="Occupation *"
              {...register('occupation')}
              error={errors.occupation?.message}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Housing Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['house', 'apartment', 'farm', 'other'].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value={type}
                      {...register('housingType')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
              {errors.housingType && (
                <p className="mt-1 text-sm text-red-600">{errors.housingType.message}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('housingOwned')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I own my home</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('yardAvailable')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I have a yard/outdoor space</span>
              </label>
              
              {yardAvailable && (
                <label className="flex items-center space-x-2 ml-6">
                  <input
                    type="checkbox"
                    {...register('yardFenced')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">My yard is fenced</span>
                </label>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Experience *
              </label>
              <textarea
                {...register('petExperience')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe your experience with pets..."
              />
              {errors.petExperience && (
                <p className="mt-1 text-sm text-red-600">{errors.petExperience.message}</p>
              )}
            </div>
            
            <Input
              label="Current Pets (if any)"
              {...register('currentPets')}
              placeholder="List any current pets you have"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Household Members *"
                type="number"
                {...register('householdMembers', { valueAsNumber: true })}
                error={errors.householdMembers?.message}
              />
              <Input
                label="Children Ages (if any)"
                {...register('childrenAges')}
                placeholder="e.g., 5, 8, 12"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Schedule *
              </label>
              <textarea
                {...register('workSchedule')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe your typical work schedule..."
              />
              {errors.workSchedule && (
                <p className="mt-1 text-sm text-red-600">{errors.workSchedule.message}</p>
              )}
            </div>
            
            <Input
              label="Travel Frequency"
              {...register('travelFrequency')}
              placeholder="How often do you travel?"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Plan *
              </label>
              <textarea
                {...register('exercisePlan')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="How will you ensure the animal gets adequate exercise?"
              />
              {errors.exercisePlan && (
                <p className="mt-1 text-sm text-red-600">{errors.exercisePlan.message}</p>
              )}
            </div>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('trainingCommitment')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">I commit to providing proper training</span>
            </label>
            
            <Input
              label="Monthly Veterinary Budget (PKR) *"
              type="number"
              {...register('veterinaryBudget', { valueAsNumber: true })}
              error={errors.veterinaryBudget?.message}
              placeholder="Minimum Rs. 1000"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Emergency Contact Name *"
                {...register('emergencyContactName')}
                error={errors.emergencyContactName?.message}
              />
              <Input
                label="Emergency Contact Phone *"
                {...register('emergencyContactPhone')}
                error={errors.emergencyContactPhone?.message}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Please provide two personal references who can vouch for your character and ability to care for a pet.
            </p>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Reference 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name *"
                  {...register('reference1Name')}
                  error={errors.reference1Name?.message}
                />
                <Input
                  label="Phone *"
                  {...register('reference1Phone')}
                  error={errors.reference1Phone?.message}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Reference 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name *"
                  {...register('reference2Name')}
                  error={errors.reference2Name?.message}
                />
                <Input
                  label="Phone *"
                  {...register('reference2Phone')}
                  error={errors.reference2Phone?.message}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adoption Application" size="xl">
      <div className="space-y-6">
        {/* Animal Info */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{animal.name}</h3>
            <p className="text-sm text-gray-600">{animal.breed} • {animal.type}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{stepTitles[currentStep - 1]}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                loading={isSubmitting}
                icon={<CheckCircle className="w-4 h-4" />}
              >
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};