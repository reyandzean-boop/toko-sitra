const { execSync } = require('child_process');
try {
  const out = execSync('cd /d d:/Qonex/toko-sitra && npx next lint 2>&1', { encoding: 'utf8', shell: true });
  console.log(out);
} catch (e) {
  console.log(e.stdout || e.message);
}
