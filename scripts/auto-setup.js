// =====================================================
// Toko Sitra — Auto Setup via service_role
// Jalankan SETELAH schema.sql sudah dieksekusi di SQL Editor
//
// Yang dilakukan:
//   1. Insert sample data (menu, portfolio, testimonials)
//   2. Create storage buckets (menu-images, portfolio-images)
//   3. Create admin user (Authentication)
//   4. Verifikasi semua
// =====================================================
//
// CARA PAKAI:
//   node scripts/auto-setup.js
//
// Service role key diambil dari .env.local
// =====================================================

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ----- Load env -----
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local tidak ditemukan');
  process.exit(1);
}

const env = {};
fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const idx = line.indexOf('=');
  if (idx === -1) return;
  const key = line.slice(0, idx).trim();
  let val = line.slice(idx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  env[key] = val;
});

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ----- Service role key -----
// Sumber (urutan prioritas):
//   1. Argumen CLI: node auto-setup.js <key>
//   2. Env var SERVICE_ROLE_KEY
//   3. .env.local (field SUPABASE_SERVICE_ROLE_KEY)
const SERVICE_KEY = process.argv[2] || process.env.SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY || SERVICE_KEY.includes('placeholder')) {
  console.log('\n❌ SERVICE_ROLE_KEY belum di-set!\n');
  console.log('Cara menjalankan:\n');
  console.log('  Windows CMD:');
  console.log('    set SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...');
  console.log('    node scripts/auto-setup.js\n');
  console.log('  Windows PowerShell:');
  console.log('    $env:SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."');
  console.log('    node scripts/auto-setup.js\n');
  console.log('  Git Bash:');
  console.log('    SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs... node scripts/auto-setup.js\n');
  process.exit(1);
}

if (!URL || !ANON) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL atau ANON_KEY kosong di .env.local');
  process.exit(1);
}

// Service role client — bypass RLS, akses penuh
const admin = createClient(URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// =====================================================
// Sample data
// =====================================================
const sampleMenu = [
  {
    name: 'Es Kopi Susu Gula Aren',
    description: 'Espresso double shot dengan susu segar dan gula aren cair khas Nusantara.',
    price: 25000,
    category: 'Kopi',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    is_featured: true,
  },
  {
    name: 'Matcha Latte',
    description: 'Matcha premium impor dari Uji, dicampur susu steamed dan sedikit madu.',
    price: 28000,
    category: 'Non-Kopi',
    image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80',
    is_featured: true,
  },
  {
    name: 'Croissant Butter',
    description: 'Croissant renyah berlapis dengan butter Perancis, dipanggang fresh tiap pagi.',
    price: 18000,
    category: 'Makanan',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    is_featured: true,
  },
  {
    name: 'V60 Pour Over',
    description: 'Single origin Ethiopia dengan notes blueberry, diproses secara manual.',
    price: 32000,
    category: 'Kopi',
    image_url: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&q=80',
    is_featured: false,
  },
  {
    name: 'Coklat Panas Klasik',
    description: 'Dark chocolate 70% dari Belgia, diseduh dengan susu hangat.',
    price: 26000,
    category: 'Non-Kopi',
    image_url: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&q=80',
    is_featured: false,
  },
  {
    name: 'Pisang Goreng Madu',
    description: 'Pisang goreng crispy dengan madu murni dan keju cheddar parut.',
    price: 15000,
    category: 'Snack',
    image_url: 'https://images.unsplash.com/photo-1606101205631-a579ec1d6330?w=800&q=80',
    is_featured: false,
  },
];

const samplePortfolio = [
  {
    title: 'Rebranding Warung Makan Bu Siti',
    slug: 'rebranding-warung-makan-bu-siti',
    description:
      'Proyek rebranding menyeluruh untuk warung makan legendaris Bu Siti yang telah berdiri sejak 1985. Kami melakukan riset mendalam terhadap pelanggan setia, lalu merancang ulang logo, menu, dan pengalaman visual di kedai. Hasilnya: peningkatan omzet 45% dalam 6 bulan pertama.',
    short_description:
      'Rebranding menyeluruh warung makan legendaris, dari logo hingga pengalaman visual.',
    category: 'Branding',
    client_name: 'Warung Makan Bu Siti',
    year: 2024,
    thumbnail_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 1,
  },
  {
    title: 'Kampanye Sosial Media — Kopi Lokal',
    slug: 'kampanye-sosial-media-kopi-lokal',
    description:
      'Kampanye 3 bulan untuk mengangkat brand kopi lokal di kalangan anak muda urban. 120+ konten, 4 platform, follower naik dari 2K ke 35K.',
    short_description:
      'Kampanye 3 bulan: 120+ konten, follower naik dari 2K ke 35K.',
    category: 'Social Media',
    client_name: 'Roastery Nusantara',
    year: 2024,
    thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    gallery_urls: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80'],
    is_featured: true,
    sort_order: 2,
  },
  {
    title: 'Iklan Digital Meta & Google Ads',
    slug: 'iklan-digital-meta-google-ads',
    description:
      'Setup dan optimasi iklan berbayar di Meta (FB + IG) dan Google Ads untuk bisnis fashion lokal. Budget Rp 50 juta/bulan dengan ROAS rata-rata 4.8x.',
    short_description: 'Optimasi Meta & Google Ads dengan ROAS 4.8x.',
    category: 'Iklan Digital',
    client_name: 'Local Fashion Brand',
    year: 2024,
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    gallery_urls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'],
    is_featured: true,
    sort_order: 3,
  },
  {
    title: 'Desain Kemasan Produk Skincare',
    slug: 'desain-kemasan-skincare',
    description:
      'Desain packaging untuk lini skincare lokal dengan target market Gen Z. Konsep minimalis dengan sentuhan warna earth-tone yang Instagrammable.',
    short_description: 'Packaging skincare Gen Z yang minimalis dan Instagrammable.',
    category: 'Desain',
    client_name: 'Glow Naturals',
    year: 2023,
    thumbnail_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    gallery_urls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80'],
    is_featured: true,
    sort_order: 4,
  },
];

const sampleTestimonials = [
  {
    name: 'Andini Putri',
    role: 'Pelanggan Setia',
    content: 'Kopi di sini selalu jadi mood booster pagi saya. Suasana kedainya bikin betah lama-lama, apalagi sambil kerja.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    is_active: true,
  },
  {
    name: 'Budi Santoso',
    role: 'CEO Startup ABC',
    content: 'Tim Toko Sitra bantu rebranding startup kami dengan hasil yang luar biasa. Prosesnya komunikatif dan hasilnya tepat waktu!',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    is_active: true,
  },
  {
    name: 'Sinta Maharani',
    role: 'Owner Warung Bu Siti',
    content: 'Sejak di-rebranding oleh Toko Sitra, warung saya jadi rame pelanggan baru. Omzet naik 45% — beyond expectation!',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    is_active: true,
  },
  {
    name: 'Rian Pratama',
    role: 'Mahasiswa',
    content: 'Tempatnya cozy banget buat nugas. WiFi kencang, kopi enak, harga mahasiswa. Selalu jadi pilihan utama!',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    is_active: true,
  },
];

// =====================================================
// Main
// =====================================================
async function main() {
  console.log('\n=== TOKO SITRA — AUTO SETUP via service_role ===\n');
  console.log('Project:', URL);
  console.log('');

  // 1. Cek apakah tabel sudah ada
  console.log('1️⃣  Cek tabel...');
  const { error: menuErr } = await admin.from('menu_items').select('id').limit(1);
  if (menuErr) {
    console.log('   ❌ Tabel menu_items tidak ada.');
    console.log('   → Buka Supabase SQL Editor, paste isi file supabase/schema.sql, klik Run.');
    console.log('   → Lalu jalankan script ini lagi.\n');
    process.exit(1);
  }
  console.log('   ✅ Tabel siap');

  // 2. Insert sample data
  console.log('\n2️⃣  Insert sample data...');
  for (const [name, rows] of [
    ['menu_items', sampleMenu],
    ['portfolio_items', samplePortfolio],
    ['testimonials', sampleTestimonials],
  ]) {
    // Cek existing
    const { count: existing } = await admin.from(name).select('*', { count: 'exact', head: true });
    if (existing && existing > 0) {
      console.log(`   ⏭️  ${name}: skip (sudah ada ${existing} baris)`);
      continue;
    }
    const { error } = await admin.from(name).insert(rows);
    if (error) {
      console.log(`   ❌ ${name}: ${error.message}`);
    } else {
      console.log(`   ✅ ${name}: ${rows.length} baris ditambahkan`);
    }
  }

  // 3. Create storage buckets
  console.log('\n3️⃣  Storage buckets...');
  const { data: existingBuckets } = await admin.storage.listBuckets();
  const haveMenu = existingBuckets?.some(b => b.name === 'menu-images');
  const havePortfolio = existingBuckets?.some(b => b.name === 'portfolio-images');

  if (!haveMenu) {
    const { error } = await admin.storage.createBucket('menu-images', { public: true });
    console.log(error ? `   ❌ menu-images: ${error.message}` : '   ✅ menu-images dibuat (public)');
  } else {
    console.log('   ⏭️  menu-images sudah ada');
  }

  if (!havePortfolio) {
    const { error } = await admin.storage.createBucket('portfolio-images', { public: true });
    console.log(error ? `   ❌ portfolio-images: ${error.message}` : '   ✅ portfolio-images dibuat (public)');
  } else {
    console.log('   ⏭️  portfolio-images sudah ada');
  }

  // 4. Verifikasi final
  console.log('\n4️⃣  Verifikasi...');
  for (const table of ['menu_items', 'portfolio_items', 'testimonials']) {
    const { count } = await admin.from(table).select('*', { count: 'exact', head: true });
    console.log(`   ${table}: ${count || 0} baris`);
  }

  console.log('\n🎉 Auto-setup selesai!');
  console.log('\n📝 Langkah terakhir:');
  console.log('   1. Buka Authentication > Users > Add user > Create new user');
  console.log('      Email: admin@tokositra.id (atau sesuai keinginan)');
  console.log('      Password: minimal 6 karakter');
  console.log('      Auto Confirm User: ✅');
  console.log('   2. Login di http://localhost:3000/admin/login\n');
  console.log('⚠️  PENTING: Jangan commit service_role key ke Git!\n');

  process.exit(0);
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
