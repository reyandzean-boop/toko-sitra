'use client';

import { useEffect, useState } from 'react';
import { adminUpdateHeroImage, getHeroImages, type HeroSection } from '@/lib/data';
import { HiCheckCircle, HiExclamationCircle, HiPhotograph } from 'react-icons/hi';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface HeroConfig {
  label: string;
  description: string;
  aspect: 'video' | 'square';
  bucket: 'menu-images' | 'portfolio-images';
}

const HERO_CONFIG: Record<HeroSection, HeroConfig> = {
  home_hero: {
    label: 'Hero Section (Full Screen)',
    description:
      'Background full-screen di bagian paling atas homepage. Akan tertutup overlay gelap + teks tagline. Recommended: 1920×1080px landscape.',
    aspect: 'video',
    bucket: 'portfolio-images',
  },
  home_about: {
    label: 'About Snippet (Foto Kiri)',
    description:
      'Foto di section "Cerita Kami" — tampil sebagai 2-kolom (foto kiri, teks kanan). Recommended: portrait 4:5 atau square.',
    aspect: 'square',
    bucket: 'portfolio-images',
  },
  home_cta: {
    label: 'CTA Section (Background)',
    description:
      'Background section "Mari ngobrol sambil ngopi" di bagian bawah homepage. Recommended: 1920×800px landscape.',
    aspect: 'video',
    bucket: 'portfolio-images',
  },
};

interface HeroState {
  url: string;
  alt: string;
}

export default function AdminHeroImagesPage() {
  const [images, setImages] = useState<Record<HeroSection, HeroState>>({
    home_hero: { url: '', alt: '' },
    home_about: { url: '', alt: '' },
    home_cta: { url: '', alt: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<HeroSection | null>(null);
  const [status, setStatus] = useState<
    | { type: 'success'; section: HeroSection }
    | { type: 'error'; section: HeroSection; message: string }
    | null
  >(null);

  const load = async () => {
    const data = await getHeroImages();
    setImages({
      home_hero: data.home_hero,
      home_about: data.home_about,
      home_cta: data.home_cta,
    });
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (section: HeroSection, url: string, alt: string) => {
    setSaving(section);
    setStatus(null);
    const result = await adminUpdateHeroImage(section, url, alt || null);
    setSaving(null);
    if (result.error) {
      setStatus({ type: 'error', section, message: result.error });
    } else {
      setStatus({ type: 'success', section });
      setTimeout(() => setStatus(null), 2500);
    }
  };

  const handleImageChange = (section: HeroSection, url: string) => {
    setImages((prev) => ({ ...prev, [section]: { ...prev[section], url } }));
  };

  const handleAltChange = (section: HeroSection, alt: string) => {
    setImages((prev) => ({ ...prev, [section]: { ...prev[section], alt } }));
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-espresso/20 border-t-pink" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-espresso">
          Hero Images
        </h1>
        <p className="mt-1 text-sm text-espresso/60">
          Kelola foto utama yang muncul di section homepage
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-pink/20 bg-pinkLight/30 p-4 text-sm text-espresso/80">
        <div className="flex items-start gap-2">
          <HiPhotograph className="mt-0.5 shrink-0 text-pinkDark" size={18} />
          <div>
            <div className="font-semibold text-espresso">Tips:</div>
            <div className="mt-1">
              Anda bisa upload foto baru atau paste URL foto yang sudah ada (misal dari CDN lain).
              Perubahan langsung kelihatan di homepage.
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {(Object.keys(HERO_CONFIG) as HeroSection[]).map((section) => {
          const config = HERO_CONFIG[section];
          const img = images[section];
          const isSaving = saving === section;
          const successHere = status?.type === 'success' && status.section === section;
          const errorHere = status?.type === 'error' && status.section === section;

          return (
            <div key={section} className="card-base p-6">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-pink/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-espresso">
                  {section}
                </span>
                <h2 className="font-display text-lg font-bold text-espresso">
                  {config.label}
                </h2>
              </div>
              <p className="mb-5 text-sm text-espresso/60">{config.description}</p>

              {successHere && (
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-green-600" size={18} />
                  <span>Perubahan tersimpan! Refresh homepage untuk lihat.</span>
                </div>
              )}
              {errorHere && (
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <HiExclamationCircle className="mt-0.5 shrink-0" size={18} />
                  <span>{(status as { message: string }).message}</span>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Image Upload */}
                <div>
                  <ImageUpload
                    value={img.url}
                    onChange={(url) => handleImageChange(section, url || '')}
                    bucket={config.bucket}
                    label="Upload Gambar"
                    aspectRatio={config.aspect}
                  />

                  {/* Atau paste URL */}
                  <div className="mt-3">
                    <div className="mb-1 text-xs text-espresso/60">
                      Atau paste URL langsung:
                    </div>
                    <input
                      type="url"
                      value={img.url.startsWith('blob:') ? '' : img.url}
                      onChange={(e) => handleImageChange(section, e.target.value)}
                      className="w-full rounded-lg border-2 border-espresso/15 bg-white px-3 py-2 text-xs outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Alt text + Save */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">
                      Alt Text (untuk SEO & aksesibilitas)
                    </label>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => handleAltChange(section, e.target.value)}
                      maxLength={200}
                      className="w-full rounded-lg border-2 border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-pink focus:ring-2 focus:ring-pink/20"
                      placeholder="Deskripsi singkat tentang foto..."
                    />
                  </div>

                  <div className="rounded-lg bg-creamLight p-3 text-xs">
                    <div className="mb-1 font-semibold text-espresso">URL saat ini:</div>
                    <div className="break-all text-espresso/60">
                      {img.url || '(kosong — akan pakai default Unsplash)'}
                    </div>
                  </div>

                  <button
                    onClick={() => save(section, img.url, img.alt)}
                    disabled={isSaving || !img.url}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
