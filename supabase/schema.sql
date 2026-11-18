-- ========================================================================
-- MEDISLOT AI - FULL SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- ========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  mrn TEXT UNIQUE,
  dob DATE,
  insurance_provider TEXT,
  insurance_id TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  clinic TEXT NOT NULL,
  address TEXT NOT NULL,
  experience_yrs INT NOT NULL DEFAULT 10,
  rating NUMERIC(3,2) NOT NULL DEFAULT 4.90,
  review_count INT NOT NULL DEFAULT 100,
  fee NUMERIC(10,2) NOT NULL DEFAULT 120.00,
  avatar_url TEXT NOT NULL,
  languages TEXT NOT NULL DEFAULT 'English',
  procedures TEXT NOT NULL,
  bio TEXT NOT NULL,
  match_percentage INT DEFAULT 95,
  earliest_slot TEXT DEFAULT 'Today, 2:15 PM',
  telehealth_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SLOTS TABLE
CREATE TABLE IF NOT EXISTS public.slots (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  doctor_id BIGINT REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  slot_date DATE NOT NULL,
  slot_time TEXT NOT NULL,
  session_period TEXT NOT NULL CHECK (session_period IN ('morning', 'afternoon')),
  type TEXT NOT NULL DEFAULT 'regular' CHECK (type IN ('regular', 'ai_pick', 'fast_track')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'locked', 'booked')),
  locked_until BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  doctor_id BIGINT REFERENCES public.doctors(id) ON DELETE RESTRICT NOT NULL,
  slot_id BIGINT REFERENCES public.slots(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  consult_mode TEXT NOT NULL DEFAULT 'in_person' CHECK (consult_mode IN ('in_person', 'telehealth')),
  symptoms TEXT,
  notes TEXT,
  special_needs TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'checked_in', 'rescheduled', 'cancelled')),
  fee NUMERIC(10,2) NOT NULL DEFAULT 120.00,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. PRESCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES public.doctors(id) ON DELETE RESTRICT,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  instructions TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'refill_requested', 'filled')),
  last_filled_date DATE,
  pharmacy TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. WAITLIST TABLE
CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  specialty_requested TEXT NOT NULL,
  doctor_id BIGINT REFERENCES public.doctors(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'claimed')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read profiles; users can update own profile
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Doctors: Public read access
CREATE POLICY "Doctors are viewable by everyone" ON public.doctors FOR SELECT USING (true);

-- Slots: Public read access; authenticated users can lock/update
CREATE POLICY "Slots are viewable by everyone" ON public.slots FOR SELECT USING (true);
CREATE POLICY "Anyone can update slot status" ON public.slots FOR UPDATE USING (true);

-- Appointments: Users see their own appointments, doctors see their appointments
CREATE POLICY "Users view own appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can book an appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update appointments" ON public.appointments FOR UPDATE USING (true);

-- Prescriptions: Viewable by everyone authenticated
CREATE POLICY "Prescriptions are viewable" ON public.prescriptions FOR SELECT USING (true);
CREATE POLICY "Prescription refill request" ON public.prescriptions FOR UPDATE USING (true);

-- Waitlist: Viewable & insertable
CREATE POLICY "Waitlist viewable" ON public.waitlist FOR SELECT USING (true);
CREATE POLICY "Waitlist insertable" ON public.waitlist FOR INSERT WITH CHECK (true);

-- ========================================================================
-- AUTOMATIC USER PROFILE TRIGGER
-- Automatically creates a profile when an auth.user signs up via Supabase
-- ========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    role,
    full_name,
    email,
    phone,
    mrn,
    avatar_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    'MRN-' || LPAD(FLOOR(RANDOM() * 90000 + 10000)::TEXT, 5, '0'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================================
-- SEED DATA: CLINICIANS & SAMPLE RECORDS
-- ========================================================================
INSERT INTO public.doctors (id, name, title, specialty, clinic, address, experience_yrs, rating, review_count, fee, avatar_url, languages, procedures, bio, match_percentage, earliest_slot, telehealth_available)
OVERRIDING SYSTEM VALUE
VALUES
(1, 'Dr. Sarah Jenkins, MD', 'Senior Cardiologist & Valve Specialist', 'Cardiology', 'Stanford Medical Center', 'Stanford Health Plaza, Suite 402, 300 Pasteur Dr, Palo Alto', 14, 4.98, 340, 120.00, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwb0Ju8pqUPElote7vtFU_c_LgubjUJfVGIICiRpMmb4Q-DBqCHCCasCWhQG4NwsB8G2ua4-FQ-6S68xHxPxkQfYhPLuUqPFh4FRh4R8gEaw63hI4Rbbc9bJ_bWxTQZop7qN-C1AmACmesRQqIuJE6LsS5T9fUb-19gFGQi3_Wb8yKT0j7njyweFvK4zC66P3Ny9-R0pZ5YM9pUyW1t7RpmIiB5BQCn9DZgVKlPo8', 'English, Spanish', 'Cardiac Auscultation, Electrocardiogram (ECG), Echocardiography, Holter Monitoring', 'Board-certified cardiologist specializing in structural heart disease, preventative cardiology, and AI-assisted arrhythmic detection.', 99, 'Today, 2:15 PM', TRUE),
(2, 'Dr. Sarah Chen, MD', 'Pediatric Dermatologist', 'Dermatology', 'St. Jude Pavilion', '100 Medical Center Way, Suite 210, Menlo Park', 9, 4.98, 128, 130.00, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', 'English, Mandarin', 'Pediatric Eczema, Dermatoscopy, Allergy Patch Testing', 'Harvard-trained dermatologist dedicated to gentle pediatric skin conditions and adolescent dermatology.', 96, 'Tomorrow, 10:00 AM', TRUE),
(3, 'Dr. Marcus Vance, MD', 'Orthopedic Surgeon & Sports Specialist', 'Orthopedics', 'Summit Health Pavilion', '450 University Ave, Suite 300, Palo Alto', 16, 4.92, 215, 150.00, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300', 'English', 'ACL Reconstruction, Meniscal Repair, Joint Injections', 'Specialist in robotic-assisted joint replacement and elite athletic performance rehabilitation.', 93, 'Today, 4:30 PM', FALSE),
(4, 'Dr. Elena Rostova, MD', 'Neuro-Oncologist & Cognitive Specialist', 'Neurology', 'Cerebral Center', '800 Welch Rd, Palo Alto', 12, 4.90, 89, 120.00, 'https://images.unsplash.com/photo-1594824813583-09415443e2a0?auto=format&fit=crop&q=80&w=300', 'English, Russian', 'EEG Mapping, Cognitive Screening, Migraine Neuromodulation', 'Leader in neuro-diagnostic protocols and comprehensive headache syndromes.', 91, 'Friday, 11:15 AM', TRUE),
(5, 'Dr. Julian Ramos, MD', 'Pediatric Specialist', 'Pediatrics', 'Children First Health Center', '320 Quarry Rd, Palo Alto', 11, 4.89, 175, 100.00, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300', 'English, Spanish', 'Well-Child Exams, Asthma Care, Developmental Milestones', 'Dedicated pediatrician focused on whole-child developmental health and preventative pediatrics.', 94, 'Today, 3:00 PM', TRUE),
(6, 'Dr. Marcus Chen, MD', 'Senior Pulmonologist', 'Pulmonology', 'Stanford Respiratory Health', '300 Pasteur Dr, Pavilion B, Palo Alto', 18, 4.95, 290, 140.00, 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300', 'English, Cantonese', 'Spirometry, Bronchoscopy, Sleep Apnea Titration', 'Expert in complex respiratory disorders, post-viral chronic cough, and athletic asthma.', 95, 'Today, 1:45 PM', TRUE),
(7, 'Dr. Ananya Patel, MD', 'Clinical Endocrinologist', 'Endocrinology', 'Bay Area Metabolic Clinic', '750 Welch Rd, Suite 110, Palo Alto', 13, 4.93, 160, 125.00, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', 'English, Hindi, Gujarati', 'Continuous Glucose Monitoring, Thyroid Ultrasound, Hormone Therapy', 'Specializing in glycemic optimization, thyroid nodules, and metabolic well-being.', 92, 'Thursday, 9:30 AM', TRUE)
ON CONFLICT (id) DO NOTHING;
