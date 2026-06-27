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

(async () => {
  console.log('\n=== Buat Storage Buckets ===\n');

  for (const name of ['menu-images', 'portfolio-images']) {
    const { data, error } = await sb.storage.createBucket(name, { public: true });
    if (error) {
      if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        console.log('  ⏭️  ' + name + ': sudah ada');
      } else {
        console.log('  ❌ ' + name + ':', error.message);
      }
    } else {
      console.log('  ✅ ' + name + ': dibuat (public)');
    }
  }

  console.log('\n=== Verifikasi ===');
  const { data: buckets } = await sb.storage.listBuckets();
  if (buckets && buckets.length > 0) {
    buckets.forEach(b => console.log('  ✓', b.name, '(public:', b.public + ')'));
  } else {
    console.log('  ⚠️  Tidak ada buckets. Perlu buat manual via dashboard.');
  }

  process.exit(0);
})();
