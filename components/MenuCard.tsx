import Image from 'next/image';
import type { MenuItem } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  return (
    <article className="card-base group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-creamLight">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-espresso/30">
            <span className="text-4xl">☕</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-espresso/90 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
          {item.category}
        </span>
        {!item.is_available && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Sold Out
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-espresso">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-sm text-espresso/70">
            {item.description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-pink">
            {formatRupiah(item.price)}
          </span>
          <span className="text-xs text-espresso/50">IDR</span>
        </div>
      </div>
    </article>
  );
}
