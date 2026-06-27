import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/types';

interface Props {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: Props) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="card-base group block overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-creamLight">
        {item.thumbnail_url ? (
          <Image
            src={item.thumbnail_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-espresso/30">
            <span className="text-4xl">🎨</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-espresso">
          {item.category}
        </span>
        {item.year && (
          <span className="absolute right-3 top-3 rounded-full bg-espresso/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            {item.year}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-cream">
            Lihat Detail
            <span className="text-pink">→</span>
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 font-display text-lg font-bold text-espresso transition-colors group-hover:text-pink">
          {item.title}
        </h3>
        {item.client_name && (
          <p className="mt-1 text-xs uppercase tracking-wide text-espresso/50">
            {item.client_name}
          </p>
        )}
      </div>
    </Link>
  );
}
