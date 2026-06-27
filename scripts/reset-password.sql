-- =====================================================
-- Reset password admin user via SQL
-- =====================================================

-- 1. Cek user yang ada
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- 2. Reset password untuk SEMUA user (aman untuk development)
UPDATE auth.users
SET encrypted_password = crypt('Admin123', gen_salt('bf')),
    email_confirmed_at = NOW()
WHERE email IN (
  SELECT email FROM auth.users
  WHERE email LIKE '%tokositra%' OR email LIKE '%tokosetra%' OR email LIKE '%admin%'
);

-- 3. Verifikasi
SELECT id, email, email_confirmed_at IS NOT NULL AS confirmed
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;
