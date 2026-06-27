'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ContactMessage } from '@/lib/types';
import { formatDateID } from '@/lib/utils';
import {
  HiMail,
  HiMailOpen,
  HiTrash,
  HiCheck,
  HiReply,
} from 'react-icons/hi';

const purposeLabel: Record<string, string> = {
  menu: 'Tanya Menu',
  penawaran: 'Request Penawaran',
  kolaborasi: 'Kolaborasi',
  lainnya: 'Lainnya',
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = async () => {
    if (!supabase || !isSupabaseConfigured) {
      setMessages([
        {
          id: 'demo-1',
          full_name: 'Contoh Pelanggan',
          email: 'contoh@email.com',
          whatsapp: '628123456789',
          purpose: 'penawaran',
          message:
            'Halo, saya tertarik dengan layanan branding untuk UMKM saya. Bisa info paket dan harganya?',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: 'demo-2',
          full_name: 'Andini S.',
          email: 'andini@example.com',
          whatsapp: null,
          purpose: 'menu',
          message:
            'Apakah V60 Pour Over-nya pakai single origin apa ya? Saya suka yang fruity.',
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    if (!supabase) {
      setMessages((m) =>
        m.map((x) => (x.id === msg.id ? { ...x, is_read: !x.is_read } : x))
      );
      setSelected((s) =>
        s?.id === msg.id ? { ...s, is_read: !s.is_read } : s
      );
      return;
    }
    await supabase
      .from('contact_messages')
      .update({ is_read: !msg.is_read })
      .eq('id', msg.id);
    load();
    if (selected?.id === msg.id) {
      setSelected({ ...selected, is_read: !selected.is_read });
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Hapus pesan ini?')) return;
    if (!supabase) {
      setMessages((m) => m.filter((x) => x.id !== id));
      setSelected(null);
      return;
    }
    await supabase.from('contact_messages').delete().eq('id', id);
    load();
    setSelected(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-espresso">
          Pesan Masuk
        </h1>
        <p className="mt-1 text-sm text-espresso/60">
          Pesan dari form kontak website
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card-base p-12 text-center text-espresso/50">
          Belum ada pesan masuk.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-5">
          {/* List */}
          <div className="space-y-2 lg:col-span-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.is_read) toggleRead(msg);
                }}
                className={`card-base w-full p-4 text-left transition-all hover:shadow-md ${
                  selected?.id === msg.id
                    ? 'ring-2 ring-pink'
                    : !msg.is_read
                      ? 'border-l-4 border-l-pink'
                      : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 shrink-0 ${
                      msg.is_read ? 'text-espresso/30' : 'text-pink'
                    }`}
                  >
                    {msg.is_read ? <HiMailOpen size={18} /> : <HiMail size={18} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          msg.is_read ? 'font-normal text-espresso/70' : 'font-bold text-espresso'
                        }`}
                      >
                        {msg.full_name}
                      </span>
                      <span className="shrink-0 text-xs text-espresso/50">
                        {formatDateID(msg.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-espresso/60">
                      {msg.message}
                    </p>
                    {msg.purpose && (
                      <span className="mt-2 inline-block rounded bg-creamLight px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-espresso/60">
                        {purposeLabel[msg.purpose] || msg.purpose}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="card-base p-6">
                <div className="mb-4 flex items-start justify-between gap-3 border-b border-espresso/10 pb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-espresso">
                      {selected.full_name}
                    </h2>
                    <p className="text-sm text-espresso/60">{selected.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleRead(selected)}
                      className="rounded p-2 text-espresso/40 hover:bg-creamLight hover:text-espresso"
                      title={selected.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                    >
                      {selected.is_read ? <HiMail size={18} /> : <HiMailOpen size={18} />}
                    </button>
                    <button
                      onClick={() => remove(selected.id)}
                      className="rounded p-2 text-espresso/40 hover:bg-red-50 hover:text-red-600"
                      title="Hapus"
                    >
                      <HiTrash size={18} />
                    </button>
                  </div>
                </div>

                <dl className="mb-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-espresso/50">
                      Email
                    </dt>
                    <dd className="font-semibold text-espresso">
                      {selected.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-espresso/50">
                      WhatsApp
                    </dt>
                    <dd className="font-semibold text-espresso">
                      {selected.whatsapp || '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-espresso/50">
                      Keperluan
                    </dt>
                    <dd className="font-semibold text-espresso">
                      {selected.purpose ? purposeLabel[selected.purpose] : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-espresso/50">
                      Tanggal
                    </dt>
                    <dd className="font-semibold text-espresso">
                      {formatDateID(selected.created_at)}
                    </dd>
                  </div>
                </dl>

                <div className="rounded-lg bg-creamLight p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/50">
                    Pesan
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-espresso">
                    {selected.message}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="btn-primary"
                  >
                    <HiReply size={18} />
                    Balas via Email
                  </a>
                  {selected.whatsapp && (
                    <a
                      href={`https://wa.me/${selected.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      Buka WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="card-base flex h-full min-h-[300px] items-center justify-center p-12 text-center text-espresso/50">
                Pilih pesan di samping untuk melihat detail
              </div>
            )}
          </div>
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mt-6 rounded-lg bg-pink/20 p-4 text-sm text-espresso">
          ⚠️ <strong>Mode Demo:</strong> Pesan di atas adalah contoh.
          Konfigurasi Supabase untuk menerima pesan asli dari form kontak.
        </div>
      )}
    </div>
  );
}
