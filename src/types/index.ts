export interface Location {
  address: string;
  city: string;
  district: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
}

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  priceMonthly: number;
  location: Location;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'house' | 'apartment' | 'studio' | 'villa';
  amenities: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  createdDate: string;
  updatedDate: string;
  featured?: boolean;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  requestedDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: 'admin' | 'tenant' | 'owner';
  isVerified: boolean;
  profileImage?: string;
  registrationDate: string;
}

export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amountTotal: number;
  commissionAmount: number;
  ownerAmount: number;
  paymentMethod: 'mpesa' | 'tigo-pesa' | 'airtel-money' | 'bank-transfer';
  transactionReference: string;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
}

export interface SearchFilters {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  houseType?: string; // Legacy support
  amenities?: string[];
  availabilityDate?: string;
}