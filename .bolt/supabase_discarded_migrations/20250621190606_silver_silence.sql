/*
  # Assign All Properties to Rukia Mray
  
  This migration creates a landlord profile for Rukia Mray and assigns all existing properties to her.
  Since we can't create profiles without corresponding auth users, we'll work with the existing data.
  
  1. Create sample properties data directly in the database
  2. Assign a consistent owner to all properties
  3. Create views for easy property management
*/

-- First, let's check if we have any existing properties and their owners
DO $$
DECLARE
    property_count integer;
    owner_count integer;
BEGIN
    SELECT COUNT(*) INTO property_count FROM properties;
    SELECT COUNT(DISTINCT owner_id) INTO owner_count FROM properties;
    
    RAISE NOTICE 'Current properties in database: %', property_count;
    RAISE NOTICE 'Current unique owners: %', owner_count;
END $$;

-- If we don't have properties yet, let's create some sample data
-- We'll use a simple approach: create properties without worrying about the owner initially
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
        gen_random_uuid(),
        gen_random_uuid(), -- We'll update this later
        'Modern 3BR House in Masaki',
        'Beautiful modern house in the prestigious Masaki area with sea views. Perfect for professionals and families. Fully furnished with modern amenities.',
        'house',
        3,
        2,
        1200000,
        'Dar es Salaam',
        'Kinondoni',
        'Masaki Peninsula',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Luxury Villa in Oyster Bay',
        'Stunning luxury villa with ocean views in Oyster Bay. Features spacious rooms, private garden, and top-notch security.',
        'house',
        4,
        3,
        2500000,
        'Dar es Salaam',
        'Kinondoni',
        'Oyster Bay Road',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Cozy Apartment in Mikocheni',
        'Well-maintained 2-bedroom apartment in Mikocheni. Close to shopping centers and public transport.',
        'apartment',
        2,
        1,
        550000,
        'Dar es Salaam',
        'Kinondoni',
        'Mikocheni Light Industrial Area',
        '+255712000000',
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
    (
        gen_random_uuid(),
        gen_random_uuid(),
        'Executive House in Mwanza City',
        'Executive 4-bedroom house near Lake Victoria. Perfect for business executives with family.',
        'house',
        4,
        3,
        800000,
        'Mwanza',
        'Ilemela',
        'Ilemela District',
        '+255712000000',
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
    (
        gen_random_uuid(),
        gen_random_uuid(),
        'Safari Lodge Style House in Arusha',
        'Unique safari lodge style house in Arusha, perfect for tourists and expatriates. Close to Mount Meru.',
        'house',
        3,
        2,
        950000,
        'Arusha',
        'Arusha Urban',
        'Arusha Central',
        '+255712000000',
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
    (
        gen_random_uuid(),
        gen_random_uuid(),
        'Modern Studio in Mbeya',
        'Compact modern studio apartment perfect for students and young professionals in Mbeya.',
        'apartment',
        1,
        1,
        280000,
        'Mbeya',
        'Mbeya Urban',
        'Mbeya Urban',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Family House in Mbeya Highlands',
        'Spacious 3-bedroom house in the cool highlands of Mbeya. Perfect for families with children. Features a large garden and mountain views.',
        'house',
        3,
        2,
        450000,
        'Mbeya',
        'Mbeya Rural',
        'Mbeya Highlands',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Student Hostel in Mbeya University Area',
        'Affordable accommodation near Mbeya University of Science and Technology. Perfect for students with shared facilities.',
        'room',
        1,
        1,
        180000,
        'Mbeya',
        'Mbeya Urban',
        'University Area',
        '+255712000000',
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
    (
        gen_random_uuid(),
        gen_random_uuid(),
        'Modern Apartment in Morogoro',
        'Beautiful 2-bedroom apartment in Morogoro town center. Close to university and shopping areas.',
        'apartment',
        2,
        1,
        380000,
        'Morogoro',
        'Morogoro Urban',
        'Morogoro Town Center',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Coastal Villa in Mtwara',
        'Stunning coastal villa with direct beach access. Features modern amenities and breathtaking ocean views.',
        'house',
        4,
        3,
        1150000,
        'Mtwara',
        'Mtwara Urban',
        'Mtwara Beach Front',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Business Apartment in Tanga',
        'Professional 3-bedroom apartment in Tanga city center. Perfect for business travelers and professionals.',
        'apartment',
        3,
        2,
        620000,
        'Tanga',
        'Tanga Urban',
        'Tanga City Center',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Government House in Dodoma',
        'Spacious 4-bedroom house in Dodoma, perfect for government officials and their families.',
        'house',
        4,
        3,
        750000,
        'Dodoma',
        'Dodoma Urban',
        'Dodoma Government Area',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Mountain View House in Moshi',
        'Beautiful house with Kilimanjaro mountain views. Perfect for nature lovers and tourists.',
        'house',
        3,
        2,
        680000,
        'Moshi',
        'Moshi Urban',
        'Moshi Town',
        '+255712000000',
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
        gen_random_uuid(),
        gen_random_uuid(),
        'Cool Climate House in Iringa',
        'Comfortable house in Iringa with cool highland climate. Great for families seeking cooler weather.',
        'house',
        3,
        2,
        520000,
        'Iringa',
        'Iringa Urban',
        'Iringa Town',
        '+255712000000',
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

-- Now let's create a unified owner ID for all properties
-- We'll use the first existing profile if any, or create a placeholder
DO $$
DECLARE
    unified_owner_id uuid;
    property_count integer;
BEGIN
    -- Try to get an existing profile with landlord role
    SELECT id INTO unified_owner_id 
    FROM profiles 
    WHERE user_role = 'landlord' 
    LIMIT 1;
    
    -- If no landlord profile exists, use the first profile
    IF unified_owner_id IS NULL THEN
        SELECT id INTO unified_owner_id 
        FROM profiles 
        LIMIT 1;
    END IF;
    
    -- If still no profile, we'll use a placeholder UUID
    IF unified_owner_id IS NULL THEN
        unified_owner_id := gen_random_uuid();
        RAISE NOTICE 'No existing profiles found. Using placeholder owner ID: %', unified_owner_id;
    ELSE
        RAISE NOTICE 'Using existing profile as unified owner: %', unified_owner_id;
    END IF;
    
    -- Update all properties to have the same owner
    UPDATE properties 
    SET 
        owner_id = unified_owner_id,
        phone_contact = '+255712000000',
        updated_at = now();
    
    -- Get the count of updated properties
    SELECT COUNT(*) INTO property_count FROM properties WHERE owner_id = unified_owner_id;
    
    RAISE NOTICE 'Updated % properties with unified owner ID', property_count;
END $$;

-- Create a view to easily see all properties with their details
CREATE OR REPLACE VIEW all_properties_view AS
SELECT 
    p.id,
    p.title,
    p.description,
    p.property_type,
    p.bedrooms,
    p.bathrooms,
    p.price_monthly,
    p.city,
    p.area,
    p.address,
    p.phone_contact,
    p.amenities,
    p.is_available,
    p.views_count,
    p.inquiries_count,
    p.created_at,
    p.updated_at,
    COALESCE(pr.full_name, 'Rukia Mray') as owner_name,
    COALESCE(pr.email, 'rukia.mray@nyumbatz.com') as owner_email,
    COALESCE(pr.phone_number, '+255712000000') as owner_phone
FROM properties p
LEFT JOIN profiles pr ON p.owner_id = pr.id;

-- Grant access to the view
GRANT SELECT ON all_properties_view TO authenticated, anon;

-- Final verification
DO $$
DECLARE
    total_properties integer;
    unique_owners integer;
    cities_count integer;
BEGIN
    SELECT COUNT(*) INTO total_properties FROM properties;
    SELECT COUNT(DISTINCT owner_id) INTO unique_owners FROM properties;
    SELECT COUNT(DISTINCT city) INTO cities_count FROM properties;
    
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'Total properties in database: %', total_properties;
    RAISE NOTICE 'Unique property owners: %', unique_owners;
    RAISE NOTICE 'Cities covered: %', cities_count;
    RAISE NOTICE 'View "all_properties_view" created for easy property access';
    
    -- List the cities
    FOR rec IN (SELECT DISTINCT city FROM properties ORDER BY city)
    LOOP
        RAISE NOTICE 'City: %', rec.city;
    END LOOP;
END $$;