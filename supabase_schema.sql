-- ====================================================================
-- AGRI AI 366 - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- Execute this SQL in your Supabase SQL Editor (https://app.supabase.com)
-- ====================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked to auth.users)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    location TEXT DEFAULT 'Ludhiana, Punjab',
    state TEXT DEFAULT 'Punjab',
    district TEXT DEFAULT 'Ludhiana',
    total_area_acres NUMERIC(8,2) DEFAULT 0.00,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    plan_type TEXT DEFAULT 'FREE' CHECK (plan_type IN ('FREE', 'PRO', 'PREMIUM')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- --------------------------------------------------------------------
-- 2. AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        full_name, 
        email, 
        phone, 
        avatar_url,
        plan_type
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Kisan Farmer'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'),
        'FREE'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --------------------------------------------------------------------
-- 3. FARMS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    farm_name TEXT NOT NULL,
    location TEXT NOT NULL,
    area_acres NUMERIC(8,2) NOT NULL DEFAULT 1.0,
    crop_type TEXT NOT NULL,
    soil_type TEXT DEFAULT 'Alluvial',
    irrigation_source TEXT DEFAULT 'Tubewell',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own farms"
    ON public.farms FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own farms"
    ON public.farms FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own farms"
    ON public.farms FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own farms"
    ON public.farms FOR DELETE USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 4. MARKETPLACE PRODUCTS TABLE (Crop & Agri Items Marketplace)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.marketplace_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. Grains, Vegetables, Fruits, Seeds, Fertilizer
    price_per_unit NUMERIC(10,2) NOT NULL,
    unit TEXT NOT NULL DEFAULT 'Quintal',
    quantity_available NUMERIC(10,2) NOT NULL,
    location TEXT NOT NULL,
    district TEXT DEFAULT '366 District Mandi',
    seller_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SOLD', 'INACTIVE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Marketplace items are viewable by everyone"
    ON public.marketplace_products FOR SELECT USING (true);

CREATE POLICY "Users can insert their own marketplace items"
    ON public.marketplace_products FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own marketplace items"
    ON public.marketplace_products FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own marketplace items"
    ON public.marketplace_products FOR DELETE USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 5. EQUIPMENT RENTALS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.equipment_rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    equipment_name TEXT NOT NULL,
    category TEXT NOT NULL, -- Tractor, Harvester, Drone, Seeder, etc.
    rate_per_hour NUMERIC(10,2) NOT NULL,
    location TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    is_available BOOLEAN DEFAULT true,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.equipment_rentals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipment items are viewable by everyone"
    ON public.equipment_rentals FOR SELECT USING (true);

CREATE POLICY "Users can insert their equipment"
    ON public.equipment_rentals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their equipment"
    ON public.equipment_rentals FOR UPDATE USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 6. DISEASE SCANS TABLE (AI Plant Diagnostics History)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.disease_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    detected_disease TEXT NOT NULL,
    confidence_score NUMERIC(5,2) NOT NULL, -- e.g. 98.50
    treatment_advice TEXT NOT NULL,
    severity_level TEXT DEFAULT 'Moderate', -- Mild, Moderate, Severe
    image_url TEXT,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.disease_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own disease scans"
    ON public.disease_scans FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their disease scans"
    ON public.disease_scans FOR INSERT WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 7. COMMUNITY FORUM POSTS & COMMENTS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'General', -- Pest Alert, Crop Advice, Mandi Prices, Government Schemes
    author_name TEXT NOT NULL,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Forum posts are viewable by everyone"
    ON public.forum_posts FOR SELECT USING (true);

CREATE POLICY "Users can create forum posts"
    ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
    ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.forum_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Forum comments are viewable by everyone"
    ON public.forum_comments FOR SELECT USING (true);

CREATE POLICY "Users can post comments"
    ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 8. EXPERT CONSULTATIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.expert_consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    expert_name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
    query_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.expert_consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consultation bookings"
    ON public.expert_consultations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can book consultations"
    ON public.expert_consultations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ====================================================================
-- SEED DATA (Optional initial sample records for Mandi Marketplace)
-- ====================================================================

INSERT INTO public.marketplace_products 
(id, user_id, title, category, price_per_unit, unit, quantity_available, location, district, seller_name, contact_phone, description, status)
VALUES
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '00000000-0000-0000-0000-000000000000'::uuid, -- Default fallback ID for demo listing
    'Organic Sharbati Wheat Grade A',
    'Grains',
    2450.00,
    'Quintal',
    150.00,
    'Khanna Mandi, Ludhiana',
    'Ludhiana',
    'Gurpreet Singh',
    '+91 98765 43210',
    'High quality organic Sharbati wheat, freshly harvested. Moisture content < 12%.',
    'ACTIVE'
)
ON CONFLICT (id) DO NOTHING;
