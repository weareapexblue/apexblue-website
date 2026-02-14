import Image from 'next/image';
import Link from 'next/link';
import { formatHumanDate } from '@/lib/utils';

export default function AnchorCard({ anchor }) {
  return (
    <article className="panel overflow-hidden rounded-3xl border border-sky-100 shadow-sm dark:border-sky-900">
      <div className="relative h-52">
        <Image
          src={anchor.image}
          alt={anchor.imageAlt || 'AI strategy guide cover'}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {(anchor.categories || []).map((category) => (
            <span
              key={`${anchor.slug}-${category.slug}`}
              className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-200"
            >
              {category.name}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold leading-tight">
          <Link href={anchor.path} className="focus-ring hover:text-sky-600">
            {anchor.title}
          </Link>
        </h3>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{formatHumanDate(anchor.date)}</p>
        <p className="text-sm text-muted">{anchor.excerpt}</p>
        <Link
          href={anchor.path}
          className="focus-ring inline-flex text-sm font-semibold text-sky-600 hover:text-sky-800"
        >
          Read Guide
        </Link>
      </div>
    </article>
  );
}
