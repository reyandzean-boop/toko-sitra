'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { HiUpload, HiX, HiPlus } from 'react-icons/hi';

interface Props {
  values: string[];
  onChange: (urls: string[]) => void;
  bucket: 'menu-images' | 'portfolio-images';
  label?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  values,
  onChange,
  bucket,
  label = 'Galeri Foto',
  maxImages = 5,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    setUploading(true);

    try {
      const { uploadImage } = await import('@/lib/data');
      const newUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Semua file harus berupa gambar');
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError(`File ${file.name} terlalu besar (maks 5MB)`);
          continue;
        }
        const { url, error: err } = await uploadImage(bucket, file);
        if (err) {
          setError(err);
        } else {
          newUrls.push(url);
        }
      }

      onChange([...values, ...newUrls].slice(0, maxImages));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Upload gagal';
      setError(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-espresso">
          {label}{' '}
          <span className="font-normal text-espresso/50">
            ({values.length}/{maxImages})
          </span>
        </label>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {/* Existing images */}
        {values.map((url, idx) => (
          <div
            key={url + idx}
            className="group relative aspect-square overflow-hidden rounded-lg border-2 border-pink/30 bg-creamLight"
          >
            <Image
              src={url}
              alt={`Galeri ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute right-2 top-2 rounded-full bg-espresso/80 p-1.5 text-cream opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              aria-label="Hapus"
            >
              <HiX size={14} />
            </button>
            <div className="absolute bottom-2 left-2 rounded bg-espresso/80 px-2 py-0.5 text-xs font-semibold text-cream">
              #{idx + 1}
            </div>
          </div>
        ))}

        {/* Add more button */}
        {values.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-pink/40 bg-pinkLight/30 transition-all hover:border-pink hover:bg-pinkLight/50 disabled:opacity-50"
          >
            {uploading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink/30 border-t-pinkDark" />
            ) : (
              <>
                <HiPlus size={24} className="text-pinkDark" />
                <div className="mt-1 text-xs font-semibold text-espresso/70">
                  Tambah Foto
                </div>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
        }}
        className="hidden"
      />

      {error && (
        <div className="mt-2 text-xs font-semibold text-red-600">{error}</div>
      )}
      <div className="mt-1 text-xs text-espresso/50">
        Bisa upload beberapa foto sekaligus. Maks {maxImages} foto, masing-masing 5MB.
      </div>
    </div>
  );
}
