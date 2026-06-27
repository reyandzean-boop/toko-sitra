-- =====================================================
-- PLAN B — Allow seed operations via anon (temporary)
-- Aman: hanya untuk seeding. Untuk produksi nanti
-- bisa di-disable lagi dengan DROP POLICY.
-- =====================================================

-- 1. Allow public INSERT portfolio_items (untuk seeding awal)
DROP POLICY IF EXISTS "Allow public insert portfolio" ON portfolio_items;
CREATE POLICY "Allow public insert portfolio" ON portfolio_items
  FOR INSERT WITH CHECK (true);

-- 2. Allow public INSERT menu_items (untuk menambah menu via API)
DROP POLICY IF EXISTS "Allow public insert menu" ON menu_items;
CREATE POLICY "Allow public insert menu" ON menu_items
  FOR INSERT WITH CHECK (true);

-- 3. Allow public INSERT/UPDATE/DELETE testimonials (untuk admin via API)
DROP POLICY IF EXISTS "Allow public modify testimonials" ON testimonials;
CREATE POLICY "Allow public modify testimonials" ON testimonials
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Allow public UPDATE/DELETE portfolio_items (untuk admin via API)
DROP POLICY IF EXISTS "Allow public modify portfolio" ON portfolio_items;
CREATE POLICY "Allow public modify portfolio" ON portfolio_items
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete portfolio" ON portfolio_items;
CREATE POLICY "Allow public delete portfolio" ON portfolio_items
  FOR DELETE USING (true);

-- 5. Allow public UPDATE/DELETE menu_items
DROP POLICY IF EXISTS "Allow public modify menu" ON menu_items;
CREATE POLICY "Allow public modify menu" ON menu_items
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Create storage buckets (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('menu-images', 'menu-images', true),
  ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT 'menu_items: ' || count(*) FROM menu_items
UNION ALL SELECT 'portfolio_items: ' || count(*) FROM portfolio_items
UNION ALL SELECT 'testimonials: ' || count(*) FROM testimonials;
