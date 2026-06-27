# Changelog

Semua perubahan penting pada project Toko Sitra didokumentasikan di sini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### ✨ Added
- **Hero Images Management** (`/admin/hero-images`)
  - Tabel baru `hero_images` di Supabase (section, image_url, alt_text)
  - Admin page untuk kelola 3 hero images: `home_hero`, `home_about`, `home_cta`
  - Upload foto baru ATAU paste URL langsung
  - Auto-fallback ke default Unsplash jika tabel kosong
  - Migration SQL: `scripts/add-hero-images.sql`
- **Custom Domain Ready** (perlu setup manual di Vercel + Niagahoster/Domainesia)

---

## [1.2.0] — 2026-06-27

### ✨ Added
- **Admin CRUD System Lengkap**
  - `MenuForm` — Tambah/edit menu dengan image upload
  - `PortfolioForm` — Tambah/edit portfolio dengan multi-image gallery (max 5 foto)
  - `TestimonialForm` — Tambah/edit testimoni dengan rating interaktif (1-5 bintang)
  - `Modal` component — Reusable modal dengan backdrop & ESC handler
  - `ImageUpload` component — Single image upload dengan preview
  - `MultiImageUpload` component — Multi image upload
  - CRUD functions di `lib/data.ts`:
    - `adminCreateMenu`, `adminUpdateMenu`, `adminDeleteMenu`
    - `adminCreatePortfolio`, `adminUpdatePortfolio`, `adminDeletePortfolio`
    - `adminCreateTestimonial`, `adminUpdateTestimonial`, `adminDeleteTestimonial`
  - `uploadImage()` helper — Upload file ke Supabase Storage dengan nama unik
  - `deleteImageByUrl()` helper — Hapus file dari Storage
- Tombol "Tambah" diaktifkan di Menu, Portfolio, Testimoni
- Tombol "Edit" (pensil) di setiap baris card/table
- Validasi form (nama wajib, harga > 0, dst)
- Auto-generate slug dari title untuk portfolio
- Auto-refresh data setelah save
- Slug preview real-time di PortfolioForm
- Indikator loading saat upload/save

### 🔧 Changed
- `app/admin/menu/page.tsx` — Wire up CRUD modal
- `app/admin/portfolio/page.tsx` — Wire up CRUD modal + multi-image
- `app/admin/testimonials/page.tsx` — Wire up CRUD modal + rating
- Toggle handlers di-update untuk support mock mode (langsung update state tanpa reload)

---

## [1.1.0] — 2026-06-27

### ✨ Added
- **Pink Rose Cafe Color Theme**
  - Brand palette baru: Espresso `#3B1F0E` + Cream (pink muda) `#FEDDE2` + Pink `#F489B4`
  - `tailwind.config.ts` — Warna kustom `pink`, `pinkLight`, `pinkDark`, `cream`, `creamLight`
- **Storage Buckets di Supabase**
  - Bucket `menu-images` (Public) untuk foto menu
  - Bucket `portfolio-images` (Public) untuk foto portfolio & testimoni avatar
- **RLS Policies Storage**
  - Public read, insert, update, delete di kedua bucket
  - File: `scripts/allow-storage.sql`
- **Verifikasi Setup**
  - `scripts/setup-check.js` — Cek env & koneksi
  - `scripts/check-data.js` — Cek jumlah data
  - `scripts/check-tables.js` — Cek tabel & buckets
  - `scripts/test-upload.js` — Test upload end-to-end
  - `scripts/test-crud.js` — Test CRUD end-to-end

### 🔧 Changed
- **Header (Navbar)** — `bg-espresso` → `bg-white/95` dengan pink accent
  - Logo: `text-cream` (transparent) / `text-espresso` (scrolled)
  - Active link: `text-pink` → `text-pinkDark`
  - Hover: `hover:text-pinkDark`
- **Footer** — `bg-espresso` → `bg-pinkDark` (dark rose)
  - Headings: `text-pink` → `text-cream`
  - Social icons: `bg-cream/10` → `bg-white/15`
- **btn-primary** (globals.css) — `bg-espresso` → `bg-pinkDark`
- **Home — Layanan Section** — `bg-espresso` → `bg-pinkDark`
- **Home — Service Cards** — `bg-espressoDark` → `bg-white/10`
- **Home — CTA Overlay** — `bg-espresso/85` → `bg-pinkDark/85`
- **Page Heroes** (Menu, Portfolio, About, Contact) — `bg-espresso` → `bg-pinkDark`
- **Portfolio Detail Aside** — `bg-espressoDark` → `bg-white/15 backdrop-blur`
- **Navbar** — Hide otomatis di `/admin/*` routes
- **Footer** — Hide otomatis di `/admin/*` routes (converted to 'use client')
- **Admin Layout** — `pt-20` → `pt-4` (no navbar padding needed)

### 🗑️ Removed
- Tagline "Where Coffee Meets Creativity" — diganti dengan fokus "Specialty Coffee"
- Tagline "Creative Agency" dari tagline utama (tetap di konten deskripsi layanan)

---

## [1.0.0] — 2026-06-27

### ✨ Initial Build

#### Frontend (Next.js 14 App Router)
- **Halaman Publik** (sesuai PRD):
  - `/` — Home dengan 8 section (Hero, About, Featured Menu, Layanan, Portfolio Preview, Testimoni, CTA)
  - `/menu` — Menu kopi dengan filter kategori
  - `/portfolio` — Grid portfolio dengan filter kategori
  - `/portfolio/[slug]` — Detail portfolio dengan galeri
  - `/about` — Cerita brand + tim + nilai
  - `/contact` — Form kontak + info kontak
- **Halaman Admin**:
  - `/admin/login` — Login dengan Supabase Auth
  - `/admin` — Dashboard
  - `/admin/portfolio` — List + toggle featured + delete
  - `/admin/menu` — List + toggle featured + toggle available + delete
  - `/admin/messages` — List pesan masuk dengan detail panel
  - `/admin/testimonials` — Card view + toggle aktif + delete

#### Komponen (7 components)
- `Navbar` — Fixed, transparent di home top, solid saat scroll
- `Footer` — Brand, navigasi, jam operasional, kontak, social
- `MenuCard` — Kartu menu dengan foto, harga, kategori
- `PortfolioCard` — Kartu portfolio dengan thumbnail, kategori, hover effect
- `TestimonialSlider` — Carousel auto-rotate 6 detik
- `ContactForm` — Form dengan validasi
- `AdminSidebar` — Sidebar admin dengan navigasi

#### Data Layer
- `lib/supabase.ts` — Supabase client dengan `isSupabaseConfigured` flag
- `lib/data.ts` — Data access functions (read, admin get, contact submit)
- `lib/types.ts` — TypeScript types (MenuItem, PortfolioItem, Testimonial, ContactMessage)
- `lib/mock-data.ts` — Sample data untuk fallback mode
- `lib/utils.ts` — formatRupiah, slugify, formatDateID

#### Database (Supabase)
- **Schema** (`supabase/schema.sql`):
  - Tabel `menu_items` (8 sample items)
  - Tabel `portfolio_items` (6 sample items)
  - Tabel `contact_messages`
  - Tabel `testimonials` (4 sample items)
- **Row Level Security (RLS)**:
  - Publik bisa baca `menu_items`, `portfolio_items`, `testimonials`
  - Publik bisa INSERT `contact_messages` (tidak bisa baca)
  - Admin (authenticated) akses penuh semua tabel
- **Indexes** untuk performa query

#### Styling
- **Tailwind CSS** dengan brand palette custom
- **Pink Rose Cafe Theme** (final):
  - Espresso `#3B1F0E` + Cream `#FEDDE2` + Pink `#F489B4`
  - Custom utility classes: `btn-primary`, `btn-pink`, `btn-outline`, dll
- **Fonts**: Playfair Display (display) + Inter (body) via Google Fonts

#### Environment & Config
- `.env.local` (gitignored) — Supabase URL + anon key + WA/IG/email/address
- `.env.local.example` — Template
- `next.config.js` — Image remote patterns untuk Unsplash & Supabase
- `tailwind.config.ts` — Brand colors + custom animations
- `tsconfig.json` — Strict TypeScript

#### Project Files
- `package.json` — Next.js, React, Supabase, React Icons
- `.gitignore` — Standard Next.js + .env.local
- `README.md` — Setup & deployment guide
- `SETUP-SUPABASE.md` — Step-by-step Supabase setup guide

#### Initial Visual Identity
- Tagline: "Where Coffee Meets Creativity"
- Hero h1: "Where Coffee / Meets Creativity" (2 baris)
- Browser title: "Toko Sitra — Where Coffee Meets Creativity"
- Footer description dengan tagline
- README header dengan tagline

---

## Refleksi Singkat

Project ini dimulai dari PRD lengkap dengan brief dari owner (Mas Bedjo). Development dilakukan secara iteratif dengan bantuan AI assistant (VSCode):

1. **Phase 1**: Build lengkap semua halaman publik + admin dengan mock data
2. **Phase 2**: Setup Supabase (project baru, schema SQL, RLS, storage, admin user)
3. **Phase 3**: Customization (pink theme, navbar/footer update, admin tanpa navbar)
4. **Phase 4**: CRUD system lengkap dengan upload (modal + forms + image upload)
5. **Phase 5**: Hero images management
6. **Phase 6**: Tagline simplification (focus ke "Specialty Coffee")
7. **Phase 7**: Documentation & deployment

Total ~50+ file TypeScript/CSS/SQL, 4 tabel database, 2 storage buckets, full CRUD admin panel.

---

## Kontributor

- **Mas Bedjo (Owner)** — Brief, requirements, design decisions
- **AI Assistant** — Implementation, debugging, deployment guide
