-- =====================================================
-- Allow storage uploads untuk admin panel
-- =====================================================

-- Allow public READ, INSERT, UPDATE, DELETE untuk menu-images
DROP POLICY IF EXISTS "Public access menu-images" ON storage.objects;
CREATE POLICY "Public access menu-images"
ON storage.objects FOR ALL
USING (bucket_id = 'menu-images')
WITH CHECK (bucket_id = 'menu-images');

-- Allow public READ, INSERT, UPDATE, DELETE untuk portfolio-images
DROP POLICY IF EXISTS "Public access portfolio-images" ON storage.objects;
CREATE POLICY "Public access portfolio-images"
ON storage.objects FOR ALL
USING (bucket_id = 'portfolio-images')
WITH CHECK (bucket_id = 'portfolio-images');

-- Verifikasi
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;
