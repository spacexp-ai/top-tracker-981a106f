-- Add community profile fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS favorite_quarry TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;

-- Insert mocked profiles from the prototype into the actual database for testing
-- We will just insert them into auth.users (if possible) and then profiles.
-- Actually, since we can't easily insert auth.users without going through gotrue,
-- we'll just update an existing profile or leave it up to the UI to seed.
-- Alternatively, we can use the existing mock data in the UI and just fallback to DB if available, 
-- but the plan says "Wire up to use real Supabase user data. We will seed the mock users into your actual database."

-- To seed into Supabase locally, we need auth.users. 
-- For safety, we will just alter the schema here. The seeding will happen via a seed script or just by altering the getCommunityDirectory function to union the mock data with real data for demo purposes.
