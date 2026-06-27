// End-to-end test CRUD via API
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
  console.log('\n=== Test CRUD End-to-End ===\n');

  // 1. Upload test image
  console.log('1️⃣  Upload test image ke menu-images...');
  // Buat buffer PNG 1x1 pixel
  const png1x1 = Buffer.from([
    0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A,0x00,0x00,0x00,0x0D,0x49,0x48,0x44,0x52,
    0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x01,0x08,0x06,0x00,0x00,0x00,0x1F,0x15,0xC4,
    0x89,0x00,0x00,0x00,0x0D,0x49,0x44,0x41,0x54,0x78,0x9C,0x62,0x00,0x01,0x00,0x00,
    0x05,0x00,0x01,0x0D,0x0A,0x2D,0xB4,0x00,0x00,0x00,0x00,0x49,0x45,0x4E,0x44,0xAE,
    0x42,0x60,0x82
  ]);
  const file = new Blob([png1x1], { type: 'image/png' });
  const filename = 'test-' + Date.now() + '.png';

  const { error: upErr } = await sb.storage.from('menu-images').upload(filename, file, {
    contentType: 'image/png',
  });
  if (upErr) {
    console.log('   ❌ Upload gagal:', upErr.message);
    process.exit(1);
  }
  const { data: pub } = sb.storage.from('menu-images').getPublicUrl(filename);
  console.log('   ✅ Upload OK');
  console.log('   URL:', pub.publicUrl);

  // 2. Insert menu item
  console.log('\n2️⃣  Insert menu baru...');
  const { data: inserted, error: insErr } = await sb.from('menu_items').insert({
    name: 'TEST Menu - Hapus Setelah Test',
    description: 'Menu testing untuk verifikasi CRUD',
    price: 99999,
    category: 'Kopi',
    image_url: pub.publicUrl,
    is_featured: false,
    is_available: true,
  }).select().single();

  if (insErr) {
    console.log('   ❌ Insert gagal:', insErr.message);
    // Cleanup upload
    await sb.storage.from('menu-images').remove([filename]);
    process.exit(1);
  }
  console.log('   ✅ Insert OK, ID:', inserted.id);

  // 3. Update
  console.log('\n3️⃣  Update menu (set featured = true)...');
  const { error: updErr } = await sb.from('menu_items')
    .update({ is_featured: true, price: 11111 })
    .eq('id', inserted.id);
  if (updErr) {
    console.log('   ❌ Update gagal:', updErr.message);
  } else {
    console.log('   ✅ Update OK');
  }

  // 4. Verify
  console.log('\n4️⃣  Verify data ter-update...');
  const { data: verify } = await sb.from('menu_items')
    .select('*')
    .eq('id', inserted.id)
    .single();
  console.log('   name:', verify.name);
  console.log('   price:', verify.price);
  console.log('   is_featured:', verify.is_featured);
  console.log('   image_url:', (verify.image_url || '').slice(0, 60) + '...');

  // 5. Cleanup
  console.log('\n5️⃣  Cleanup (delete row + storage)...');
  await sb.from('menu_items').delete().eq('id', inserted.id);
  await sb.storage.from('menu-images').remove([filename]);
  console.log('   ✅ Cleanup OK');

  console.log('\n🎉 CRUD end-to-end WORKS!');
  process.exit(0);
})().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
