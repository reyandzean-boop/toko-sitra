'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Supabase belum terkonfigurasi → bypass auth (mode demo)
    if (!isSupabaseConfigured || !supabase) {
      setChecking(false);
      return;
    }

    // Halaman login tidak perlu dicek
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    // Cek session Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setChecking(false);
      }
    });
  }, [router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
          <p className="mt-4 text-sm text-espresso/60">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creamLight">
      <AdminSidebar />
      <div className="lg:ml-64">
        <main className="min-h-screen p-4 pt-4 lg:p-8 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
