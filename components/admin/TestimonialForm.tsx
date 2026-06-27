'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  adminCreateTestimonial,
  adminUpdateTestimonial,
  type TestimonialInput,
} from '@/lib/data';
import type { Testimonial } from '@/lib/types';
import ImageUpload from './ImageUpload';
import { HiStar, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

interface Props {
  initial?: Testimonial | null;
  onSaved: () => void;
}

const emptyForm: TestimonialInput = {
  name: '',
  role: '',
  content: '',
  rating: 5,
  avatar_url: null,
  is_active: true,
};

export default function TestimonialForm({ initial, onSaved }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonialInput>(
    initial
      ? {
          name: initial.name,
          role: initial.role ?? '',
          content: initial.content,
          rating: initial.rating,
          avatar_url: initial.avatar_url,
          is_active: initial.is_active,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof TestimonialInput>(
    key: K,
    value: TestimonialInput[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Nama wajib diisi');
    if (!form.content.trim()) return setError('Isi testimoni wajib diisi');

    setError(null);
    setSuccess(false);
    setLoading(true);

    const cleaned: TestimonialInput = {
      ...form,
      name: form.name.trim(),
      role: form.role?.trim() || null,
      content: form.content.trim(),
      avatar_url: form.avatar_url || null,
    };

    let result;
    if (initial) {
      result = await adminUpdateTestimonial(initial.id, cleaned);
    } else {
      result = await adminCreateTestimonial(cleaned);
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
          <span>Testimoni berhasil {initial ? 'diperbarui' : 'ditambahkan'}!</span>
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <HiExclamationCircle className="mt-0.5 shrink-0" size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Nama <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="Nama pelanggan"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Role / Jabatan
          </label>
          <input
            type="text"
            value={form.role ?? ''}
            onChange={(e) => update('role', e.target.value)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="Contoh: Pelanggan Setia, CEO Startup X"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Isi Testimoni <span className="text-red-600">*</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => update('content', e.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Tulis testimoni pelanggan..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update('rating', n)}
              className={`transition-transform hover:scale-110 ${
                n <= form.rating ? 'text-pinkDark' : 'text-espresso/15'
              }`}
              aria-label={`${n} bintang`}
            >
              <HiStar size={32} />
            </button>
          ))}
          <span className="ml-2 text-sm text-espresso/60">
            {form.rating} dari 5
          </span>
        </div>
      </div>

      <ImageUpload
        value={form.avatar_url}
        onChange={(url) => update('avatar_url', url)}
        bucket="portfolio-images"
        label="Foto Profil (opsional)"
        hint="Akan ditampilkan sebagai avatar bulat di testimoni"
        aspectRatio="square"
      />

      <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-espresso/15 bg-white p-3 transition-colors hover:border-pink">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => update('is_active', e.target.checked)}
          className="h-4 w-4 rounded border-espresso/30 text-pink focus:ring-pink"
        />
        <div>
          <div className="text-sm font-semibold text-espresso">Aktif</div>
          <div className="text-xs text-espresso/60">Testimoni non-aktif tidak muncul di homepage</div>
        </div>
      </label>

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
              : 'Tambah Testimoni'}
        </button>
      </div>
    </form>
  );
}
