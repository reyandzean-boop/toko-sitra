import Link from 'next/link';
import Image from 'next/image';
import {
  getFeaturedMenu,
  getFeaturedPortfolio,
  getActiveTestimonials,
  getHeroImages,
} from '@/lib/data';
import MenuCard from '@/components/MenuCard';
import PortfolioCard from '@/components/PortfolioCard';
import TestimonialSlider from '@/components/TestimonialSlider';

const services = [
  {
    icon: '🎨',
    title: 'Desain Grafis & Branding',
    description:
      'Bangun identitas visual yang kuat: logo, color palette, typography, dan guidelines.',
  },
  {
    icon: '📱',
    title: 'Konten Media Sosial',
    description:
      'Foto produk, video pendek, caption, dan content calendar yang engage audiens.',
  },
  {
    icon: '📣',
    title: 'Iklan Digital',
    description:
      'Setup & optimasi Meta Ads dan Google Ads dengan targeting dan budget yang efektif.',
  },
];

// Auto-revalidate setiap 60 detik agar perubahan dari admin
// (hero images, menu, portfolio, testimoni) langsung terlihat.
export const revalidate = 60;

export default async function HomePage() {
  const [featuredMenu, featuredPortfolio, testimonials, heroImages] =
    await Promise.all([
      getFeaturedMenu(),
      getFeaturedPortfolio(),
      getActiveTestimonials(),
      getHeroImages(),
    ]);

  return (
    <>
      {/* ============ SECTION 1 — HERO ============ */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <Image
          src={heroImages.home_hero.url}
          alt={heroImages.home_hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/40 to-espresso/80" />

        <div className="container-custom relative z-10 flex h-full flex-col items-center justify-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink/40 bg-espresso/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-pink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            Specialty Coffee
          </span>

          <h1 className="font-display text-5xl font-bold leading-tight text-cream sm:text-6xl lg:text-7xl xl:text-8xl">
            Specialty <span className="text-pink">Coffee</span>
          </h1>

          <p className="mt-28 max-w-2xl text-base text-cream/80 sm:text-lg lg:text-xl">
            Specialty coffee, creative agency, dan ruang untuk ide-ide
            brilian lahir. Semua di satu tempat — Toko Sitra.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/menu" className="btn-pink">
              Lihat Menu
              <span>→</span>
            </Link>
            <Link href="/portfolio" className="btn-outline-light">
              Lihat Portfolio
              <span>→</span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cream/60">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — ABOUT SNIPPET ============ */}
      <section className="section-padding bg-cream">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl lg:aspect-square">
            <Image
              src={heroImages.home_about.url}
              alt={heroImages.home_about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-xl bg-cream/95 px-5 py-3 backdrop-blur">
              <div className="font-display text-2xl font-bold text-espresso">
                Est. 2020
              </div>
              <div className="text-xs uppercase tracking-wide text-espresso/60">
                Jakarta, Indonesia
              </div>
            </div>
          </div>

          <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Cerita Kami
            </span>
            <h2 className="heading-section">
              Lebih dari Sekedar Kedai Kopi.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-espresso/75 sm:text-lg">
              Toko Sitra lahir dari kecintaan terhadap kopi berkualitas dan
              kreativitas tanpa batas. Kami percaya secangkir kopi yang enak
              bisa menjadi awal dari ide-ide brilian — dan kami ada untuk
              mewujudkannya.
            </p>
            <p className="mt-4 text-base leading-relaxed text-espresso/75 sm:text-lg">
              Sebagai creative agency, kami membantu brand lokal tumbuh lewat
              desain, konten, dan strategi digital yang terukur.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-pink"
            >
              Selengkapnya tentang kami
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — FEATURED MENU ============ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Menu Favorit
            </span>
            <h2 className="heading-section">Pilihan Favorit Kami</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-espresso/70">
              Tiga menu yang paling dicintai pelanggan. Dibuat fresh setiap
              hari dengan bahan-bahan pilihan terbaik.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMenu.slice(0, 3).map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/menu" className="btn-primary">
              Lihat Semua Menu
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — LAYANAN ADVERTISING ============ */}
      <section className="section-padding bg-pinkDark text-cream">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Layanan Kami
            </span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Kami Juga Membantu Brand <span className="text-pink">Kamu</span>{' '}
              Tumbuh
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-cream/70">
              Lebih dari sekadar kedai kopi, kami adalah partner kreatif untuk
              mengembangkan brand Anda.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-cream/20 bg-white/10 p-8 transition-all hover:border-cream hover:bg-white/15"
              >
                <div className="mb-5 text-5xl">{service.icon}</div>
                <h3 className="font-display text-xl font-bold text-cream transition-colors group-hover:text-pink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="btn-pink">
              Lihat Portfolio
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5 — PORTFOLIO PREVIEW ============ */}
      <section className="section-padding bg-creamLight">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Karya Terbaru
            </span>
            <h2 className="heading-section">Karya Terbaru Kami</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-espresso/70">
              Beberapa proyek terbaru yang telah kami selesaikan untuk klien
              dari berbagai industri.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.slice(0, 6).map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="btn-primary">
              Lihat Semua Portfolio
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6 — TESTIMONIAL ============ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Testimoni
            </span>
            <h2 className="heading-section">Apa Kata Mereka</h2>
          </div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ============ SECTION 7 — CTA KONTAK ============ */}
      <section className="relative section-padding overflow-hidden">
        <Image
          src={heroImages.home_cta.url}
          alt={heroImages.home_cta.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pinkDark/85" />
        <div className="container-custom relative z-10 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
            Mari Berkarya Bersama
          </span>
          <h2 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Ada proyek? Mari ngobrol
            <br />
            <span className="text-pink">sambil ngopi.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
            Kami siap mendengar ide dan kebutuhan Anda. Diskusi santai dulu,
            tanpa komitmen.
          </p>
          <div className="mt-10">
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
