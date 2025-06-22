/*
  # Assign Properties to Rukia Mray
  
  This migration creates a landlord profile for Rukia Mray and assigns
  all existing properties to her account.
  
  1. Create Rukia Mray's profile
  2. Update all properties to be owned by Rukia
  3. Verify the assignment
*/

-- First, let's create a specific UUID for Rukia Mray
-- Using a deterministic UUID so we can reference it consistently
DO $$
DECLARE
    rukia_id uuid := '11111111-1111-1111-1111-111111111111';
BEGIN
    -- Insert Rukia Mray's profile if it doesn't exist
    INSERT INTO profiles (
        id,
        full_name,
        email,
        phone_number,
        user_role,
        is_verified,
        created_at,
        updated_at
    ) VALUES (
        rukia_id,
        'Rukia Mray',
        'rukia.mray@nyumbatz.com',
        '+255712000000',
        'landlord',
        true,
        now(),
        now()
    ) ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        phone_contact = EXCLUDED.phone_number,
        user_role = EXCLUDED.user_role,
        is_verified = EXCLUDED.is_verified,
        updated_at = now();

    -- Update all existing properties to be owned by Rukia Mray
    UPDATE properties 
    SET 
        owner_id = rukia_id,
        phone_contact = '+255712000000',
        updated_at = now()
    WHERE owner_id IS NULL OR owner_id != rukia_id;

    -- Log the results
    RAISE NOTICE 'Rukia Mray profile created/updated with ID: %', rukia_id;
    RAISE NOTICE 'Properties assigned to Rukia Mray: %', (
        SELECT COUNT(*) FROM properties WHERE owner_id = rukia_id
    );
END $$;

-- Verify the assignment
DO $$
DECLARE
    total_properties integer;
    rukia_properties integer;
    rukia_id uuid := '11111111-1111-1111-1111-111111111111';
BEGIN
    SELECT COUNT(*) INTO total_properties FROM properties;
    SELECT COUNT(*) INTO rukia_properties FROM properties WHERE owner_id = rukia_id;
    
    RAISE NOTICE 'Total properties in database: %', total_properties;
    RAISE NOTICE 'Properties owned by Rukia Mray: %', rukia_properties;
    
    IF rukia_properties = total_properties THEN
        RAISE NOTICE 'SUCCESS: All properties successfully assigned to Rukia Mray!';
    ELSE
        RAISE NOTICE 'WARNING: Not all properties assigned. Check for issues.';
    END IF;
END $$;

-- Create a view to easily see Rukia's properties
CREATE OR REPLACE VIEW rukia_properties AS
SELECT 
    p.*,
    pr.full_name as owner_name,
    pr.email as owner_email,
    pr.phone_number as owner_phone
FROM properties p
JOIN profiles pr ON p.owner_id = pr.id
WHERE pr.full_name = 'Rukia Mray';

-- Grant access to the view
GRANT SELECT ON rukia_properties TO authenticated, anon;

RAISE NOTICE 'Migration completed! All properties are now owned by Rukia Mray.';