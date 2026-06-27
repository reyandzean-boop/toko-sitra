'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';
import { formatDateID } from '@/lib/utils';
import { HiTrash, HiCheck, HiX, HiStar, HiPlus, HiPencil } from 'react-icons/hi';
import Image from 'next/image';
import Modal from '@/components/admin/Modal';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const load = async () => {
    if (!supabase || !isSupabaseConfigured) {
      const { mockTestimonials } = await import('@/lib/mock-data');
      setItems(mockTestimonials);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleActive = async (item: Testimonial) => {
    if (!supabase) {
      setItems((items) =>
        items.map((i) =>
          i.id === item.id ? { ...i, is_active: !i.is_active } : i
        )
      );
      return;
    }
    await supabase
      .from('testimonials')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    if (!supabase) {
      setItems((items) => items.filter((i) => i.id !== id));
      return;
    }
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">
            Testimoni
          </h1>
          <p className="mt-1 text-sm text-espresso/60">
            Kelola testimoni pelanggan yang tampil di homepage
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <HiPlus size={18} />
          Tambah Testimoni
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
        </div>
      ) : items.length === 0 ? (
        <div className="card-base p-12 text-center">
          <p className="mb-4 text-espresso/50">Belum ada testimoni.</p>
          <button onClick={openAdd} className="btn-outline">
            <HiPlus size={16} />
            Tambah Testimoni Pertama
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="card-base p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-pink/30">
                  {item.avatar_url ? (
                    <Image
                      src={item.avatar_url}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pinkLight text-lg font-bold text-espresso">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-espresso">
                    {item.name}
                  </div>
                  {item.role && (
                    <div className="text-xs text-espresso/60">{item.role}</div>
                  )}
                </div>
              </div>

              <div className="mb-2 flex gap-1 text-pinkDark">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    size={14}
                    className={
                      i < item.rating ? 'text-pinkDark' : 'text-espresso/15'
                    }
                  />
                ))}
              </div>

              <p className="line-clamp-3 text-sm text-espresso/75">
                "{item.content}"
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-3 text-xs text-espresso/50">
                <span>{formatDateID(item.created_at)}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded p-1.5 text-espresso/40 hover:bg-pinkLight hover:text-pinkDark"
                    title="Edit"
                  >
                    <HiPencil size={14} />
                  </button>
                  <button
                    onClick={() => toggleActive(item)}
                    className={`rounded p-1.5 ${
                      item.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-espresso/10 text-espresso/40 hover:bg-espresso/20'
                    }`}
                    title={item.is_active ? 'Aktif' : 'Nonaktif'}
                  >
                    {item.is_active ? <HiCheck size={14} /> : <HiX size={14} />}
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded p-1.5 text-espresso/40 hover:bg-red-50 hover:text-red-600"
                    title="Hapus"
                  >
                    <HiTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
        title={editing ? `Edit Testimoni: ${editing.name}` : 'Tambah Testimoni Baru'}
        size="md"
      >
        <TestimonialForm
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
