# 🔌 Setup Supabase untuk Toko Sitra

Panduan ini akan menghubungkan website Toko Sitra dengan database Supabase.

> **Total waktu:** ~5-7 menit
> **Yang Anda butuhkan:** Akun Google atau GitHub (untuk daftar Supabase)

---

## STEP 1 — Buat Akun & Project Supabase (2 menit)

1. Buka **https://supabase.com**
2. Klik **"Start your project"** → login dengan akun Google/GitHub
3. Klik **"New Project"**
4. Isi form:
   - **Name:** `toko-sitra`
   - **Database Password:** Buat password kuat → **SIMPAN di password manager!** (Anda butuh ini lagi)
   - **Region:** Singapore (Southeast Asia)
5. Klik **"Create new project"**
6. ⏳ Tunggu ~2 menit sampai status "Active"

---

## STEP 2 — Jalankan Schema SQL (1 menit)

1. Di sidebar kiri, klik **"SQL Editor"**
2. Klik **"New query"** (tombol hijau +)
3. **Copy-paste SEMUA isi** file `supabase/schema.sql` dari project ini
4. Klik **"Run"** (atau tekan Ctrl+Enter)
5. ✅ Akan muncul: "Success. No rows returned"

**Verifikasi:** Klik menu **"Table Editor"** di sidebar → akan muncul 4 tabel:
- `menu_items`
- `portfolio_items`
- `contact_messages`
- `testimonials`

---

## STEP 3 — Buat Storage Buckets (1 menit)

1. Klik **"Storage"** di sidebar
2. Klik **"New bucket"**
   - Name: `menu-images`
   - ✅ Centang **"Public bucket"**
   - Klik Save
3. Ulangi untuk bucket kedua:
   - Name: `portfolio-images`
   - ✅ Centang **"Public bucket"**
   - Klik Save

---

## STEP 4 — Buat Admin User (1 menit)

1. Klik **"Authentication"** → **"Users"** di sidebar
2. Klik **"Add user"** → **"Create new user"**
3. Isi:
   - **Email:** admin@tokositra.id (atau email pilihan Anda)
   - **Password:** minimal 6 karakter
   - ✅ Centang **"Auto Confirm User"**
4. Klik **"Create user"**

> Email & password ini yang akan dipakai untuk login di `/admin/login`

---

## STEP 5 — Dapatkan API Keys (30 detik)

1. Klik ⚙️ **"Project Settings"** (ikon gerigi di sidebar bawah)
2. Klik **"API"** di sub-menu
3. Anda akan melihat 2 nilai yang dibutuhkan:

| Field | Dimulai dengan | Contoh |
|---|---|---|
| **Project URL** | `https://` | `https://abcdefgh.supabase.co` |
| **anon public** key | `eyJ` | `eyJhbGciOiJIUzI1NiIs...` |

4. Copy kedua nilai ini.

---

## STEP 6 — Update `.env.local` di Project

Buka file `d:/Qonex/toko-sitra/.env.local` di VS Code, ganti 2 baris ini:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co    ← paste Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...   ← paste anon key
```

Simpan file (Ctrl+S).

---

## STEP 7 — Verifikasi Koneksi

Buka terminal di folder project, jalankan:

```bash
node scripts/setup-check.js
```

Jika sukses, Anda akan melihat:

```
✅ NEXT_PUBLIC_SUPABASE_URL: https://abcdefgh.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIs...
🔄 Testing koneksi ke Supabase...
✅ Koneksi ke Supabase BERHASIL
✅ Tabel menu_items terdeteksi

🎉 Setup selesai!
```

---

## STEP 8 — Restart Dev Server

```bash
# Stop server lama (Ctrl+C di terminal)
npm run dev
```

Banner kuning "Mode Demo" di atas website akan hilang, dan website sekarang pakai data asli dari Supabase.

---

## 🧪 Test End-to-End

1. Buka **http://localhost:3000**
2. Banner "Mode Demo" tidak muncul lagi ✅
3. Buka **http://localhost:3000/admin/login**
4. Login dengan email & password admin dari Step 4
5. Coba buka menu **Portfolio** atau **Menu** di sidebar
6. Coba **tambah/hapus/edit** data — perubahan akan langsung tersimpan ke Supabase
7. Coba **form kontak** di `/contact` → cek di `/admin/messages`

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| "Invalid API key" | Periksa anon key, pastikan yang dicopy adalah `anon public` (bukan `service_role`) |
| "relation does not exist" | Schema SQL belum dijalankan. Ulangi Step 2 |
| "new row violates row-level security" | Anda belum login sebagai admin, atau policy RLS perlu dicek |
| Koneksi timeout | Periksa Project URL, pastikan region Singapore dan project status Active |

---

## 🔐 Catatan Keamanan PENTING

1. **JANGAN PERNAH** upload `.env.local` ke GitHub (sudah ada di `.gitignore`)
2. **Password database** Supabase ≠ password admin user. Yang dipakai untuk login admin adalah password yang Anda buat di Step 4.
3. Untuk produksi, pertimbangkan pakai `@supabase/ssr` untuk session management yang lebih aman.
