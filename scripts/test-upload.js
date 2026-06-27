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

// Test file content
const testContent = 'Test upload ' + new Date().toISOString();
const testFile = new Blob([testContent], { type: 'text/plain' });

(async () => {
  console.log('\n=== Test Upload ke Storage ===\n');

  // Upload ke menu-images
  const { data: up1, error: err1 } = await sb.storage
    .from('menu-images')
    .upload('test-upload.txt', testFile, { upsert: true });

  if (err1) {
    console.log('❌ Upload ke menu-images:', err1.message);
  } else {
    console.log('✅ Upload ke menu-images: SUKSES');
    console.log('   Path:', up1.path);

    // Get public URL
    const { data: pub } = sb.storage.from('menu-images').getPublicUrl('test-upload.txt');
    console.log('   Public URL:', pub.publicUrl);

    // Verify dengan download
    const { data: dl, error: dlErr } = await sb.storage
      .from('menu-images')
      .download('test-upload.txt');
    if (dlErr) {
      console.log('   ❌ Download gagal:', dlErr.message);
    } else {
      const text = await dl.text();
      console.log('   ✅ Download OK, isi:', text);
    }

    // Cleanup
    await sb.storage.from('menu-images').remove(['test-upload.txt']);
    console.log('   🧹 Test file dihapus');
  }

  // Upload ke portfolio-images
  console.log('');
  const { data: up2, error: err2 } = await sb.storage
    .from('portfolio-images')
    .upload('test-upload.txt', testFile, { upsert: true });

  if (err2) {
    console.log('❌ Upload ke portfolio-images:', err2.message);
  } else {
    console.log('✅ Upload ke portfolio-images: SUKSES');
    await sb.storage.from('portfolio-images').remove(['test-upload.txt']);
    console.log('   🧹 Test file dihapus');
  }

  console.log('\n🎉 Storage berfungsi dengan baik!');
  process.exit(0);
})();
