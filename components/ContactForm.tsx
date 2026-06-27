'use client';

import { useState } from 'react';
import { submitContactMessage } from '@/lib/data';
import type { ContactPurpose } from '@/lib/types';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

const purposeOptions: { value: ContactPurpose; label: string }[] = [
  { value: 'menu', label: 'Tanya Menu' },
  { value: 'penawaran', label: 'Request Penawaran Iklan' },
  { value: 'kolaborasi', label: 'Kolaborasi' },
  { value: 'lainnya', label: 'Lainnya' },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    purpose: 'penawaran' as ContactPurpose,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    { type: 'success' } | { type: 'error'; message: string } | null
  >(null);

  const update = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Mohon lengkapi semua field wajib.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const result = await submitContactMessage({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim() || null,
      purpose: form.purpose,
      message: form.message.trim(),
    });

    setLoading(false);

    if (result.success) {
      setStatus({ type: 'success' });
      setForm({
        full_name: '',
        email: '',
        whatsapp: '',
        purpose: 'penawaran',
        message: '',
      });
    } else {
      setStatus({
        type: 'error',
        message: result.error || 'Gagal mengirim pesan. Coba lagi.',
      });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {status?.type === 'success' && (
        <div className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800">
          <HiCheckCircle className="mt-0.5 shrink-0 text-green-600" size={20} />
          <div>
            <div className="font-semibold">Pesan Terkirim!</div>
            <div className="mt-1 text-green-700">
              Terima kasih! Kami akan menghubungi Anda secepatnya.
            </div>
          </div>
        </div>
      )}

      {status?.type === 'error' && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <HiExclamationCircle
            className="mt-0.5 shrink-0 text-red-600"
            size={20}
          />
          <div>{status.message}</div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Nama Lengkap <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="email@contoh.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Nomor WhatsApp{' '}
            <span className="text-xs font-normal text-espresso/50">
              (opsional)
            </span>
          </label>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Keperluan
          </label>
          <select
            value={form.purpose}
            onChange={(e) =>
              update('purpose', e.target.value as ContactPurpose)
            }
            className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          >
            {purposeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-espresso">
          Pesan <span className="text-red-600">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="w-full resize-none rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
          placeholder="Ceritakan kebutuhan Anda..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}
