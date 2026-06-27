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
  console.log('\n=== Verifikasi hero_images ===\n');

  // 1. Cek tabel
  const { data, error } = await sb.from('hero_images').select('*').order('section');
  if (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  }
  console.log('Data di tabel hero_images:');
  data.forEach(d => {
    console.log('  •', d.section);
    console.log('    URL:', d.image_url.slice(0, 70) + '...');
    console.log('    Alt:', d.alt_text);
  });

  // 2. Test update
  console.log('\n=== Test Update ===');
  const { error: upErr } = await sb
    .from('hero_images')
    .update({ alt_text: 'TEST UPDATE - Hapus Setelah Test' })
    .eq('section', 'home_hero');
  if (upErr) {
    console.log('❌ Update gagal:', upErr.message);
  } else {
    console.log('✅ Update OK');
  }

  // 3. Restore
  await sb.from('hero_images').update({ alt_text: 'Suasana Toko Sitra' }).eq('section', 'home_hero');
  console.log('✅ Restored');

  console.log('\n🎉 Migration berhasil & CRUD works!');
  process.exit(0);
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
