-- Modify handle_new_user trigger function to assign 'admin' role automatically to gechandco@proton.me or zmanfai@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  assigned_role public.app_role;
BEGIN
  assigned_role := 'observer';
  IF NEW.email = 'gechandco@proton.me' OR NEW.email = 'zmanfai@gmail.com' THEN
    assigned_role := 'admin';
  END IF;

  INSERT INTO public.profiles (id, display_name, tier)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)),
    assigned_role
  );

  INSERT INTO public.user_roles (user_id, role) 
  VALUES (NEW.id, assigned_role);
  
  RETURN NEW;
END;
$$;

-- Elevate zmanfai@gmail.com to admin if the user is already registered in the system
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'zmanfai@gmail.com';
  
  IF target_user_id IS NOT NULL THEN
    -- Update profiles tier
    UPDATE public.profiles 
    SET tier = 'admin' 
    WHERE id = target_user_id;

    -- Delete conflicting roles and insert admin role
    DELETE FROM public.user_roles WHERE user_id = target_user_id;
    INSERT INTO public.user_roles (user_id, role) 
    VALUES (target_user_id, 'admin');
  END IF;
END $$;
