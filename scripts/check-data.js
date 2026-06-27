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
  // Cek langsung dengan query yang menampilkan rows
  for (const table of ['menu_items', 'portfolio_items', 'testimonials']) {
    const { data, error } = await sb.from(table).select('*').limit(5);
    if (error) {
      console.log(table, '→ ERROR:', error.message);
      continue;
    }
    console.log(table + ': ' + (data ? data.length : 0) + ' baris dikembalikan');
    if (data && data.length > 0) {
      data.forEach(d => console.log('   -', d.name || d.title, '|', d.category || d.role || ''));
    } else {
      console.log('   (kosong)');
    }
  }
  process.exit(0);
})();
