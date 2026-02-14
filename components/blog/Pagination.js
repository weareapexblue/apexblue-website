import Link from 'next/link';

function buildPageHref(basePath, page) {
  if (basePath === '/blog/' && page === 1) {
    return '/blog/';
  }
  return `${basePath}page/${page}/`;
}

export default function Pagination({ page, totalPages, basePath = '/blog/' }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
        const active = pageNumber === page;
        return (
          <Link
            key={pageNumber}
            href={buildPageHref(basePath, pageNumber)}
            aria-current={active ? 'page' : undefined}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold ${
              active
                ? 'bg-sky-600 text-white'
                : 'border border-sky-200 text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200'
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </nav>
  );
}
