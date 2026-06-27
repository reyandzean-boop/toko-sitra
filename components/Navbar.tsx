'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  // Sembunyikan navbar di halaman admin
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 shadow-sm backdrop-blur'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between sm:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 font-display text-2xl font-bold sm:text-3xl ${
            transparent ? 'text-cream' : 'text-espresso'
          }`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-pink" />
          Toko Sitra
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  transparent
                    ? active
                      ? 'text-pinkLight'
                      : 'text-cream hover:text-pinkLight'
                    : active
                      ? 'text-pinkDark'
                      : 'text-espresso/80 hover:text-pinkDark'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-pink !py-2 !px-5 text-xs">
            Request Penawaran
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden ${transparent ? 'text-cream' : 'text-espresso'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-pink/20 bg-white lg:hidden">
          <div className="container-custom flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-pink text-espresso'
                      : 'text-espresso hover:bg-pinkLight'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="btn-pink mt-2 !py-3 text-center"
            >
              Request Penawaran
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
