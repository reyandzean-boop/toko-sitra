// =====================================================
// Supabase Setup Verification Script
// Jalankan: node scripts/setup-check.js
// =====================================================

const fs = require('fs');
const path = require('path');

// Load .env.local manually (tanpa dotenv)
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    return { error: 'File .env.local tidak ditemukan' };
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const idx = line.indexOf('=');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[key] = val;
  });
  return env;
}

function check() {
  console.log('\n=== TOKO SITRA — SUPABASE SETUP CHECK ===\n');

  const env = loadEnv();
  if (env.error) {
    console.log('❌', env.error);
    console.log('   Buat file .env.local di root project dengan isi dari .env.local.example\n');
    process.exit(1);
  }

  const checks = [
    {
      name: 'NEXT_PUBLIC_SUPABASE_URL',
      value: env.NEXT_PUBLIC_SUPABASE_URL,
      placeholder: 'https://placeholder.supabase.co',
      validPrefix: 'https://',
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      value: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      placeholder: 'placeholder-anon-key',
      validPrefix: 'eyJ',
    },
  ];

  let allOk = true;
  let hasPlaceholder = false;

  checks.forEach(c => {
    const isPlaceholder = !c.value || c.value === c.placeholder || c.value.includes('placeholder');
    const isValidShape = c.value && c.value.startsWith(c.validPrefix);

    if (isPlaceholder) {
      console.log('⏳ ' + c.name + ': masih PLACEHOLDER');
      hasPlaceholder = true;
      allOk = false;
    } else if (!isValidShape) {
      console.log('❌ ' + c.name + ': format tidak valid');
      console.log('   Diharapkan mulai dengan: ' + c.validPrefix);
      allOk = false;
    } else {
      // Mask sebagian untuk display
      const masked = c.value.length > 30
        ? c.value.slice(0, 25) + '...' + c.value.slice(-8)
        : c.value;
      console.log('✅ ' + c.name + ': ' + masked);
    }
  });

  console.log('');

  if (hasPlaceholder) {
    console.log('📋 LANGKAH SELANJUTNYA:\n');
    console.log('1. Buka https://supabase.com/dashboard');
    console.log('2. Klik "New Project"');
    console.log('   - Name: toko-sitra');
    console.log('   - Database Password: (simpan di password manager!)');
    console.log('   - Region: Singapore (Southeast Asia)');
    console.log('3. Tunggu ~2 menit sampai project ready');
    console.log('4. Klik SQL Editor → New Query');
    console.log('5. Copy-paste isi file: supabase/schema.sql');
    console.log('6. Klik Run');
    console.log('7. Buka Storage → New Bucket:');
    console.log('   - menu-images (Public bucket) ✓');
    console.log('   - portfolio-images (Public bucket) ✓');
    console.log('8. Buka Settings → API, copy:');
    console.log('   - Project URL → paste ke NEXT_PUBLIC_SUPABASE_URL');
    console.log('   - anon public key → paste ke NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.log('9. Edit .env.local, lalu jalankan script ini lagi\n');
    process.exit(0);
  }

  if (!allOk) {
    console.log('❌ Beberapa konfigurasi belum valid. Perbaiki .env.local dulu.\n');
    process.exit(1);
  }

  // Test koneksi ke Supabase
  console.log('🔄 Testing koneksi ke Supabase...');
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  (async () => {
    try {
      const { data, error } = await supabase.from('menu_items').select('count', { count: 'exact', head: true });
      if (error) {
        if (error.message.includes('relation "menu_items" does not exist')) {
          console.log('❌ Koneksi OK, tapi tabel belum ada.');
          console.log('   Jalankan schema.sql di Supabase SQL Editor dulu.\n');
        } else if (error.message.includes('Invalid API key')) {
          console.log('❌ API key tidak valid. Periksa anon key di Settings → API.\n');
        } else {
          console.log('❌ Error:', error.message);
        }
        process.exit(1);
      }
      console.log('✅ Koneksi ke Supabase BERHASIL');
      console.log('✅ Tabel menu_items terdeteksi');
      console.log('\n🎉 Setup selesai! Website siap pakai dengan database asli.');
      console.log('   Jalankan: npm run dev → buka http://localhost:3000\n');
      process.exit(0);
    } catch (e) {
      console.log('❌ Tidak bisa terhubung:', e.message);
      console.log('   Periksa koneksi internet dan konfigurasi .env.local\n');
      process.exit(1);
    }
  })();
}

check();
