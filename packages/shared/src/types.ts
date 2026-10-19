import { UserRole, Gender, AppointmentStatus, PaymentStatus, PaymentMethod } from './enums';

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  dateOfBirth?: Date | string | null;
  gender?: Gender | null;
  bloodType?: string | null;
  allergies?: string | null;
  emergencyContact?: string | null;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  specialtyId: string;
  specialtyName?: string;
  licenseNumber: string;
  yearsOfExperience: number;
  bio?: string | null;
  consultationFee: number;
  clinicAddress?: string | null;
  isVerified: boolean;
  ratingAverage: number;
  totalReviews: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: Date | string;
  durationMinutes: number;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  patient?: BaseUser;
  doctor?: BaseUser;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionRef?: string | null;
  createdAt: Date | string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
