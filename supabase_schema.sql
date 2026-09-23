-- ===================================================
-- EVOLVIX REAL ESTATE SUPABASE DATABASE SCHEMA & SEED
-- Execute this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ===================================================

-- 1. Create Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    location TEXT NOT NULL,
    address TEXT,
    price NUMERIC NOT NULL,
    price_label TEXT,
    beds INT NOT NULL,
    baths NUMERIC NOT NULL,
    sqft INT NOT NULL,
    acres NUMERIC,
    year_built INT,
    property_type TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    featured BOOLEAN DEFAULT false,
    hero_image TEXT,
    images JSONB,
    features JSONB,
    description TEXT,
    architect TEXT,
    agent_id TEXT,
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author TEXT,
    author_role TEXT,
    read_time TEXT,
    published_at TEXT,
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Agents Table
CREATE TABLE IF NOT EXISTS public.agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    email TEXT,
    phone TEXT,
    image TEXT,
    specialties JSONB,
    total_sales TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id TEXT,
    property_title TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    inquiry_type TEXT DEFAULT 'VIP Inquiry',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Showings Table
CREATE TABLE IF NOT EXISTS public.showings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id TEXT NOT NULL,
    property_title TEXT NOT NULL,
    tour_type TEXT DEFAULT 'Private VIP In-Person Tour',
    tour_date TEXT NOT NULL,
    user_name TEXT,
    user_email TEXT,
    agent_name TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to listings, blogs, and agents
CREATE POLICY "Allow public read access to properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow public read access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access to agents" ON public.agents FOR SELECT USING (true);

-- Allow anyone to submit inquiries and schedule showings
CREATE POLICY "Allow anonymous inquiries insertion" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous showings insertion" ON public.showings FOR INSERT WITH CHECK (true);

-- ===================================================
-- SAMPLE SEED DATA
-- ===================================================

INSERT INTO public.properties (id, title, tagline, location, address, price, price_label, beds, baths, sqft, acres, year_built, property_type, status, featured, hero_image, images, features, description, architect, agent_id, coordinates)
VALUES 
('prop-01', 'The Bel Air Promontory', 'A masterpiece of architectural brilliance perched above the city lights', 'Bel Air, Los Angeles, CA', '10771 Bellagio Rd, Los Angeles, CA 90077', 48500000, '$48,500,000', 7, 11, 18500, 2.4, 2024, 'Estate', 'Active', true, 
'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
'["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"]'::jsonb,
'["Infinity Edge Pool", "300-bottle Wine Cellar", "Helipad Access", "Private Spa", "Smart Home Automation"]'::jsonb,
'Commanding unparalleled panoramic views from Downtown LA to the Pacific Ocean, The Bel Air Promontory represents the pinnacle of modern luxury architecture.',
'SAOTA Architects', 'agent-01', '{"lat": 34.0837, "lng": -118.444}'::jsonb),

('prop-02', 'The TriBeCa Sky Penthouse', 'Triple-mint triplex crowning one of TriBeCa’s premier historic landmark buildings', 'TriBeCa, New York, NY', '145 Hudson St, PH, New York, NY 10013', 32000000, '$32,000,000', 5, 6.5, 9200, 0, 2023, 'Penthouse', 'Active', true,
'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
'["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"]'::jsonb,
'["Private Elevator", "360-degree Skyline Views", "Heated Terrace", "Custom Boffi Kitchen"]'::jsonb,
'Floating above Manhattan’s most coveted historic neighborhood, this custom architectural trophy offering features 4,000 sq ft of private wrap-around terrace.',
'Annabelle Selldorf', 'agent-02', '{"lat": 40.7191, "lng": -74.0089}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.blogs (id, title, slug, excerpt, category, author, author_role, read_time, published_at, cover_image)
VALUES 
('blog-01', 'The Evolution of Ultra-Luxury Real Estate in 2025', 'evolution-ultra-luxury-real-estate-2025', 'Discover how sustainability, biophilic architecture, and smart automation are redefining trophy residences across global gateways.', 'Market Insights', 'Victoria Vance', 'Senior Managing Director', '5 min read', 'Jan 24, 2025', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (id) DO NOTHING;
