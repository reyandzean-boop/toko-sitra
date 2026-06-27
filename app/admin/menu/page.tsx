'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { MenuItem } from '@/lib/types';
import { formatRupiah, formatDateID } from '@/lib/utils';
import {
  HiTrash,
  HiCheck,
  HiX,
  HiPlus,
  HiPencil,
} from 'react-icons/hi';
import Image from 'next/image';
import Modal from '@/components/admin/Modal';
import MenuForm from '@/components/admin/MenuForm';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | MenuItem['category']>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  const load = async () => {
    if (!supabase || !isSupabaseConfigured) {
      const { mockMenuItems } = await import('@/lib/mock-data');
      setItems(mockMenuItems);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleFeatured = async (item: MenuItem) => {
    if (!supabase) {
      setItems((items) =>
        items.map((i) =>
          i.id === item.id ? { ...i, is_featured: !i.is_featured } : i
        )
      );
      return;
    }
    await supabase
      .from('menu_items')
      .update({ is_featured: !item.is_featured })
      .eq('id', item.id);
    load();
  };

  const toggleAvailable = async (item: MenuItem) => {
    if (!supabase) {
      setItems((items) =>
        items.map((i) =>
          i.id === item.id ? { ...i, is_available: !i.is_available } : i
        )
      );
      return;
    }
    await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', item.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Hapus menu ini?')) return;
    if (!supabase) {
      setItems((items) => items.filter((i) => i.id !== id));
      return;
    }
    await supabase.from('menu_items').delete().eq('id', id);
    load();
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
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
            Menu Kopi
          </h1>
          <p className="mt-1 text-sm text-espresso/60">
            Kelola daftar menu yang ditampilkan di website
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <HiPlus size={18} />
          Tambah Menu
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'Kopi', 'Non-Kopi', 'Makanan', 'Snack'] as const).map(
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
          <p className="text-espresso/50 mb-4">Tidak ada menu.</p>
          <button onClick={openAdd} className="btn-outline">
            <HiPlus size={16} />
            Tambah Menu Pertama
          </button>
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-espresso text-cream">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Preview</th>
                  <th className="px-4 py-3 text-left font-semibold">Nama</th>
                  <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                  <th className="px-4 py-3 text-left font-semibold">Harga</th>
                  <th className="px-4 py-3 text-left font-semibold">Featured</th>
                  <th className="px-4 py-3 text-left font-semibold">Tersedia</th>
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
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-creamLight">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-espresso">
                        {item.name}
                      </div>
                      <div className="line-clamp-1 text-xs text-espresso/50">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-pink/20 px-2 py-0.5 text-xs font-semibold text-espresso">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-espresso">
                      {formatRupiah(item.price)}
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
                        {item.is_featured ? (
                          <HiCheck size={14} />
                        ) : (
                          <HiX size={14} />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAvailable(item)}
                        className={`inline-flex h-6 w-6 items-center justify-center rounded ${
                          item.is_available
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                        title={item.is_available ? 'Tersedia' : 'Sold out'}
                      >
                        {item.is_available ? (
                          <HiCheck size={14} />
                        ) : (
                          <HiX size={14} />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded p-1.5 text-espresso/40 hover:bg-pinkLight hover:text-pinkDark"
                          title="Edit"
                        >
                          <HiPencil size={16} />
                        </button>
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
        title={editing ? `Edit Menu: ${editing.name}` : 'Tambah Menu Baru'}
        size="lg"
      >
        <MenuForm
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
