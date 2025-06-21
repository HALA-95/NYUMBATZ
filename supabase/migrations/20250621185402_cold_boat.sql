/*
  # Insert Mock Properties Data into Database
  
  This migration inserts all the mock property data into the properties table.
  It creates sample landlord profiles and their properties with realistic data.
  
  1. Sample Data
    - Create sample landlord profiles
    - Insert all mock properties with proper relationships
    - Ensure data integrity and proper foreign keys
    
  2. Data Coverage
    - Properties across major Tanzanian cities
    - Various property types and price ranges
    - Realistic amenities and features
*/

-- First, create some sample landlord profiles
INSERT INTO profiles (
  id,
  full_name,
  email,
  phone_number,
  user_role,
  is_verified,
  created_at,
  updated_at
) VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Grace Kimonge', 'grace.kimonge@gmail.com', '+255722345678', 'landlord', true, now(), now()),
  ('550e8400-e29b-41d4-a716-446655440002', 'John Mwamba', 'john.mwamba@gmail.com', '+255712345678', 'landlord', true, now(), now()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Mary Shayo', 'mary.shayo@gmail.com', '+255732345678', 'landlord', true, now(), now()),
  ('550e8400-e29b-41d4-a716-446655440004', 'David Mwakibolwa', 'david.mwakibolwa@gmail.com', '+255742345678', 'landlord', true, now(), now()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Sarah Kimaro', 'sarah.kimaro@gmail.com', '+255752345678', 'landlord', true, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert all mock properties
INSERT INTO properties (
  id,
  owner_id,
  title,
  description,
  property_type,
  bedrooms,
  bathrooms,
  price_monthly,
  city,
  area,
  address,
  phone_contact,
  images,
  amenities,
  utilities,
  nearby_services,
  is_available,
  views_count,
  inquiries_count,
  created_at,
  updated_at
) VALUES 
  -- Premium Properties in Dar es Salaam
  (
    '550e8400-e29b-41d4-a716-446655440101',
    '550e8400-e29b-41d4-a716-446655440001',
    'Modern 3BR House in Masaki',
    'Beautiful modern house in the prestigious Masaki area with sea views. Perfect for professionals and families. Fully furnished with modern amenities.',
    'house',
    3,
    2,
    1200000,
    'Dar es Salaam',
    'Kinondoni',
    'Masaki Peninsula',
    '+255722345678',
    ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Air Conditioning', 'Internet', 'Furnished'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Solar Power'],
    ARRAY['Hospital', 'Supermarket', 'Bank', 'Restaurant', 'Beach'],
    true,
    45,
    8,
    '2024-01-15'::timestamptz,
    '2024-01-15'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440102',
    '550e8400-e29b-41d4-a716-446655440002',
    'Luxury Villa in Oyster Bay',
    'Stunning luxury villa with ocean views in Oyster Bay. Features spacious rooms, private garden, and top-notch security.',
    'house',
    4,
    3,
    2500000,
    'Dar es Salaam',
    'Kinondoni',
    'Oyster Bay Road',
    '+255712345678',
    ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Swimming Pool', 'Air Conditioning', 'Internet', 'Furnished'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Solar Power', 'Backup Generator'],
    ARRAY['Hospital', 'Clinic', 'Supermarket', 'Bank', 'Restaurant', 'Beach', 'ATM'],
    true,
    67,
    12,
    '2024-01-10'::timestamptz,
    '2024-01-10'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440103',
    '550e8400-e29b-41d4-a716-446655440003',
    'Cozy Apartment in Mikocheni',
    'Well-maintained 2-bedroom apartment in Mikocheni. Close to shopping centers and public transport.',
    'apartment',
    2,
    1,
    550000,
    'Dar es Salaam',
    'Kinondoni',
    'Mikocheni Light Industrial Area',
    '+255732345678',
    ARRAY['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
    ARRAY['Parking', 'Security', 'Water Tank', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['Market', 'Supermarket', 'Bus Stop', 'Pharmacy'],
    true,
    23,
    5,
    '2024-01-12'::timestamptz,
    '2024-01-12'::timestamptz
  ),
  
  -- Regional Properties - Mwanza
  (
    '550e8400-e29b-41d4-a716-446655440104',
    '550e8400-e29b-41d4-a716-446655440004',
    'Executive House in Mwanza City',
    'Executive 4-bedroom house near Lake Victoria. Perfect for business executives with family.',
    'house',
    4,
    3,
    800000,
    'Mwanza',
    'Ilemela',
    'Ilemela District',
    '+255742345678',
    ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Backup Generator'],
    ARRAY['Hospital', 'Primary School', 'Market', 'Bank', 'Lake Victoria'],
    true,
    34,
    7,
    '2024-01-08'::timestamptz,
    '2024-01-08'::timestamptz
  ),
  
  -- Tourism Properties - Arusha
  (
    '550e8400-e29b-41d4-a716-446655440105',
    '550e8400-e29b-41d4-a716-446655440005',
    'Safari Lodge Style House in Arusha',
    'Unique safari lodge style house in Arusha, perfect for tourists and expatriates. Close to Mount Meru.',
    'house',
    3,
    2,
    950000,
    'Arusha',
    'Arusha Urban',
    'Arusha Central',
    '+255752345678',
    ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Air Conditioning', 'Internet', 'Furnished'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Solar Power'],
    ARRAY['Hospital', 'University', 'Market', 'Bank', 'Restaurant', 'Mount Meru'],
    true,
    28,
    6,
    '2024-01-05'::timestamptz,
    '2024-01-05'::timestamptz
  ),
  
  -- Budget Properties - Mbeya
  (
    '550e8400-e29b-41d4-a716-446655440106',
    '550e8400-e29b-41d4-a716-446655440001',
    'Modern Studio in Mbeya',
    'Compact modern studio apartment perfect for students and young professionals in Mbeya.',
    'apartment',
    1,
    1,
    280000,
    'Mbeya',
    'Mbeya Urban',
    'Mbeya Urban',
    '+255722345678',
    ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    ARRAY['Security', 'Water Tank', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['University', 'Market', 'Bus Stop', 'Clinic'],
    true,
    15,
    3,
    '2024-01-03'::timestamptz,
    '2024-01-03'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440107',
    '550e8400-e29b-41d4-a716-446655440002',
    'Family House in Mbeya Highlands',
    'Spacious 3-bedroom house in the cool highlands of Mbeya. Perfect for families with children. Features a large garden and mountain views.',
    'house',
    3,
    2,
    450000,
    'Mbeya',
    'Mbeya Rural',
    'Mbeya Highlands',
    '+255712345678',
    ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
    ARRAY['Parking', 'Security', 'Water Tank', 'Garden', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['Primary School', 'Secondary School', 'Market', 'Clinic', 'Mountains'],
    true,
    19,
    4,
    '2024-01-18'::timestamptz,
    '2024-01-18'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440108',
    '550e8400-e29b-41d4-a716-446655440003',
    'Student Hostel in Mbeya University Area',
    'Affordable accommodation near Mbeya University of Science and Technology. Perfect for students with shared facilities.',
    'room',
    1,
    1,
    180000,
    'Mbeya',
    'Mbeya Urban',
    'University Area',
    '+255732345678',
    ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'],
    ARRAY['Security', 'Water Tank', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['University', 'Market', 'Bus Stop', 'Pharmacy', 'Library'],
    true,
    12,
    2,
    '2024-01-25'::timestamptz,
    '2024-01-25'::timestamptz
  ),
  
  -- Additional Properties for Better Coverage
  (
    '550e8400-e29b-41d4-a716-446655440109',
    '550e8400-e29b-41d4-a716-446655440004',
    'Modern Apartment in Morogoro',
    'Beautiful 2-bedroom apartment in Morogoro town center. Close to university and shopping areas.',
    'apartment',
    2,
    1,
    380000,
    'Morogoro',
    'Morogoro Urban',
    'Morogoro Town Center',
    '+255742345678',
    ARRAY['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
    ARRAY['Parking', 'Security', 'Water Tank', 'Internet', 'Balcony'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['University', 'Market', 'Supermarket', 'Bank', 'Hospital'],
    true,
    21,
    4,
    '2024-01-20'::timestamptz,
    '2024-01-20'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440110',
    '550e8400-e29b-41d4-a716-446655440005',
    'Coastal Villa in Mtwara',
    'Stunning coastal villa with direct beach access. Features modern amenities and breathtaking ocean views.',
    'house',
    4,
    3,
    1150000,
    'Mtwara',
    'Mtwara Urban',
    'Mtwara Beach Front',
    '+255752345678',
    ARRAY['https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Swimming Pool', 'Air Conditioning', 'Internet', 'Furnished'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Solar Power', 'Backup Generator'],
    ARRAY['Hospital', 'Market', 'Restaurant', 'Beach', 'Port'],
    true,
    38,
    9,
    '2024-02-18'::timestamptz,
    '2024-02-18'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440111',
    '550e8400-e29b-41d4-a716-446655440001',
    'Business Apartment in Tanga',
    'Professional 3-bedroom apartment in Tanga city center. Perfect for business travelers and professionals.',
    'apartment',
    3,
    2,
    620000,
    'Tanga',
    'Tanga Urban',
    'Tanga City Center',
    '+255722345678',
    ARRAY['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Air Conditioning', 'Internet', 'Furnished'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Backup Generator'],
    ARRAY['Hospital', 'Bank', 'Market', 'Restaurant', 'Port'],
    true,
    26,
    5,
    '2024-02-01'::timestamptz,
    '2024-02-01'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440112',
    '550e8400-e29b-41d4-a716-446655440002',
    'Government House in Dodoma',
    'Spacious 4-bedroom house in Dodoma, perfect for government officials and their families.',
    'house',
    4,
    3,
    750000,
    'Dodoma',
    'Dodoma Urban',
    'Dodoma Government Area',
    '+255712345678',
    ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    ARRAY['Parking', 'Security', 'Generator', 'Water Tank', 'Garden', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready', 'Solar Power'],
    ARRAY['Hospital', 'Primary School', 'Secondary School', 'Market', 'Government Offices'],
    true,
    31,
    6,
    '2024-02-05'::timestamptz,
    '2024-02-05'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440113',
    '550e8400-e29b-41d4-a716-446655440003',
    'Mountain View House in Moshi',
    'Beautiful house with Kilimanjaro mountain views. Perfect for nature lovers and tourists.',
    'house',
    3,
    2,
    680000,
    'Moshi',
    'Moshi Urban',
    'Moshi Town',
    '+255732345678',
    ARRAY['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
    ARRAY['Parking', 'Security', 'Water Tank', 'Garden', 'Internet', 'Mountain View'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['Hospital', 'Market', 'Restaurant', 'Kilimanjaro National Park', 'Coffee Farms'],
    true,
    29,
    7,
    '2024-02-10'::timestamptz,
    '2024-02-10'::timestamptz
  ),
  (
    '550e8400-e29b-41d4-a716-446655440114',
    '550e8400-e29b-41d4-a716-446655440004',
    'Cool Climate House in Iringa',
    'Comfortable house in Iringa with cool highland climate. Great for families seeking cooler weather.',
    'house',
    3,
    2,
    520000,
    'Iringa',
    'Iringa Urban',
    'Iringa Town',
    '+255742345678',
    ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
    ARRAY['Parking', 'Security', 'Water Tank', 'Garden', 'Internet'],
    ARRAY['Electricity (TANESCO)', 'Water (DAWASA)', 'Internet Ready'],
    ARRAY['Hospital', 'University', 'Market', 'Bank', 'Cool Climate'],
    true,
    18,
    3,
    '2024-02-12'::timestamptz,
    '2024-02-12'::timestamptz
  )
ON CONFLICT (id) DO NOTHING;

-- Update the sequences to avoid conflicts
SELECT setval('properties_id_seq', (SELECT MAX(id::text::bigint) FROM properties WHERE id ~ '^[0-9]+$'), true);

-- Create some sample property inquiries
INSERT INTO property_inquiries (
  id,
  property_id,
  tenant_id,
  tenant_name,
  tenant_phone,
  message,
  status,
  created_at,
  updated_at
) VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440201',
    '550e8400-e29b-41d4-a716-446655440101',
    '550e8400-e29b-41d4-a716-446655440001',
    'Michael Johnson',
    '+255712345679',
    'Hi, I am interested in viewing this beautiful house in Masaki. When would be a good time to schedule a viewing?',
    'new',
    now() - interval '2 days',
    now() - interval '2 days'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440202',
    '550e8400-e29b-41d4-a716-446655440102',
    '550e8400-e29b-41d4-a716-446655440002',
    'Sarah Williams',
    '+255722345679',
    'I would like to know more about the villa in Oyster Bay. Is it still available for rent?',
    'contacted',
    now() - interval '1 day',
    now() - interval '1 day'
  )
ON CONFLICT (id) DO NOTHING;

-- Verify the data was inserted
DO $$
BEGIN
  RAISE NOTICE 'Properties inserted: %', (SELECT COUNT(*) FROM properties);
  RAISE NOTICE 'Landlord profiles created: %', (SELECT COUNT(*) FROM profiles WHERE user_role = 'landlord');
  RAISE NOTICE 'Sample inquiries created: %', (SELECT COUNT(*) FROM property_inquiries);
  RAISE NOTICE 'Cities covered: %', (SELECT COUNT(DISTINCT city) FROM properties);
  RAISE NOTICE 'Migration completed successfully!';
END $$;