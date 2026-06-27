'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  HiLogout,
  HiCog,
  HiCollection,
  HiClipboardList,
  HiChatAlt2,
  HiStar,
  HiPhotograph,
  HiMenu,
  HiX,
} from 'react-icons/hi';

const links = [
  { href: '/admin', label: 'Dashboard', icon: HiCog },
  { href: '/admin/hero-images', label: 'Hero Images', icon: HiPhotograph },
  { href: '/admin/portfolio', label: 'Portfolio', icon: HiCollection },
  { href: '/admin/menu', label: 'Menu', icon: HiClipboardList },
  { href: '/admin/messages', label: 'Pesan Masuk', icon: HiChatAlt2 },
  { href: '/admin/testimonials', label: 'Testimoni', icon: HiStar },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-espresso p-2 text-cream lg:hidden"
        aria-label="Toggle sidebar"
      >
        {open ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-espresso text-cream transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-cream/10 p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-pink" />
            <span className="font-display text-xl font-bold">
              Admin Toko Sitra
            </span>
          </Link>
          {!isSupabaseConfigured && (
            <div className="mt-3 rounded bg-pink/20 p-2 text-xs text-pink">
              Mode Demo (mock data)
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/admin' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-pink text-espresso'
                        : 'text-cream/80 hover:bg-espressoDark hover:text-cream'
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-cream/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-cream/80 transition-colors hover:bg-espressoDark hover:text-cream"
          >
            <HiLogout size={18} />
            Logout
          </button>
          <Link
            href="/"
            className="mt-1 block rounded-lg px-4 py-2 text-center text-xs text-cream/50 hover:text-cream"
          >
            ← Lihat Website
          </Link>
        </div>
      </aside>
    </>
  );
}
