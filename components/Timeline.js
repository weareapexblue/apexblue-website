import Link from 'next/link';
import Reveal from '@/components/Reveal';

function isExternalLink(href) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export default function Timeline({ items }) {
  return (
    <ol className="relative border-l-2 border-sky-200 pl-6 dark:border-sky-800" aria-label="Apex Blue evolution timeline">
      {items.map((item) => (
        <Reveal key={item.year} as="li" className="relative mb-10 pl-4">
          <span className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-sky-500 bg-sky-100 dark:bg-sky-900" />
          <h3 className="font-display text-xl font-semibold text-sky-900 dark:text-sky-100">{item.year}</h3>
          <p className="mt-1 text-sm font-semibold text-sky-700 dark:text-sky-300">{item.milestone}</p>
          <p className="mt-2 text-muted">{item.description}</p>

          {isExternalLink(item.href) ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-3 inline-block text-sm font-semibold text-sky-600 hover:text-sky-800"
            >
              Explore this milestone in detail
            </a>
          ) : (
            <Link href={item.href} className="focus-ring mt-3 inline-block text-sm font-semibold text-sky-600 hover:text-sky-800">
              Explore this milestone in detail
            </Link>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
