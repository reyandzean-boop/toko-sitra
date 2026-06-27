'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      setError(
        'Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local untuk mengaktifkan login. Sementara waktu, klik tombol di bawah untuk masuk mode demo.'
      );
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  const handleDemoMode = () => {
    // Mode demo: bypass auth (Supabase belum dikonfigurasi)
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-espresso p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-3xl font-bold text-cream"
          >
            <span className="inline-block h-3 w-3 rounded-full bg-pink" />
            Toko Sitra
          </Link>
          <p className="mt-2 text-sm text-cream/60">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="card-base p-8">
          <h1 className="font-display text-2xl font-bold text-espresso">
            Masuk
          </h1>
          <p className="mt-1 text-sm text-espresso/60">
            Login untuk mengakses dashboard admin.
          </p>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <HiExclamationCircle
                className="mt-0.5 shrink-0"
                size={18}
              />
              <span>{error}</span>
            </div>
          )}

          {!isSupabaseConfigured && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              <HiCheckCircle
                className="mt-0.5 shrink-0"
                size={18}
              />
              <div>
                <div className="font-semibold">Mode Demo Aktif</div>
                <div className="mt-1 text-xs">
                  Supabase belum dikonfigurasi. Anda bisa masuk dengan klik
                  tombol di bawah.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-espresso">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!isSupabaseConfigured}
                className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20 disabled:bg-creamLight disabled:opacity-60"
                placeholder="admin@tokositra.id"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-espresso">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!isSupabaseConfigured}
                className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20 disabled:bg-creamLight disabled:opacity-60"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {!isSupabaseConfigured && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-espresso/10" />
                <span className="text-xs text-espresso/40">atau</span>
                <div className="h-px flex-1 bg-espresso/10" />
              </div>

              <button
                onClick={handleDemoMode}
                className="btn-outline w-full"
              >
                🚀 Masuk ke Mode Demo
              </button>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-cream/50">
          ← <Link href="/" className="hover:text-pink">Kembali ke Website</Link>
        </p>
      </div>
    </div>
  );
}
