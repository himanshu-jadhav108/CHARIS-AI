-- ========================================================
-- CHARIS SOVEREIGN LUXURY AI GIFT CONCIERGE DATABASE SCHEMA
-- Target Platform: Supabase PostgreSQL (Cloud Hosted)
-- ========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    category VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    luxury_score DOUBLE PRECISION DEFAULT 9.5,
    personality_tags JSONB DEFAULT '[]'::jsonb,
    interest_tags JSONB DEFAULT '[]'::jsonb,
    occasion_tags JSONB DEFAULT '[]'::jsonb,
    relationship_tags JSONB DEFAULT '[]'::jsonb,
    emotional_tags JSONB DEFAULT '[]'::jsonb,
    story TEXT NOT NULL,
    delivery TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USERS PROFILE TABLE (Linked to Supabase Auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    tier VARCHAR(255) DEFAULT 'Charis VIP Sovereign Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    preferred_currency VARCHAR(10) DEFAULT '₹',
    language VARCHAR(50) DEFAULT 'English',
    theme_preference VARCHAR(50) DEFAULT 'Classic Luxury',
    notification_preference VARCHAR(50) DEFAULT 'Email & WhatsApp',
    luxury_preference VARCHAR(255) DEFAULT 'Quiet Understated Luxury',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. RECIPIENTS TABLE
CREATE TABLE IF NOT EXISTS recipients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(255) NOT NULL,
    birthday DATE,
    anniversary DATE,
    favourite_colours JSONB DEFAULT '[]'::jsonb,
    favourite_brands JSONB DEFAULT '[]'::jsonb,
    hobbies JSONB DEFAULT '[]'::jsonb,
    lifestyle VARCHAR(255),
    luxury_preference VARCHAR(255),
    personal_notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GIFT HISTORY TABLE
CREATE TABLE IF NOT EXISTS gift_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    recipient_id UUID REFERENCES recipients(id) ON DELETE SET NULL,
    product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    occasion VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    budget VARCHAR(255),
    generated_message TEXT,
    delivery_preference TEXT DEFAULT 'White-Glove Armored Courier',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MEMORY BOXES TABLE
CREATE TABLE IF NOT EXISTS memory_boxes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    consultation_id VARCHAR(255) NOT NULL,
    why_it_matters TEXT NOT NULL,
    emotional_story TEXT NOT NULL,
    personal_reflection TEXT NOT NULL,
    luxury_presentation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 8. CONSULTATIONS / CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS consultations (
    id VARCHAR(255) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) DEFAULT 'Bespoke Gift Consultation',
    recipient VARCHAR(255),
    occasion VARCHAR(255),
    budget VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    preferences JSONB DEFAULT '{}'::jsonb,
    chat_history JSONB DEFAULT '[]'::jsonb,
    recommended_product_ids JSONB DEFAULT '[]'::jsonb,
    recommendations_payload JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on all user-owned tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 1. Users Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- 2. User Preferences Policies
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- 3. Recipients Policies
CREATE POLICY "Users can view own recipients" ON recipients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recipients" ON recipients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recipients" ON recipients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own recipients" ON recipients FOR DELETE USING (auth.uid() = user_id);

-- 4. Gift History Policies
CREATE POLICY "Users can view own gift history" ON gift_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gift history" ON gift_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Memory Boxes Policies
CREATE POLICY "Users can view own memory boxes" ON memory_boxes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own memory boxes" ON memory_boxes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Wishlists Policies
CREATE POLICY "Users can view own wishlist" ON wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist" ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist" ON wishlists FOR DELETE USING (auth.uid() = user_id);

-- 7. Consultations Policies
CREATE POLICY "Users can view own consultations" ON consultations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own consultations" ON consultations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own consultations" ON consultations FOR UPDATE USING (auth.uid() = user_id);

-- ========================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_recipients_user_id ON recipients(user_id);
CREATE INDEX IF NOT EXISTS idx_gift_history_user_id ON gift_history(user_id);
CREATE INDEX IF NOT EXISTS idx_memory_boxes_user_id ON memory_boxes(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
