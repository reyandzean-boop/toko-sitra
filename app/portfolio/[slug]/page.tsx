import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPortfolio, getPortfolioBySlug } from '@/lib/data';
import { formatDateID } from '@/lib/utils';

export async function generateStaticParams() {
  const items = await getAllPortfolio();
  return items.map((item) => ({ slug: item.slug }));
}

interface PageProps {
  params: { slug: string };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const item = await getPortfolioBySlug(params.slug);
  if (!item) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-pinkDark pt-32 pb-12 text-cream sm:pt-36">
        <div className="container-custom">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-pink"
          >
            ← Kembali ke Portfolio
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="mb-3 inline-block rounded-full bg-pink px-3 py-1 text-xs font-semibold text-espresso">
                {item.category}
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                {item.title}
              </h1>
              {item.short_description && (
                <p className="mt-4 text-lg text-cream/80">
                  {item.short_description}
                </p>
              )}
            </div>

            {/* Meta */}
            <aside className="rounded-2xl bg-white/15 p-6 backdrop-blur">
              <h3 className="mb-4 font-display text-lg font-bold text-pink">
                Detail Proyek
              </h3>
              <dl className="space-y-3 text-sm">
                {item.client_name && (
                  <div>
                    <dt className="text-cream/50">Klien</dt>
                    <dd className="font-semibold text-cream">
                      {item.client_name}
                    </dd>
                  </div>
                )}
                {item.year && (
                  <div>
                    <dt className="text-cream/50">Tahun</dt>
                    <dd className="font-semibold text-cream">{item.year}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-cream/50">Kategori</dt>
                  <dd className="font-semibold text-cream">{item.category}</dd>
                </div>
                <div>
                  <dt className="text-cream/50">Dibuat</dt>
                  <dd className="font-semibold text-cream">
                    {formatDateID(item.created_at)}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Thumbnail besar */}
      {item.thumbnail_url && (
        <section className="bg-creamLight py-0">
          <div className="container-custom -mt-8">
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Deskripsi */}
      {item.description && (
        <section className="section-padding bg-creamLight">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <h2 className="heading-section mb-6">Tentang Proyek</h2>
              <div className="prose prose-lg max-w-none text-espresso/80">
                {item.description.split('\n\n').map((p, i) => (
                  <p key={i} className="mb-4 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {item.gallery_urls && item.gallery_urls.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-section mb-10 text-center">Galeri</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery_urls.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
                >
                  <Image
                    src={url}
                    alt={`${item.title} - ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-pinkDark py-16 text-center text-cream">
        <div className="container-custom">
          <h3 className="font-display text-3xl font-bold">
            Tertarik dengan layanan serupa?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            Mari diskusikan proyek Anda bersama tim kami.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-pink">
              Hubungi Kami
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
