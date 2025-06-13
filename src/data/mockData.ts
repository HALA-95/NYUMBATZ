import { Property, User, ViewingRequest, Payment } from '../types';

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

export const propertyTypes = [
  { value: 'house', label: 'Nyumba (House)' },
  { value: 'apartment', label: 'Ghorofa (Apartment)' },
  { value: 'studio', label: 'Studio' },
  { value: 'villa', label: 'Villa' }
];

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
    featured: true
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
  // Additional Mbeya Properties
  {
    id: '7',
    ownerId: 'owner7',
    title: 'Family House in Mbeya Highlands',
    description: 'Spacious 3-bedroom house in the cool highlands of Mbeya. Perfect for families with children. Features a large garden and mountain views.',
    priceMonthly: 450000,
    location: {
      address: 'Mbeya Highlands',
      city: 'Mbeya',
      district: 'Mbeya Rural',
      neighborhood: 'Highlands',
      latitude: -8.8953,
      longitude: 33.4456
    },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house',
    amenities: ['Parking', 'Security', 'Water Tank', 'Garden', 'Internet'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-18',
    updatedDate: '2024-01-18'
  },
  {
    id: '8',
    ownerId: 'owner8',
    title: 'Affordable Apartment in Mbeya Town',
    description: 'Well-located 2-bedroom apartment in the heart of Mbeya town. Close to markets, schools, and public transport.',
    priceMonthly: 320000,
    location: {
      address: 'Mbeya Town Center',
      city: 'Mbeya',
      district: 'Mbeya Urban',
      neighborhood: 'Town Center',
      latitude: -8.9094,
      longitude: 33.4607
    },
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'apartment',
    amenities: ['Security', 'Water Tank', 'Internet', 'Parking'],
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-20',
    updatedDate: '2024-01-20'
  },
  {
    id: '9',
    ownerId: 'owner9',
    title: 'Executive Villa in Mbeya Peak',
    description: 'Luxury 4-bedroom villa with stunning views of Mbeya Peak. Features modern amenities, spacious rooms, and a beautiful garden.',
    priceMonthly: 750000,
    location: {
      address: 'Mbeya Peak Area',
      city: 'Mbeya',
      district: 'Mbeya Urban',
      neighborhood: 'Peak View',
      latitude: -8.8876,
      longitude: 33.4523
    },
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'villa',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Air Conditioning', 'Internet', 'Swimming Pool'],
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-22',
    updatedDate: '2024-01-22',
    featured: true
  },
  {
    id: '10',
    ownerId: 'owner10',
    title: 'Student Hostel in Mbeya University Area',
    description: 'Affordable accommodation near Mbeya University of Science and Technology. Perfect for students with shared facilities.',
    priceMonthly: 180000,
    location: {
      address: 'University Area',
      city: 'Mbeya',
      district: 'Mbeya Urban',
      neighborhood: 'University',
      latitude: -8.9123,
      longitude: 33.4789
    },
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'studio',
    amenities: ['Security', 'Water Tank', 'Internet'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-25',
    updatedDate: '2024-01-25'
  },
  {
    id: '11',
    ownerId: 'owner11',
    title: 'Business Center Apartment in Mbeya',
    description: 'Modern 2-bedroom apartment in the business district of Mbeya. Ideal for professionals and business travelers.',
    priceMonthly: 420000,
    location: {
      address: 'Business District',
      city: 'Mbeya',
      district: 'Mbeya Urban',
      neighborhood: 'Business Center',
      latitude: -8.9067,
      longitude: 33.4634
    },
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'apartment',
    amenities: ['Parking', 'Security', 'Generator', 'Water Tank', 'Internet', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-28',
    updatedDate: '2024-01-28'
  },
  {
    id: '12',
    ownerId: 'owner12',
    title: 'Countryside House in Mbeya Rural',
    description: 'Peaceful 3-bedroom house in rural Mbeya with large compound and farming potential. Perfect for those seeking tranquility.',
    priceMonthly: 350000,
    location: {
      address: 'Mbeya Rural',
      city: 'Mbeya',
      district: 'Mbeya Rural',
      neighborhood: 'Countryside',
      latitude: -8.8745,
      longitude: 33.4123
    },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house',
    amenities: ['Parking', 'Water Tank', 'Garden', 'Security'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    ],
    status: 'available',
    createdDate: '2024-01-30',
    updatedDate: '2024-01-30'
  }
];

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

export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    propertyId: '1',
    tenantId: 'user1',
    amountTotal: 1380000,
    commissionAmount: 180000,
    ownerAmount: 1200000,
    paymentMethod: 'mpesa',
    transactionReference: 'MP240115001',
    status: 'completed',
    paymentDate: '2024-01-15'
  }
];