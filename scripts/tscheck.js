const { execSync } = require('child_process');
try {
  execSync('cd d:/Qonex/toko-sitra && npx tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ TypeScript OK');
} catch (e) {
  console.log('❌ TypeScript Errors:');
  console.log((e.stdout || e.message).slice(0, 2000));
}
