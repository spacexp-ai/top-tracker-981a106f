
-- Roles
CREATE TYPE public.app_role AS ENUM ('observer','tracker','member','admin');
CREATE TYPE public.booking_status AS ENUM ('draft','submitted','confirmed','completed','cancelled');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  country TEXT,
  tier public.app_role NOT NULL DEFAULT 'observer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Trigger: auto-create profile + default observer role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'observer');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Species catalog
CREATE TABLE public.species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  base_price_usd INTEGER NOT NULL,
  concession TEXT NOT NULL DEFAULT 'Iringa only',
  description TEXT,
  emoji TEXT,
  season_months INTEGER[] NOT NULL DEFAULT '{7,8,9}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.species TO authenticated, anon;
GRANT ALL ON public.species TO service_role;
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
CREATE POLICY "species public read" ON public.species FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "species admin write" ON public.species FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Professional hunters
CREATE TABLE public.professional_hunters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  years_experience INTEGER NOT NULL DEFAULT 0,
  photo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.professional_hunters TO authenticated, anon;
GRANT ALL ON public.professional_hunters TO service_role;
ALTER TABLE public.professional_hunters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ph public read" ON public.professional_hunters FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "ph admin write" ON public.professional_hunters FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  species_id UUID REFERENCES public.species(id),
  ph_id UUID REFERENCES public.professional_hunters(id),
  start_date DATE,
  end_date DATE,
  party_size INTEGER NOT NULL DEFAULT 1,
  camp_tier TEXT,
  kit JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,
  total_estimate_usd INTEGER,
  status public.booking_status NOT NULL DEFAULT 'draft',
  current_step INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bookings select" ON public.bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own bookings insert" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own bookings update" ON public.bookings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own bookings delete" ON public.bookings FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admin bookings all" ON public.bookings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER bookings_touch BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed species
INSERT INTO public.species (slug, name, base_price_usd, concession, description, emoji) VALUES
('lion','Lion',8500,'Iringa only','Maned Panthera leo — true dangerous game.','🦁'),
('elephant','Elephant',12000,'Iringa only','Loxodonta africana, tusked bulls only.','🐘'),
('buffalo','Buffalo',6500,'Iringa only','Cape buffalo — the black death.','🐃'),
('leopard','Leopard',9500,'Iringa only','Nocturnal Panthera pardus, baited hunt.','🐆'),
('kudu','Kudu',4800,'Iringa only','Greater kudu — spiral-horned ghost of the miombo.','🦌'),
('zebra','Zebra',2200,'All concessions','Burchells zebra — plains game.','🦓'),
('warthog','Warthog',1800,'All concessions','Phacochoerus africanus.','🐗'),
('eland',  'Eland',3500,'Iringa only','Largest antelope, tracked over long days.','🦌');

-- Seed PHs
INSERT INTO public.professional_hunters (name, bio, specialties, years_experience) VALUES
('Anton Chaga','Tanzanian-born Iringa specialist; 12 seasons in the miombo.','{lion,buffalo,kudu}',12),
('Marcus Kiboko','Selous transfer; renowned for tracking leopard on foot.','{leopard,buffalo,eland}',9),
('John Msuya','Maasai Steppe veteran; plains game and elephant.','{elephant,zebra,warthog}',15);

ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
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
