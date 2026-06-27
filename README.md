# Toko Sitra — Specialty Coffee

> Coffee Shop & Advertising Agency Website

Website resmi Toko Sitra — sebuah **specialty coffee shop** sekaligus **creative agency** yang melayani kebutuhan branding, social media, dan iklan digital untuk brand lokal Indonesia.

---

## 🎨 Tech Stack

| Komponen | Teknologi |
|---|---|
| Framework | Next.js 14 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS (custom brand palette) |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Image Storage | Supabase Storage (`menu-images`, `portfolio-images`) |
| Icons | React Icons (Heroicons, FontAwesome) |
| Font | Playfair Display (display) + Inter (body) |
| Deploy | Vercel |

---

## 🎨 Brand Palette (Pink Rose Cafe Theme)

| Nama | Hex | Penggunaan |
|---|---|---|
| Espresso | `#3B1F0E` | Primary — heading, navbar text, tombol |
| Cream (pink muda) | `#FEDDE2` | Background utama website |
| Ink | `#111111` | Body text |
| Pink | `#F489B4` | Aksen, link aktif, badge |
| Pink Light | `#FBC1D4` | Hover halus |
| Pink Dark | `#D6709A` | Hover button, footer bg, section gelap |
| Espresso Dark | `#1F0F06` | Hover button primary |

---

## ✨ Fitur Website

### Halaman Publik

| Path | Fitur |
|---|---|
| `/` | **Home** — Hero (full-screen), About snippet, Featured Menu (3 dari DB), Layanan Advertising, Portfolio Preview, Testimoni (slider), CTA |
| `/menu` | **Menu** — List menu dengan filter kategori (Semua, Kopi, Non-Kopi, Makanan, Snack) |
| `/portfolio` | **Portfolio** — Grid dengan filter kategori (Semua, Branding, Social Media, Iklan Digital, Desain) |
| `/portfolio/[slug]` | **Detail Portfolio** — Hero, deskripsi lengkap, galeri foto (1-5 foto) |
| `/about` | **Tentang Kami** — Cerita brand, tim, nilai-nilai |
| `/contact` | **Kontak** — Form kontak + info kontak langsung |

### Admin Panel (`/admin`)

| Path | Fitur |
|---|---|
| `/admin/login` | Login dengan Supabase Auth |
| `/admin` | Dashboard — statistik data + recent items |
| `/admin/hero-images` | **Kelola 3 hero images** di homepage (Hero, About, CTA) — upload + URL paste |
| `/admin/menu` | **CRUD Menu** — Tambah, Edit, Hapus, Toggle Featured, Toggle Available |
| `/admin/portfolio` | **CRUD Portfolio** — Tambah, Edit, Hapus, Toggle Featured, Multi-image gallery (max 5) |
| `/admin/messages` | **Pesan Masuk** — Lihat detail, Toggle Read, Balas via Email/WA, Hapus |
| `/admin/testimonials` | **CRUD Testimoni** — Tambah, Edit, Hapus, Toggle Aktif, Rating interaktif, Avatar |

### Fitur Unggulan

- 🎨 **Hero Images Management** — Ganti foto hero section via admin (upload atau paste URL)
- 📤 **Image Upload** — Drag/click upload ke Supabase Storage dengan preview
- 🖼️ **Multi-Image Gallery** — Upload banyak foto sekaligus untuk portfolio
- ⭐ **Toggle Featured** — Pilih item mana yang tampil di homepage
- 🔄 **Hot Reload** — Perubahan langsung terlihat di website
- 📱 **Responsive** — Optimal di mobile, tablet, desktop
- 🌸 **Pink Rose Cafe Theme** — Color scheme kustom yang aesthetic
- 🔒 **Admin Auth** — Login via Supabase Auth
- 💾 **Auto Fallback ke Mock Data** — Website jalan walaupun Supabase belum dikonfigurasi

---

## 📁 Struktur Proyek

```
toko-sitra/
├── app/                                  # Next.js App Router
│   ├── page.tsx                          # Home (8 section)
│   ├── layout.tsx                        # Root layout (fonts, metadata)
│   ├── globals.css                       # CSS global + btn-primary/btn-pink
│   ├── not-found.tsx                     # 404 page
│   ├── menu/page.tsx                     # Halaman Menu
│   ├── portfolio/
│   │   ├── page.tsx                      # List Portfolio
│   │   └── [slug]/page.tsx               # Detail Portfolio
│   ├── about/page.tsx                    # Tentang Kami
│   ├── contact/page.tsx                  # Form Kontak
│   └── admin/
│       ├── layout.tsx                    # Admin layout (sidebar + auth guard)
│       ├── page.tsx                      # Dashboard
│       ├── login/page.tsx                # Login Admin
│       ├── hero-images/page.tsx          # Kelola Hero Images
│       ├── menu/page.tsx                # CRUD Menu
│       ├── portfolio/page.tsx            # CRUD Portfolio
│       ├── messages/page.tsx             # Pesan Masuk
│       └── testimonials/page.tsx         # CRUD Testimoni
├── components/
│   ├── Navbar.tsx                        # Hidden di /admin/*
│   ├── Footer.tsx                        # Hidden di /admin/*
│   ├── MenuCard.tsx
│   ├── PortfolioCard.tsx
│   ├── TestimonialSlider.tsx              # Carousel auto-rotate
│   ├── ContactForm.tsx
│   ├── AdminSidebar.tsx                  # Sidebar admin dengan nav
│   └── admin/                            # Komponen khusus admin
│       ├── Modal.tsx                     # Modal reusable
│       ├── ImageUpload.tsx               # Single image upload
│       ├── MultiImageUpload.tsx          # Multi image upload
│       ├── MenuForm.tsx                  # Form tambah/edit menu
│       ├── PortfolioForm.tsx             # Form tambah/edit portfolio
│       └── TestimonialForm.tsx           # Form tambah/edit testimoni
├── lib/
│   ├── supabase.ts                       # Supabase client
│   ├── data.ts                           # Data access + CRUD + upload
│   ├── types.ts                          # TypeScript types
│   ├── mock-data.ts                      # Sample data (fallback)
│   └── utils.ts                          # formatRupiah, slugify, dll
├── supabase/
│   └── schema.sql                        # Schema DB + RLS + sample data
├── scripts/                              # Utility scripts
│   ├── setup-check.js                    # Verifikasi env & koneksi
│   ├── check-data.js                     # Lihat jumlah data
│   ├── check-tables.js                   # Cek tabel & buckets
│   ├── auto-setup.js                     # Auto-seed via service_role
│   ├── seed-portfolio.js                 # Insert portfolio via anon
│   ├── create-buckets.js                 # Create storage buckets
│   ├── test-upload.js                    # Test upload
│   ├── test-crud.js                      # Test CRUD end-to-end
│   ├── verify-hero.js                    # Verifikasi hero_images
│   ├── allow-seed.sql                    # RLS policies (Plan B)
│   ├── allow-storage.sql                 # Storage RLS policies
│   ├── add-hero-images.sql               # Migration hero_images
│   └── reset-password.sql                # Reset password user
├── middleware.ts                         # (placeholder)
├── tailwind.config.ts                    # Brand palette + animations
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.local                           # Environment variables (RAHASIA!)
├── .env.local.example                   # Template env
├── .gitignore
├── README.md                            # ← Dokumentasi ini
├── CHANGELOG.md                         # ← History perubahan
└── SETUP-SUPABASE.md                    # ← Panduan setup Supabase
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi environment

Copy `.env.local.example` ke `.env.local` dan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Opsional
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_INSTAGRAM_HANDLE=@tokositra
NEXT_PUBLIC_EMAIL=hello@tokositra.id
NEXT_PUBLIC_ADDRESS="Jl. Kreativitas No. 1, Jakarta"
```

> **Tanpa env Supabase**, website otomatis pakai mock data dari `lib/mock-data.ts`.

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### 4. Build untuk production

```bash
npm run build
npm start
```

---

## 🗄️ Setup Supabase (Production)

Lihat **SETUP-SUPABASE.md** untuk panduan lengkap step-by-step.

Ringkasan:
1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan `supabase/schema.sql` di SQL Editor
3. Buat 2 storage bucket: `menu-images` & `portfolio-images` (Public)
4. Jalankan `scripts/allow-storage.sql` untuk storage policies
5. Buat admin user di Authentication → Users
6. Copy URL + anon key ke `.env.local`

### Verifikasi

```bash
node scripts/setup-check.js
```

---

## 🗄️ Database Schema

### Tabel: `menu_items`
| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| name | VARCHAR(100) | Nama menu |
| description | TEXT | Deskripsi (nullable) |
| price | INTEGER | Harga dalam Rupiah |
| category | VARCHAR(50) | 'Kopi' \| 'Non-Kopi' \| 'Makanan' \| 'Snack' |
| image_url | TEXT | URL foto (nullable) |
| is_featured | BOOLEAN | Tampil di homepage |
| is_available | BOOLEAN | Sold out toggle |
| created_at | TIMESTAMP | Auto |

### Tabel: `portfolio_items`
| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| title | VARCHAR(150) | Judul proyek |
| slug | VARCHAR(150) UNIQUE | URL slug |
| description | TEXT | Cerita proyek |
| short_description | VARCHAR(200) | Ringkasan untuk card |
| category | VARCHAR(50) | 'Branding' \| 'Social Media' \| 'Iklan Digital' \| 'Desain' |
| client_name | VARCHAR(100) | Nama klien (nullable) |
| year | INTEGER | Tahun pengerjaan |
| thumbnail_url | TEXT | Foto utama |
| gallery_urls | TEXT[] | Array URL foto (max 5) |
| is_featured | BOOLEAN | Tampil di homepage |
| sort_order | INTEGER | Urutan tampil |
| created_at | TIMESTAMP | Auto |

### Tabel: `contact_messages`
| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| full_name, email, whatsapp | VARCHAR | Kontak pengirim |
| purpose | VARCHAR(50) | 'menu' \| 'penawaran' \| 'kolaborasi' \| 'lainnya' |
| message | TEXT | Isi pesan |
| is_read | BOOLEAN | Status dibaca |
| created_at | TIMESTAMP | Auto |

### Tabel: `testimonials`
| Column | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| name | VARCHAR(100) | Nama pelanggan |
| role | VARCHAR(100) | Jabatan / status (nullable) |
| content | TEXT | Isi testimoni |
| rating | INTEGER (1-5) | Bintang |
| avatar_url | TEXT | Foto profil (nullable) |
| is_active | BOOLEAN | Tampil di homepage |
| created_at | TIMESTAMP | Auto |

### Tabel: `hero_images`
| Column | Type | Notes |
|---|---|---|
| section | VARCHAR(50) PK | 'home_hero' \| 'home_about' \| 'home_cta' |
| image_url | TEXT | URL foto |
| alt_text | VARCHAR(200) | SEO alt (nullable) |
| updated_at | TIMESTAMP | Auto |

---

## 🚀 Deploy ke Vercel

### Step 1: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit - Toko Sitra"
git branch -M main
git remote add origin https://github.com/USERNAME/toko-sitra.git
git push -u origin main
```

### Step 2: Import di Vercel

1. Buka [https://vercel.com](https://vercel.com) → **Add New Project**
2. Import repository `toko-sitra`
3. Di **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy**

URL gratis: `https://toko-sitra.vercel.app`

### Step 3: Custom Domain (Opsional)

1. Beli domain di Niagahoster/Domainesia (misal `tokositra.com`)
2. Di Vercel → Project → Settings → Domains → Add Domain
3. Ikuti instruksi DNS pointing

---

## 🎯 Cara Pakai Setelah Deploy

### Untuk Owner/Admin

1. Login ke `https://tokositra.com/admin/login` dengan email + password admin
2. Tambah/edit menu, portfolio, testimoni via UI
3. Ganti hero images via `/admin/hero-images`
4. Baca & balas pesan dari `/admin/messages`
5. Semua perubahan langsung kelihatan di website publik

### Untuk Developer

- Edit copy text → buka file di `app/[page]/page.tsx` atau `components/*.tsx`
- Ganti warna → edit `tailwind.config.ts` (bagian `colors`)
- Tambah tabel → update `supabase/schema.sql` + jalankan di dashboard
- Update tipe data → edit `lib/types.ts`

---

## 🔐 Catatan Keamanan

1. **JANGAN upload `.env.local`** ke GitHub (sudah di `.gitignore`)
2. **Service role key** jangan pernah dipakai di frontend
3. **RLS Policies** sudah aktif di Supabase (publik hanya bisa baca + insert contact_messages)
4. Untuk produksi, pertimbangkan `@supabase/ssr` untuk session management
5. Backup database berkala via Supabase Dashboard

---

## 📊 Fitur Masa Depan (Backlog)

| Prioritas | Fitur |
|---|---|
| P1 | WhatsApp Chat Widget mengambang |
| P1 | SEO meta tags per halaman |
| P1 | Sitemap.xml & robots.txt |
| P2 | Instagram feed integration |
| P2 | Framer Motion animations |
| P3 | Blog / Artikel |
| P3 | Analytics (Google Analytics / Vercel) |
| P3 | Multi-bahasa (i18n) |

---

## 🛠️ Scripts Penting

```bash
# Verifikasi environment & koneksi Supabase
node scripts/setup-check.js

# Cek jumlah data di setiap tabel
node scripts/check-data.js

# Cek keberadaan tabel & buckets
node scripts/check-tables.js

# Test upload ke storage
node scripts/test-upload.js

# Test CRUD end-to-end
node scripts/test-crud.js

# Insert sample portfolio (Plan B jika service_role tidak working)
node scripts/seed-portfolio.js
```

Lihat masing-masing file SQL di `scripts/` untuk migration manual via SQL Editor.

---

## 📚 Dokumentasi Lainnya

- **[SETUP-SUPABASE.md](./SETUP-SUPABASE.md)** — Panduan lengkap setup Supabase
- **[CHANGELOG.md](./CHANGELOG.md)** — History semua perubahan
- **[supabase/schema.sql](./supabase/schema.sql)** — Database schema lengkap

---

## 📜 Lisensi

© 2026 Toko Sitra. All rights reserved.
Built with ❤️ using Next.js + Supabase.
