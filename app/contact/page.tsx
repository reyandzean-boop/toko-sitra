import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'tokositra';
const email = process.env.NEXT_PUBLIC_EMAIL || 'hello@tokositra.id';
const address =
  process.env.NEXT_PUBLIC_ADDRESS || 'Jl. Kreativitas No. 1, Jakarta';

export default function ContactPage() {
  return (
    <>
      <section className="bg-pinkDark pt-32 pb-16 text-cream sm:pt-36">
        <div className="container-custom text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-pink">
            Yuk, Ngobrol!
          </span>
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            Hubungi Kami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-cream/70 sm:text-lg">
            Punya pertanyaan tentang menu? Mau request penawaran? Atau cuma mau
            bilang halo? Kami siap dengerin.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="card-base p-6 sm:p-8 lg:col-span-3">
              <h2 className="heading-section mb-1">Kirim Pesan</h2>
              <p className="mb-6 text-sm text-espresso/60">
                Isi form di bawah, kami balas dalam 1×24 jam (weekday).
              </p>
              <ContactForm />
            </div>

            {/* Info kontak langsung */}
            <aside className="space-y-6 lg:col-span-2">
              <div className="card-base p-6">
                <h3 className="font-display text-lg font-bold text-espresso">
                  Kontak Langsung
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-espresso/80 transition-colors hover:text-pink"
                    >
                      <FaWhatsapp
                        className="mt-1 shrink-0 text-pink"
                        size={18}
                      />
                      <div>
                        <div className="font-semibold text-espresso">
                          WhatsApp
                        </div>
                        <div>+{wa}</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-start gap-3 text-sm text-espresso/80 transition-colors hover:text-pink"
                    >
                      <FaEnvelope
                        className="mt-1 shrink-0 text-pink"
                        size={18}
                      />
                      <div>
                        <div className="font-semibold text-espresso">Email</div>
                        <div>{email}</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://instagram.com/${ig.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-espresso/80 transition-colors hover:text-pink"
                    >
                      <FaInstagram
                        className="mt-1 shrink-0 text-pink"
                        size={18}
                      />
                      <div>
                        <div className="font-semibold text-espresso">
                          Instagram
                        </div>
                        <div>@{ig.replace('@', '')}</div>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-espresso/80">
                    <FaMapMarkerAlt
                      className="mt-1 shrink-0 text-pink"
                      size={18}
                    />
                    <div>
                      <div className="font-semibold text-espresso">Alamat</div>
                      <div>{address}</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card-base p-6">
                <h3 className="font-display text-lg font-bold text-espresso">
                  Jam Operasional
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex justify-between text-espresso/80">
                    <span>Senin – Jumat</span>
                    <span className="font-semibold text-espresso">
                      08.00 – 22.00
                    </span>
                  </li>
                  <li className="flex justify-between text-espresso/80">
                    <span>Sabtu – Minggu</span>
                    <span className="font-semibold text-espresso">
                      09.00 – 23.00
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-pink/20 p-6 text-sm text-espresso">
                <div className="font-display text-base font-bold">
                  💡 Mau respon lebih cepat?
                </div>
                <p className="mt-1">
                  Chat langsung via WhatsApp untuk pertanyaan mendesak.
                </p>
                <a
                  href={`https://wa.me/${wa}?text=Halo%20Toko%20Sitra`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-espresso underline hover:text-espressoDark"
                >
                  Buka WhatsApp →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
