import Image from 'next/image';
import Link from 'next/link';

const team = [
  {
    name: 'Andika Pratama',
    role: 'Founder & Head Barista',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Reza Mahendra',
    role: 'Digital Marketing Lead',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
];

const values = [
  {
    icon: '☕',
    title: 'Kualitas',
    description:
      'Dari biji kopi pilihan hingga detail pixel di setiap desain — kami tidak pernah compromise soal kualitas.',
  },
  {
    icon: '✨',
    title: 'Kreativitas',
    description:
      'Setiap proyek adalah kanvas kosong. Kami hadirkan ide-ide segar yang tak terpikirkan sebelumnya.',
  },
  {
    icon: '🤝',
    title: 'Kepercayaan',
    description:
      'Komunikasi transparan, timeline jelas, hasil yang delivered — kami bangun kepercayaan lewat karya.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920&q=80"
          alt="Tentang Toko Sitra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pinkDark/70" />
        <div className="container-custom relative z-10 flex h-full flex-col items-center justify-center text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
            Tentang Kami
          </span>
          <h1 className="font-display text-5xl font-bold text-cream sm:text-6xl">
            Cerita <span className="text-pink">Toko Sitra</span>
          </h1>
        </div>
      </section>

      {/* Cerita */}
      <section className="section-padding bg-cream">
        <div className="container-custom mx-auto max-w-3xl">
          <h2 className="heading-section text-center">Dari Secangkir Kopi ke Ide Brilian</h2>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-espresso/80 sm:text-lg">
            <p>
              Toko Sitra bermula dari sebuah pertanyaan sederhana:{' '}
              <em>"Bagaimana kalau ngopi bisa jadi lebih dari sekadar ngopi?"</em>{' '}
              Berdiri sejak 2020 di Jakarta, kami membangun ruang di mana
              specialty coffee bertemu dengan kreativitas tanpa batas.
            </p>
            <p>
              Kami percaya secangkir kopi yang enak bisa jadi pembuka
              percakapan yang berarti. Banyak klien kami yang awalnya datang
              hanya untuk ngopi, lalu pulang dengan strategi branding utuh
              untuk bisnis mereka. Atau sebaliknya — klien agency kami yang
              akhirnya jatuh cinta dengan V60 single origin Ethiopia kami.
            </p>
            <p>
              Sekarang, Toko Sitra adalah rumah untuk dua passion: menyajikan
              kopi terbaik dan membantu brand lokal tumbuh lewat desain,
              konten, dan strategi digital yang terukur.
            </p>
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Orang-Orang di Balik Layar
            </span>
            <h2 className="heading-section">Tim Kami</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full ring-4 ring-pink/30 transition-all hover:ring-pink">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-espresso">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-espresso/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section className="section-padding bg-creamLight">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
              Yang Kami Pegang Teguh
            </span>
            <h2 className="heading-section">Nilai Kami</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-base p-8 text-center"
              >
                <div className="mb-4 text-5xl">{v.icon}</div>
                <h3 className="font-display text-2xl font-bold text-espresso">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/70">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pinkDark py-16 text-center text-cream">
        <div className="container-custom">
          <h3 className="font-display text-3xl font-bold sm:text-4xl">
            Mau kenalan langsung? Mampir, yuk!
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            Kami selalu senang ngobrol — soal kopi, soal kreativitas, atau
            bahkan soal cuaca Jakarta yang tak menentu.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className="btn-pink">
              Hubungi Kami
            </Link>
            <Link href="/menu" className="btn-outline-light">
              Lihat Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
