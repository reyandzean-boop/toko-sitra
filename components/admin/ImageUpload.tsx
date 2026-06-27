'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { HiUpload, HiX } from 'react-icons/hi';

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  bucket: 'menu-images' | 'portfolio-images';
  label?: string;
  hint?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

export default function ImageUpload({
  value,
  onChange,
  bucket,
  label = 'Upload Gambar',
  hint,
  aspectRatio = 'video',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG/PNG/WebP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);

    try {
      const { uploadImage } = await import('@/lib/data');
      const { url, error: uploadErr } = await uploadImage(bucket, file);
      if (uploadErr) {
        setError(uploadErr);
        onChange(null);
      } else {
        onChange(url);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Upload gagal';
      setError(msg);
      onChange(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  }[aspectRatio];

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-espresso">
          {label}
        </label>
      )}

      {value ? (
        <div className="group relative">
          <div className={`relative ${aspectClass} overflow-hidden rounded-xl border-2 border-pink/30 bg-creamLight`}>
            <Image
              src={value}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              unoptimized
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-espresso/60 backdrop-blur-sm">
                <div className="text-center text-cream">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-cream/30 border-t-pink" />
                  <div className="mt-2 text-sm">Mengupload...</div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-outline !py-2 !px-4 text-xs disabled:opacity-50"
            >
              Ganti Gambar
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              disabled={uploading}
              className="inline-flex items-center gap-1 rounded-full border-2 border-espresso/20 bg-white px-4 py-2 text-xs font-semibold text-espresso/70 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <HiX size={14} />
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`flex w-full ${aspectClass} flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink/40 bg-pinkLight/30 transition-all hover:border-pink hover:bg-pinkLight/50 disabled:opacity-50`}
        >
          {uploading ? (
            <>
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink/30 border-t-pinkDark" />
              <div className="mt-3 text-sm font-semibold text-espresso">Mengupload...</div>
            </>
          ) : (
            <>
              <HiUpload size={32} className="text-pinkDark" />
              <div className="mt-3 text-sm font-semibold text-espresso">
                Klik untuk upload gambar
              </div>
              <div className="mt-1 text-xs text-espresso/60">
                JPG, PNG, atau WebP • Maks 5MB
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        className="hidden"
      />

      {hint && !error && (
        <div className="mt-1 text-xs text-espresso/50">{hint}</div>
      )}
      {error && (
        <div className="mt-1 text-xs font-semibold text-red-600">{error}</div>
      )}
    </div>
  );
}
