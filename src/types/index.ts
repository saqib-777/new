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
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    age: number;
    occupation: string;
  };
  housingInfo: {
    type: 'house' | 'apartment' | 'farm' | 'other';
    owned: boolean;
    yardAvailable: boolean;
    yardFenced: boolean;
  };
  experienceInfo: {
    petExperience: string;
    currentPets: any[];
    householdMembers: number;
    childrenAges: number[];
    workSchedule: string;
    travelFrequency: string;
  };
  careCommitment: {
    exercisePlan: string;
    trainingCommitment: boolean;
    veterinaryBudget: number;
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  references: {
    name: string;
    phone: string;
    relationship: string;
  }[];
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
  donorInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    anonymous: boolean;
    newsletterOptIn: boolean;
  };
  paymentMethod: 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'paypal' | 'stripe';
  paymentId?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  processedAt?: string;
  failureReason?: string;
  receiptSent: boolean;
  thankYouSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VolunteerApplication {
  id: string;
  applicantId: string;
  applicationNumber: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    age: number;
    occupation?: string;
  };
  availability: {
    days: string[];
    hours: string;
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'event-based';
  };
  interests: string[];
  skills: string[];
  experience: {
    animalExperience?: string;
    volunteerExperience?: string;
    physicalLimitations?: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  references: {
    name: string;
    phone: string;
    relationship: string;
  }[];
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
  page: number;
  limit: number;
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
}

export interface SuccessStory {
  id: string;
  animalId?: string;
  title: string;
  story: string;
  rescueDate?: string;
  adoptionDate?: string;
  beforeImages: string[];
  afterImages: string[];
  adopterName?: string;
  adopterTestimonial?: string;
  adopterImage?: string;
  featured: boolean;
  published: boolean;
  viewsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization?: string;
  experienceYears?: number;
  education?: string;
  bio: string;
  imageUrl: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}