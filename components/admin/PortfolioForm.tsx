'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  adminCreatePortfolio,
  adminUpdatePortfolio,
  type PortfolioInput,
} from '@/lib/data';
import type { PortfolioItem, PortfolioCategory } from '@/lib/types';
import { slugify } from '@/lib/utils';
import ImageUpload from './ImageUpload';
import MultiImageUpload from './MultiImageUpload';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

interface Props {
  initial?: PortfolioItem | null;
  onSaved: () => void;
}

const categories: PortfolioCategory[] = [
  'Branding',
  'Social Media',
  'Iklan Digital',
  'Desain',
];

const emptyForm: PortfolioInput = {
  title: '',
  slug: '',
  description: '',
  short_description: '',
  category: 'Branding',
  client_name: '',
  year: new Date().getFullYear(),
  thumbnail_url: null,
  gallery_urls: [],
  is_featured: false,
  sort_order: 0,
};

export default function PortfolioForm({ initial, onSaved }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PortfolioInput>(
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          description: initial.description ?? '',
          short_description: initial.short_description ?? '',
          category: initial.category,
          client_name: initial.client_name ?? '',
          year: initial.year ?? new Date().getFullYear(),
          thumbnail_url: initial.thumbnail_url,
          gallery_urls: initial.gallery_urls ?? [],
          is_featured: initial.is_featured,
          sort_order: initial.sort_order,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!initial);

  const slugPreview = useMemo(() => {
    return form.slug || slugify(form.title || '');
  }, [form.title, form.slug]);

  const update = <K extends keyof PortfolioInput>(
    key: K,
    value: PortfolioInput[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Judul wajib diisi');

    setError(null);
    setSuccess(false);
    setLoading(true);

    const finalSlug = form.slug?.trim() || slugify(form.title);
    const cleaned: PortfolioInput = {
      ...form,
      title: form.title.trim(),
      slug: finalSlug,
      description: form.description?.trim() || null,
      short_description: form.short_description?.trim() || null,
      client_name: form.client_name?.trim() || null,
      year: form.year ? Number(form.year) : null,
      thumbnail_url: form.thumbnail_url || null,
      gallery_urls: form.gallery_urls && form.gallery_urls.length > 0 ? form.gallery_urls : null,
    };

    let result;
    if (initial) {
      result = await adminUpdatePortfolio(initial.id, cleaned);
    } else {
      result = await adminCreatePortfolio(cleaned);
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
          <span>Portfolio berhasil {initial ? 'diperbarui' : 'ditambahkan'}!</span>
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
          Judul Proyek <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            update('title', e.target.value);
            if (autoSlug) update('slug', '');
          }}
          required
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Contoh: Rebranding Warung Makan Bu Siti"
        />
        <div className="mt-1 text-xs text-espresso/60">
          URL preview: <code className="text-pinkDark">/portfolio/{slugPreview}</code>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Kategori <span className="text-red-600">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value as PortfolioCategory)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Klien
          </label>
          <input
            type="text"
            value={form.client_name ?? ''}
            onChange={(e) => update('client_name', e.target.value)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="Nama klien"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Tahun
          </label>
          <input
            type="number"
            value={form.year ?? ''}
            onChange={(e) =>
              update('year', e.target.value ? parseInt(e.target.value) : null)
            }
            min="2000"
            max={new Date().getFullYear() + 1}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="2024"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Short Description
        </label>
        <input
          type="text"
          value={form.short_description ?? ''}
          onChange={(e) => update('short_description', e.target.value)}
          maxLength={200}
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Ringkasan singkat (maks 200 karakter)"
        />
        <div className="mt-1 text-right text-xs text-espresso/50">
          {(form.short_description?.length || 0)}/200
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Deskripsi Lengkap
        </label>
        <textarea
          value={form.description ?? ''}
          onChange={(e) => update('description', e.target.value)}
          rows={5}
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Ceritakan detail proyek: tantangan, solusi, hasil..."
        />
      </div>

      <ImageUpload
        value={form.thumbnail_url}
        onChange={(url) => update('thumbnail_url', url)}
        bucket="portfolio-images"
        label="Thumbnail"
        hint="Foto utama yang muncul di grid portfolio"
        aspectRatio="video"
      />

      <MultiImageUpload
        values={form.gallery_urls || []}
        onChange={(urls) => update('gallery_urls', urls)}
        bucket="portfolio-images"
        label="Galeri Foto"
        maxImages={5}
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
            <div className="text-xs text-espresso/60">Maks 6 portfolio featured</div>
          </div>
        </label>
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Urutan Tampil
          </label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update('sort_order', parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          />
          <div className="mt-1 text-xs text-espresso/50">
            Angka kecil = tampil lebih dulu
          </div>
        </div>
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
              : 'Tambah Portfolio'}
        </button>
      </div>
    </form>
  );
}
