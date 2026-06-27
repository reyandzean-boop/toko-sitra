// Seed portfolio items + verifikasi semua
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
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

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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
    gallery_urls: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
    ],
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
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ],
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
    gallery_urls: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 4,
  },
];

(async () => {
  console.log('\n=== Seed Portfolio + Verifikasi ===\n');

  // 1. Cek portfolio_items
  const { count: existing, error: cErr } = await sb
    .from('portfolio_items')
    .select('*', { count: 'exact', head: true });

  if (cErr) {
    console.log('❌ Error cek portfolio:', cErr.message);
    process.exit(1);
  }

  console.log('Portfolio saat ini:', existing || 0, 'baris');

  if (existing && existing > 0) {
    console.log('⏭️  Skip insert (sudah ada data)');
  } else {
    const { data, error } = await sb.from('portfolio_items').insert(samplePortfolio).select();
    if (error) {
      console.log('❌ Insert gagal:', error.message);
      process.exit(1);
    }
    console.log('✅ Berhasil insert', data.length, 'portfolio items');
  }

  // 2. Cek storage buckets
  console.log('\n=== Storage Buckets ===');
  const { data: buckets, error: bErr } = await sb.storage.listBuckets();
  if (bErr) {
    console.log('❌ Storage error:', bErr.message);
  } else {
    if (buckets.length === 0) {
      console.log('⚠️  Belum ada bucket. Coba jalankan ulang SQL Plan B.');
    }
    buckets.forEach(b => {
      const ok = b.public ? '✓ public' : '✗ private';
      console.log(' ', ok, '|', b.name);
    });
  }

  // 3. Final summary
  console.log('\n=== Final Summary ===');
  for (const table of ['menu_items', 'portfolio_items', 'contact_messages', 'testimonials']) {
    const { count } = await sb.from(table).select('*', { count: 'exact', head: true });
    console.log('  ' + table + ': ' + (count === null ? '?' : count) + ' baris');
  }

  console.log('\n🎉 Setup selesai!\n');
  console.log('Next steps:');
  console.log('  1. Buka Authentication > Users > Add user');
  console.log('     Email: admin@tokositra.id (atau sesuai keinginan)');
  console.log('     Password: minimal 6 karakter');
  console.log('     Auto Confirm User: ✅');
  console.log('  2. Login di http://localhost:3000/admin/login\n');

  process.exit(0);
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
