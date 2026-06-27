'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { PortfolioItem } from '@/lib/types';
import { formatDateID } from '@/lib/utils';
import {
  HiTrash,
  HiExternalLink,
  HiCheck,
  HiX,
  HiPlus,
  HiPencil,
} from 'react-icons/hi';
import Image from 'next/image';
import Modal from '@/components/admin/Modal';
import PortfolioForm from '@/components/admin/PortfolioForm';

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | PortfolioItem['category']>(
    'all'
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);

  const load = async () => {
    if (!supabase || !isSupabaseConfigured) {
      const { mockPortfolioItems } = await import('@/lib/mock-data');
      setItems(mockPortfolioItems);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleFeatured = async (item: PortfolioItem) => {
    if (!supabase) {
      setItems((items) =>
        items.map((i) =>
          i.id === item.id ? { ...i, is_featured: !i.is_featured } : i
        )
      );
      return;
    }
    await supabase
      .from('portfolio_items')
      .update({ is_featured: !item.is_featured })
      .eq('id', item.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Hapus portfolio ini?')) return;
    if (!supabase) {
      setItems((items) => items.filter((i) => i.id !== id));
      return;
    }
    await supabase.from('portfolio_items').delete().eq('id', id);
    load();
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const filtered =
    filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">
            Portfolio
          </h1>
          <p className="mt-1 text-sm text-espresso/60">
            Kelola portfolio yang ditampilkan di website
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <HiPlus size={18} />
          Tambah Portfolio
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'Branding', 'Social Media', 'Iklan Digital', 'Desain'] as const).map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === cat
                  ? 'border-espresso bg-espresso text-cream'
                  : 'border-espresso/20 bg-white text-espresso hover:border-espresso'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-base p-12 text-center">
          <p className="mb-4 text-espresso/50">Belum ada portfolio.</p>
          <button onClick={openAdd} className="btn-outline">
            <HiPlus size={16} />
            Tambah Portfolio Pertama
          </button>
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-espresso text-cream">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Preview</th>
                  <th className="px-4 py-3 text-left font-semibold">Judul</th>
                  <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                  <th className="px-4 py-3 text-left font-semibold">Tahun</th>
                  <th className="px-4 py-3 text-left font-semibold">Featured</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-espresso/5 last:border-0 hover:bg-creamLight/50"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded bg-creamLight">
                        {item.thumbnail_url && (
                          <Image
                            src={item.thumbnail_url}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-espresso">
                        {item.title}
                      </div>
                      <div className="text-xs text-espresso/50">
                        /{item.slug} · {formatDateID(item.created_at)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-pink/20 px-2 py-0.5 text-xs font-semibold text-espresso">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-espresso/70">
                      {item.year || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className={`inline-flex h-6 w-6 items-center justify-center rounded ${
                          item.is_featured
                            ? 'bg-green-500 text-white'
                            : 'bg-espresso/10 text-espresso/30 hover:bg-espresso/20'
                        }`}
                        title={item.is_featured ? 'Tampil di homepage' : 'Tidak tampil'}
                      >
                        {item.is_featured ? <HiCheck size={14} /> : <HiX size={14} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded p-1.5 text-espresso/40 hover:bg-pinkLight hover:text-pinkDark"
                          title="Edit"
                        >
                          <HiPencil size={16} />
                        </button>
                        <a
                          href={`/portfolio/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-1.5 text-espresso/40 hover:bg-pinkLight hover:text-pinkDark"
                          title="Lihat"
                        >
                          <HiExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => remove(item.id)}
                          className="rounded p-1.5 text-espresso/40 hover:bg-red-50 hover:text-red-600"
                          title="Hapus"
                        >
                          <HiTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mt-6 rounded-lg bg-pink/20 p-4 text-sm text-espresso">
          ⚠️ <strong>Mode Demo:</strong> Aksi CRUD tidak permanen.
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? `Edit Portfolio: ${editing.title}` : 'Tambah Portfolio Baru'}
        size="lg"
      >
        <PortfolioForm
          initial={editing}
          onSaved={() => {
            closeModal();
            load();
          }}
        />
      </Modal>
    </div>
  );
}
