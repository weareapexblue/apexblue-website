import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {items.map((item, index) => (
          <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
            {index === items.length - 1 ? (
              <span aria-current="page" className="font-semibold text-sky-700 dark:text-sky-300">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="focus-ring hover:text-sky-700 dark:hover:text-sky-200">
                {item.label}
              </Link>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
