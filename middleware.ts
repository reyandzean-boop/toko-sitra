import { type NextRequest, NextResponse } from 'next/server';

// Catatan: Untuk produksi dengan Supabase Auth, ganti logika ini
// untuk verifikasi session via cookies. Implementasi lengkap dengan
// Supabase SSR butuh @supabase/ssr dan konfigurasi tambahan.
//
// Untuk sekarang, proteksi dilakukan di client (cek session di AdminLayout).
// Middleware ini hanya placeholder agar route admin terdeteksi.

export function middleware(request: NextRequest) {
  // Redirect root admin ke dashboard (handled by app/admin/page.tsx)
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
