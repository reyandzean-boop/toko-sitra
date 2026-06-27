import Link from 'next/link';
import {
  adminGetAllMenu,
  adminGetAllPortfolio,
  adminGetAllMessages,
  adminGetAllTestimonials,
} from '@/lib/data';
import {
  HiCollection,
  HiClipboardList,
  HiChatAlt2,
  HiStar,
  HiArrowRight,
} from 'react-icons/hi';

export default async function AdminDashboard() {
  const [menu, portfolio, messages, testimonials] = await Promise.all([
    adminGetAllMenu(),
    adminGetAllPortfolio(),
    adminGetAllMessages(),
    adminGetAllTestimonials(),
  ]);

  const unreadMessages = messages.filter((m) => !m.is_read).length;

  const stats = [
    {
      label: 'Total Menu',
      value: menu.length,
      icon: HiClipboardList,
      href: '/admin/menu',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Total Portfolio',
      value: portfolio.length,
      icon: HiCollection,
      href: '/admin/portfolio',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      label: 'Pesan Masuk',
      value: messages.length,
      sub: unreadMessages > 0 ? `${unreadMessages} belum dibaca` : null,
      icon: HiChatAlt2,
      href: '/admin/messages',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Testimoni',
      value: testimonials.length,
      icon: HiStar,
      href: '/admin/testimonials',
      color: 'bg-green-50 text-green-700',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-espresso">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-espresso/60">
          Ringkasan data website Toko Sitra
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="card-base group flex items-start justify-between p-5 transition-all hover:shadow-lg"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
                  {stat.label}
                </div>
                <div className="mt-2 font-display text-3xl font-bold text-espresso">
                  {stat.value}
                </div>
                {stat.sub && (
                  <div className="mt-1 text-xs font-semibold text-amber-600">
                    {stat.sub}
                  </div>
                )}
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <Icon size={20} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent messages */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card-base p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-espresso">
              Pesan Terbaru
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-pink hover:text-espresso"
            >
              Lihat semua →
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-sm text-espresso/50">Belum ada pesan.</p>
          ) : (
            <ul className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <li
                  key={msg.id}
                  className="flex items-start justify-between gap-3 border-b border-espresso/5 pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-espresso">
                        {msg.full_name}
                      </span>
                      {!msg.is_read && (
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <p className="line-clamp-2 text-sm text-espresso/70">
                      {msg.message}
                    </p>
                  </div>
                  <Link
                    href="/admin/messages"
                    className="shrink-0 text-espresso/30 hover:text-pink"
                  >
                    <HiArrowRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-base p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-espresso">
              Portfolio Terbaru
            </h2>
            <Link
              href="/admin/portfolio"
              className="text-xs font-semibold text-pink hover:text-espresso"
            >
              Lihat semua →
            </Link>
          </div>
          {portfolio.length === 0 ? (
            <p className="text-sm text-espresso/50">Belum ada portfolio.</p>
          ) : (
            <ul className="space-y-3">
              {portfolio.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-espresso/5 pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-espresso">
                      {item.title}
                    </div>
                    <div className="text-xs text-espresso/60">
                      {item.category} {item.year && `· ${item.year}`}
                    </div>
                  </div>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    target="_blank"
                    className="shrink-0 text-espresso/30 hover:text-pink"
                  >
                    <HiArrowRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
