'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminCreateMenu, adminUpdateMenu, type MenuInput } from '@/lib/data';
import type { MenuItem, MenuCategory } from '@/lib/types';
import ImageUpload from './ImageUpload';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

interface Props {
  initial?: MenuItem | null;
  onSaved: () => void;
}

const categories: MenuCategory[] = ['Kopi', 'Non-Kopi', 'Makanan', 'Snack'];

const emptyForm: MenuInput = {
  name: '',
  description: '',
  price: 0,
  category: 'Kopi',
  image_url: null,
  is_featured: false,
  is_available: true,
};

export default function MenuForm({ initial, onSaved }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<MenuInput>(
    initial
      ? {
          name: initial.name,
          description: initial.description ?? '',
          price: initial.price,
          category: initial.category,
          image_url: initial.image_url,
          is_featured: initial.is_featured,
          is_available: initial.is_available,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof MenuInput>(key: K, value: MenuInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Nama menu wajib diisi');
    if (form.price <= 0) return setError('Harga harus lebih dari 0');

    setError(null);
    setSuccess(false);
    setLoading(true);

    const cleaned: MenuInput = {
      ...form,
      name: form.name.trim(),
      description: form.description?.trim() || null,
      image_url: form.image_url || null,
    };

    let result;
    if (initial) {
      result = await adminUpdateMenu(initial.id, cleaned);
    } else {
      result = await adminCreateMenu(cleaned);
    }
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    router.refresh();
    setTimeout(() => onSaved(), 800);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {success && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          <HiCheckCircle className="mt-0.5 shrink-0 text-green-600" size={18} />
          <span>Menu berhasil {initial ? 'diperbarui' : 'ditambahkan'}!</span>
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <HiExclamationCircle className="mt-0.5 shrink-0" size={18} />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Nama Menu <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          required
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Contoh: Es Kopi Susu Gula Aren"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Harga (Rp) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            value={form.price || ''}
            onChange={(e) => update('price', parseInt(e.target.value) || 0)}
            required
            min="0"
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="25000"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Kategori <span className="text-red-600">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value as MenuCategory)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Deskripsi
        </label>
        <textarea
          value={form.description ?? ''}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Deskripsi singkat tentang menu..."
        />
      </div>

      <ImageUpload
        value={form.image_url}
        onChange={(url) => update('image_url', url)}
        bucket="menu-images"
        label="Foto Menu"
        hint="Recommended: landscape, min 800×600 px"
        aspectRatio="video"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-espresso/15 bg-white p-3 transition-colors hover:border-pink">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => update('is_featured', e.target.checked)}
            className="h-4 w-4 rounded border-espresso/30 text-pink focus:ring-pink"
          />
          <div>
            <div className="text-sm font-semibold text-espresso">
              Tampilkan di Homepage
            </div>
            <div className="text-xs text-espresso/60">Maks 3 menu featured</div>
          </div>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-espresso/15 bg-white p-3 transition-colors hover:border-pink">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => update('is_available', e.target.checked)}
            className="h-4 w-4 rounded border-espresso/30 text-pink focus:ring-pink"
          />
          <div>
            <div className="text-sm font-semibold text-espresso">Tersedia</div>
            <div className="text-xs text-espresso/60">Uncheck untuk sold out</div>
          </div>
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t border-pink/20 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? 'Menyimpan...'
            : initial
              ? 'Simpan Perubahan'
              : 'Tambah Menu'}
        </button>
      </div>
    </form>
  );
}
