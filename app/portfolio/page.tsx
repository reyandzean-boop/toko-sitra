'use client';

import { useState, useMemo, useEffect } from 'react';
import { getAllPortfolio } from '@/lib/data';
import PortfolioCard from '@/components/PortfolioCard';
import type { PortfolioItem, PortfolioCategory } from '@/lib/types';

const categories: Array<'Semua' | PortfolioCategory> = [
  'Semua',
  'Branding',
  'Social Media',
  'Iklan Digital',
  'Desain',
];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] =
    useState<'Semua' | PortfolioCategory>('Semua');

  useEffect(() => {
    getAllPortfolio().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (active === 'Semua') return items;
    return items.filter((i) => i.category === active);
  }, [items, active]);

  return (
    <>
      <section className="bg-pinkDark pt-32 pb-16 text-cream sm:pt-36">
        <div className="container-custom text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
            Karya Kami
          </span>
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            Portofolio Kreatif Kami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-cream/70 sm:text-lg">
            Beberapa proyek yang telah kami kerjakan untuk klien dari berbagai
            industri. Setiap karya adalah cerita.
          </p>
        </div>
      </section>

      <section className="section-padding bg-creamLight">
        <div className="container-custom">
          {/* Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border-2 px-6 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'border-espresso bg-espresso text-cream'
                      : 'border-espresso/20 bg-white text-espresso hover:border-espresso'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="py-20 text-center text-espresso/60">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
              <p className="mt-4 text-sm">Memuat portfolio...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-espresso/60">
                Belum ada portfolio di kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
