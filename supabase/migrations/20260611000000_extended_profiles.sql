-- Add extended profile fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience_level TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_weapon TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS boot_size TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS apparel_size TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dominant_hand TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS firearm_permit_num TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_country TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_num TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_camp TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS primary_interests TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary TEXT;
