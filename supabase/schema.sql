-- =====================================================
-- Toko Sitra — Supabase Schema
-- Jalankan SQL ini di Supabase > SQL Editor > New Query
-- =====================================================

-- ===== TABEL: menu_items =====
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Kopi', 'Non-Kopi', 'Makanan', 'Snack')),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== TABEL: portfolio_items =====
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(200),
  category VARCHAR(50) NOT NULL CHECK (category IN ('Branding', 'Social Media', 'Iklan Digital', 'Desain')),
  client_name VARCHAR(100),
  year INTEGER,
  thumbnail_url TEXT,
  gallery_urls TEXT[],
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== TABEL: contact_messages =====
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(20),
  purpose VARCHAR(50) CHECK (purpose IN ('menu', 'penawaran', 'kolaborasi', 'lainnya')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== TABEL: testimonials =====
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) DEFAULT 5,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== TABEL: hero_images =====
-- Foto utama di berbagai section homepage
CREATE TABLE IF NOT EXISTS hero_images (
  section VARCHAR(50) PRIMARY KEY,       -- 'home_hero', 'home_about', 'home_cta'
  image_url TEXT NOT NULL,
  alt_text VARCHAR(200),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default hero images
INSERT INTO hero_images (section, image_url, alt_text) VALUES
  ('home_hero', 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920&q=80', 'Suasana Toko Sitra'),
  ('home_about', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80', 'Tentang Toko Sitra'),
  ('home_cta', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80', 'Hubungi kami')
ON CONFLICT (section) DO NOTHING;

-- ===== ROW LEVEL SECURITY (RLS) =====
-- Publik hanya boleh baca menu, portfolio, testimonials, hero_images.
-- Publik boleh insert contact_messages tapi tidak boleh baca.
-- Admin (authenticated) punya akses penuh ke semua tabel.

-- menu_items
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read menu" ON menu_items;
CREATE POLICY "Public can read menu" ON menu_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access menu" ON menu_items;
CREATE POLICY "Admin full access menu" ON menu_items FOR ALL USING (true);

-- portfolio_items
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read portfolio" ON portfolio_items;
CREATE POLICY "Public can read portfolio" ON portfolio_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access portfolio" ON portfolio_items;
CREATE POLICY "Admin full access portfolio" ON portfolio_items FOR ALL USING (true);

-- testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read testimonials" ON testimonials;
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access testimonials" ON testimonials;
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (true);

-- hero_images
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read hero_images" ON hero_images;
CREATE POLICY "Public can read hero_images" ON hero_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access hero_images" ON hero_images;
CREATE POLICY "Admin full access hero_images" ON hero_images FOR ALL USING (true);

-- contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert messages" ON contact_messages;
CREATE POLICY "Public can insert messages" ON contact_messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access messages" ON contact_messages;
CREATE POLICY "Admin full access messages" ON contact_messages FOR ALL USING (true);

-- ===== INDEX untuk performa =====
CREATE INDEX IF NOT EXISTS idx_menu_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(is_read);

-- =====================================================
-- INSTRUKSI STORAGE BUCKETS
-- =====================================================
-- 1. Buka menu Storage di Supabase Dashboard
-- 2. Create bucket "menu-images" (centang "Public bucket")
-- 3. Create bucket "portfolio-images" (centang "Public bucket")
-- 4. Policy untuk storage (lihat file allow-storage.sql)
-- =====================================================

-- =====================================================
-- DATA CONTOH (opsional)
-- =====================================================

INSERT INTO menu_items (name, description, price, category, is_featured) VALUES
  ('Es Kopi Susu Gula Aren', 'Espresso double shot dengan susu segar dan gula aren.', 25000, 'Kopi', true),
  ('Matcha Latte', 'Matcha premium Uji dengan susu steamed.', 28000, 'Non-Kopi', true),
  ('Croissant Butter', 'Croissant renyah dengan butter Perancis.', 18000, 'Makanan', true)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, role, content, rating) VALUES
  ('Andini Putri', 'Pelanggan Setia', 'Kopi di sini selalu jadi mood booster pagi saya!', 5),
  ('Budi Santoso', 'CEO Startup', 'Tim Toko Sitra bantu rebranding startup kami dengan luar biasa.', 5)
ON CONFLICT DO NOTHING;
