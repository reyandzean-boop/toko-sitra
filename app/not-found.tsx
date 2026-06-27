import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-4 pt-20">
      <div className="text-center">
        <div className="font-display text-9xl font-bold text-pink">404</div>
        <h1 className="mt-4 font-display text-3xl font-bold text-espresso sm:text-4xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-espresso/70">
          Sepertinya kopi yang Anda cari sudah habis. Yuk, balik ke beranda
          untuk menjelajah lebih lanjut.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/" className="btn-primary">
            ← Kembali ke Beranda
          </Link>
          <Link href="/contact" className="btn-outline">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
