// Comprehensive table check (no dotenv dependency)
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local manually
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
const tables = ['menu_items', 'portfolio_items', 'contact_messages', 'testimonials'];

(async () => {
  console.log('\n=== Cek semua tabel ===\n');
  for (const table of tables) {
    const { error, count } = await sb
      .from(table)
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.log('❌', table, ':', error.message);
    } else {
      console.log('✅', table, ': ada (' + count + ' baris)');
    }
  }

  console.log('\n=== Cek storage buckets ===\n');
  const { data: buckets, error: be } = await sb.storage.listBuckets();
  if (be) {
    console.log('❌ Storage error:', be.message);
  } else {
    if (buckets.length === 0) {
      console.log('⚠️  Belum ada bucket. Buat menu-images dan portfolio-images di dashboard.');
    }
    buckets.forEach(b => {
      const ok = b.public ? '✓ public ' : '✗ private';
      console.log('  ' + ok + ' | ' + b.name);
    });
  }

  console.log('\n=== Sample data ===\n');
  const { data: menu } = await sb.from('menu_items').select('name, price, category').limit(3);
  if (menu && menu.length > 0) {
    console.log('Menu items:');
    menu.forEach(m => console.log('  -', m.name, '|', m.category, '| Rp', m.price.toLocaleString('id-ID')));
  }
  const { data: testi } = await sb.from('testimonials').select('name, role').limit(2);
  if (testi && testi.length > 0) {
    console.log('Testimoni:');
    testi.forEach(t => console.log('  -', t.name, '|', t.role || '(no role)'));
  }

  process.exit(0);
})();
