-- =====================================================
-- Migration: Tambah tabel hero_images
-- Jalankan di Supabase > SQL Editor > New Query
-- =====================================================

CREATE TABLE IF NOT EXISTS hero_images (
  section VARCHAR(50) PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(200),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read hero_images" ON hero_images;
CREATE POLICY "Public can read hero_images" ON hero_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access hero_images" ON hero_images;
CREATE POLICY "Admin full access hero_images" ON hero_images FOR ALL USING (true);

-- Insert default hero images (Unsplash placeholder)
INSERT INTO hero_images (section, image_url, alt_text) VALUES
  ('home_hero', 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920&q=80', 'Suasana Toko Sitra'),
  ('home_about', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80', 'Tentang Toko Sitra'),
  ('home_cta', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80', 'Hubungi kami')
ON CONFLICT (section) DO NOTHING;

-- Verifikasi
SELECT section, image_url, alt_text FROM hero_images ORDER BY section;
