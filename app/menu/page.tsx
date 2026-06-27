'use client';

import { useState, useMemo } from 'react';
import { getAllMenu } from '@/lib/data';
import MenuCard from '@/components/MenuCard';
import type { MenuItem, MenuCategory } from '@/lib/types';
import { useEffect } from 'react';

const categories: Array<'Semua' | MenuCategory> = [
  'Semua',
  'Kopi',
  'Non-Kopi',
  'Makanan',
  'Snack',
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'Semua' | MenuCategory>(
    'Semua'
  );

  useEffect(() => {
    getAllMenu().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'Semua') return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="bg-pinkDark pt-32 pb-16 text-cream sm:pt-36">
        <div className="container-custom text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
            Specialty Coffee & More
          </span>
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            Menu Kami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-cream/70 sm:text-lg">
            Setiap cangkir dan sajian dibuat dengan bahan terbaik. Pilih
            favoritmu, nikmati di tempat atau bawa pulang.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {/* Filter chips */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border-2 px-6 py-2 text-sm font-semibold transition-all ${
                    active
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
              <p className="mt-4 text-sm">Memuat menu...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-espresso/60">
                Tidak ada menu di kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
