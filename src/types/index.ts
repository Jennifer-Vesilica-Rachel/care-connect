export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  about: string;
  expertise: string[];
  education: string[];
  languages: string[];
  consultationTypes: ('In-Person' | 'Video Consultation')[];
  availableDays: string[];
  availableSlots: string[];
  hospitalLocation: string;
  roomNumber: string;
  imageUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  doctorCount: number;
  commonConditions: string[];
  features: string[];
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorDepartment: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  consultationType: 'In-Person' | 'Video Consultation';
  date: string;
  timeSlot: string;
  reasonForVisit: string;
  notes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  consultationFee: number;
  bookedAt: string;
}

export interface PatientReview {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedVisit: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}
