'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';

const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'tokositra';
const email = process.env.NEXT_PUBLIC_EMAIL || 'hello@tokositra.id';
const address =
  process.env.NEXT_PUBLIC_ADDRESS || 'Jl. Kreativitas No. 1, Jakarta';

export default function Footer() {
  const pathname = usePathname();
  // Sembunyikan footer di halaman admin
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-pinkDark text-cream">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-2xl font-bold text-cream"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cream" />
              Toko Sitra
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/85">
              Specialty coffee shop untuk para penikmat kopi premium.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={`https://instagram.com/${ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/15 p-3 transition-colors hover:bg-cream hover:text-pinkDark"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/15 p-3 transition-colors hover:bg-cream hover:text-pinkDark"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href={`https://tiktok.com/@${ig.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/15 p-3 transition-colors hover:bg-cream hover:text-pinkDark"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-cream">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-cream/85 hover:text-cream">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-cream/85 hover:text-cream">
                  Menu Kopi
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-cream/85 hover:text-cream"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/85 hover:text-cream">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cream/85 hover:text-cream"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-cream">
              <FaClock /> Jam Operasional
            </h3>
            <ul className="space-y-2 text-sm text-cream/85">
              <li className="flex justify-between">
                <span>Senin – Jumat</span>
                <span className="font-semibold text-cream">
                  08.00 – 22.00
                </span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu – Minggu</span>
                <span className="font-semibold text-cream">
                  09.00 – 23.00
                </span>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-cream">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-cream/85">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-cream" />
                <span>{address}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/85 hover:text-cream"
                >
                  <FaWhatsapp className="shrink-0 text-cream" />
                  +{wa}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-cream/85 hover:text-cream"
                >
                  <FaEnvelope className="shrink-0 text-cream" />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/30 pt-6 text-center text-xs text-cream/70">
          © {new Date().getFullYear()} Toko Sitra. All rights reserved. — Built
          with Next.js & Supabase.
        </div>
      </div>
    </footer>
  );
}
