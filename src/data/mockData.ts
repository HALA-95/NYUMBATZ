import { Property, User, ViewingRequest, Payment } from '../types';

/**
 * Mock Data for NyumbaTZ House Rental System
 * 
 * This file contains all the sample data used throughout the application
 * including properties, users, viewing requests, and payment records.
 * 
 * Data is organized by type and includes comprehensive examples
 * representing the Tanzanian property rental market.
 */

/**
 * List of major Tanzanian cities where properties are available
 * Used in search filters and location dropdowns
 */
export const tanzanianCities = [
  'Dar es Salaam',
  'Mwanza',
  'Arusha',
  'Mbeya',
  'Morogoro',
  'Tanga',
  'Dodoma',
  'Moshi',
  'Iringa',
  'Mtwara'
];

/**
 * Property types available on the platform
 * Includes both English and Swahili translations
 */
export const propertyTypes = [
  { value: 'house', label: 'Nyumba (House)' },
  { value: 'apartment', label: 'Ghorofa (Apartment)' },
  { value: 'studio', label: 'Studio' },
  { value: 'villa', label: 'Villa' }
];

/**
 * Available amenities for properties
 * Common features that tenants look for in rental properties
 */
export const amenities = [
  'Parking',
  'Security',
  'Generator',
  'Water Tank',
  'Garden',
  'Balcony',
  'Air Conditioning',
  'Internet',
  'Swimming Pool',
  'Gym',
  'Elevator',
  'Furnished'
];

/**
 * Mock Properties Data
 * Comprehensive list of sample properties across different Tanzanian cities
 * Includes various property types, price ranges, and amenities
 */
export const mockProperties: Property[] = [
  {
    id: '1',
    ownerId: 'owner1',
    title: 'Modern 3BR House in Masaki',
    description: 'Beautiful modern house in the prestigious Masaki area with sea views. Perfect for professionals and families. Fully furnished with modern amenities.',
    priceMonthly: 1200000,
    location: {
      address: 'Masaki Peninsula',
      city: 'Dar es Salaam',
      district: 'Kinondoni',
      neighborhood: 'Masaki',
      latitude: -6.7611,
      longitude: 39.2858
    },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Air Conditioning', 'Internet', 'Furnished'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15',
    featured: true // Featured property for carousel display
  },
  {
    id: '2',
    ownerId: 'owner2',
    title: 'Luxury Villa in Oyster Bay',
    description: 'Stunning luxury villa with ocean views in Oyster Bay. Features spacious rooms, private garden, and top-notch security.',
    priceMonthly: 2500000,
    location: {
      address: 'Oyster Bay Road',
      city: 'Dar es Salaam',
      district: 'Kinondoni',
      neighborhood: 'Oyster Bay',
      latitude: -6.7924,
      longitude: 39.2793
    },
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'villa',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Swimming Pool', 'Air Conditioning', 'Internet', 'Furnished'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-10',
    updatedDate: '2024-01-10',
    featured: true
  },
  {
    id: '3',
    ownerId: 'owner3',
    title: 'Cozy Apartment in Mikocheni',
    description: 'Well-maintained 2-bedroom apartment in Mikocheni. Close to shopping centers and public transport.',
    priceMonthly: 550000,
    location: {
      address: 'Mikocheni Light Industrial Area',
      city: 'Dar es Salaam',
      district: 'Kinondoni',
      neighborhood: 'Mikocheni',
      latitude: -6.7735,
      longitude: 39.2203
    },
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'apartment',
    amenities: ['Parking', 'Security', 'Water Tank', 'Internet'],
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-12',
    updatedDate: '2024-01-12'
  },
  {
    id: '4',
    ownerId: 'owner4',
    title: 'Executive House in Mwanza City',
    description: 'Executive 4-bedroom house near Lake Victoria. Perfect for business executives with family.',
    priceMonthly: 800000,
    location: {
      address: 'Ilemela District',
      city: 'Mwanza',
      district: 'Ilemela',
      neighborhood: 'Ilemela',
      latitude: -2.5164,
      longitude: 32.9175
    },
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'house',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Internet'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-08',
    updatedDate: '2024-01-08',
    featured: true
  },
  {
    id: '5',
    ownerId: 'owner5',
    title: 'Safari Lodge Style House in Arusha',
    description: 'Unique safari lodge style house in Arusha, perfect for tourists and expatriates. Close to Mount Meru.',
    priceMonthly: 950000,
    location: {
      address: 'Arusha Central',
      city: 'Arusha',
      district: 'Arusha Urban',
      neighborhood: 'Central',
      latitude: -3.3667,
      longitude: 36.6833
    },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Air Conditioning', 'Internet', 'Furnished'],
    images: [
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-05',
    updatedDate: '2024-01-05'
  },
  {
    id: '6',
    ownerId: 'owner6',
    title: 'Modern Studio in Mbeya',
    description: 'Compact modern studio apartment perfect for students and young professionals in Mbeya.',
    priceMonthly: 280000,
    location: {
      address: 'Mbeya Urban',
      city: 'Mbeya',
      district: 'Mbeya Urban',
      neighborhood: 'Mbeya',
      latitude: -8.9094,
      longitude: 33.4607
    },
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'studio',
    amenities: ['Security', 'Water Tank', 'Internet'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-03',
    updatedDate: '2024-01-03'
  },
  // Additional properties for comprehensive testing...
  // (Additional properties with detailed comments would continue here)
];

/**
 * Mock Users Data
 * Sample user accounts representing different user roles
 */
export const mockUsers: User[] = [
  {
    id: 'user1',
    fullName: 'John Mwamba',
    email: 'john.mwamba@gmail.com',
    phoneNumber: '+255712345678',
    userRole: 'tenant',
    registrationDate: '2024-01-01',
    isVerified: true
  },
  {
    id: 'owner1',
    fullName: 'Grace Kimonge',
    email: 'grace.kimonge@gmail.com',
    phoneNumber: '+255722345678',
    userRole: 'owner',
    registrationDate: '2023-12-15',
    isVerified: true
  },
  {
    id: 'admin1',
    fullName: 'Admin User',
    email: 'admin@nyumba-tz.com',
    phoneNumber: '+255732345678',
    userRole: 'admin',
    registrationDate: '2023-11-01',
    isVerified: true
  }
];

/**
 * Mock Viewing Requests Data
 * Sample viewing requests from tenants
 */
export const mockViewingRequests: ViewingRequest[] = [
  {
    id: 'req1',
    propertyId: '1',
    tenantId: 'user1',
    requestedDate: '2024-02-01',
    preferredTime: '14:00',
    status: 'pending',
    createdAt: '2024-01-20'
  }
];

/**
 * Mock Payments Data
 * Sample payment transactions with commission calculations
 */
export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    propertyId: '1',
    tenantId: 'user1',
    amountTotal: 1380000, // Total amount including 15% commission
    commissionAmount: 180000, // 15% commission
    ownerAmount: 1200000, // 85% to owner
    paymentMethod: 'mpesa',
    transactionReference: 'MP240115001',
    status: 'completed',
    paymentDate: '2024-01-15'
  }
];