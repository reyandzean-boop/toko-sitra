// =====================================================
// Utility helpers
// =====================================================

/** Format angka ke Rupiah: 25000 → "Rp 25.000" */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Buat slug dari string: "Es Kopi Susu" → "es-kopi-susu" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Bersihkan string kosong jadi null (untuk kolom nullable di DB) */
export function emptyToNull(value: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Format tanggal ISO ke string Indonesia: "12 Juni 2025" */
export function formatDateID(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
