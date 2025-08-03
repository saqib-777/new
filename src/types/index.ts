export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  avatarUrl?: string;
  userType: 'adopter' | 'volunteer' | 'admin' | 'staff';
  newsletterSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Animal {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'livestock' | 'wildlife' | 'other';
  breed?: string;
  ageYears?: number;
  ageMonths?: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large' | 'extra-large';
  weight?: number;
  color?: string;
  personality: string[];
  medicalHistory?: string;
  specialNeeds: boolean;
  specialNeedsDescription?: string;
  goodWith: string[];
  images: string[];
  location: string;
  locationCoordinates?: { lat: number; lng: number };
  adoptionFee: number;
  status: 'available' | 'pending' | 'adopted' | 'not_available';
  dateRescued?: string;
  story?: string;
  featured: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RescueRequest {
  id: string;
  referenceNumber: string;
  animalType: 'dog' | 'cat' | 'bird' | 'livestock' | 'wildlife' | 'other';
  emergencyLevel: 'critical' | 'urgent' | 'standard';
  locationAddress: string;
  locationCoordinates?: { lat: number; lng: number };
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactPreference: 'phone' | 'email' | 'whatsapp';
  description: string;
  images: string[];
  status: 'submitted' | 'reviewing' | 'assigned' | 'in_progress' | 'rescued' | 'completed' | 'cancelled';
  assignedTo?: string;
  priorityScore: number;
  publicId: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionApplication {
  id: string;
  animalId: string;
  applicantId: string;
  applicationNumber: string;
  housingType: 'house' | 'apartment' | 'farm' | 'other';
  housingOwned: boolean;
  yardAvailable: boolean;
  yardFenced: boolean;
  petExperience: string;
  currentPets: any[];
  householdMembers: number;
  childrenAges: number[];
  workSchedule: string;
  travelFrequency?: string;
  exercisePlan?: string;
  trainingCommitment: boolean;
  veterinaryPlan?: string;
  emergencyContact: any;
  references: any[];
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'on_hold';
  reviewerId?: string;
  reviewNotes?: string;
  interviewScheduled?: string;
  interviewCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  donorId?: string;
  amount: number;
  currency: string;
  donationType: 'one-time' | 'monthly';
  purpose: 'general' | 'medical' | 'food' | 'shelter' | 'emergency';
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  anonymous: boolean;
  paymentMethod: 'stripe' | 'paypal' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  paymentId?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  processedAt?: string;
  failureReason?: string;
  publicRecognition: boolean;
  receiptSent: boolean;
  thankYouSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VolunteerApplication {
  id: string;
  applicantId: string;
  applicationNumber: string;
  age: number;
  occupation?: string;
  emergencyContact: any;
  interests: string[];
  skills: string[];
  availabilityDays: string[];
  availabilityHours: string;
  frequencyPreference: 'weekly' | 'bi-weekly' | 'monthly' | 'event-based';
  animalExperience?: string;
  volunteerExperience?: string;
  physicalLimitations?: string;
  references: any[];
  backgroundCheckConsent: boolean;
  backgroundCheckCompleted: boolean;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'background_check' | 'approved' | 'rejected' | 'inactive';
  reviewerId?: string;
  interviewDate?: string;
  approvalDate?: string;
  trainingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  messageType: 'general' | 'adoption' | 'volunteer' | 'donation' | 'rescue' | 'complaint';
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  assignedTo?: string;
  response?: string;
  respondedAt?: string;
  respondedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query?: string;
  type: 'all' | 'dog' | 'cat' | 'bird' | 'rabbit' | 'livestock' | 'wildlife' | 'other';
  age: 'all' | 'young' | 'adult' | 'senior';
  size: 'all' | 'small' | 'medium' | 'large' | 'extra-large';
  gender: 'all' | 'male' | 'female';
  location: string;
  specialNeeds: boolean;
  goodWith: string[];
  sortBy: 'name' | 'age' | 'date_added' | 'adoption_fee';
  sortOrder: 'asc' | 'desc';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'rescue_update' | 'adoption_update' | 'donation_receipt' | 'volunteer_assignment';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}</parameter>