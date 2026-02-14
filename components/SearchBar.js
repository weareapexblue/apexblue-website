import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchBar({
  compact = false,
  autoFocus = false,
  buttonLabel = 'Search',
  placeholder = 'Search Apex Blue resources',
  onSearch
}) {
  const router = useRouter();
  const [query, setQuery] = useState(String(router.query.q || ''));

  useEffect(() => {
    setQuery(String(router.query.q || ''));
  }, [router.query.q]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (onSearch) {
      onSearch(trimmed);
      return;
    }

    await router.push(trimmed ? `/search/?q=${encodeURIComponent(trimmed)}` : '/search/');
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Search blog posts and pages">
      <label htmlFor={compact ? 'compact-search' : 'site-search'} className="sr-only">
        Search AI marketing resources
      </label>
      <div className="flex items-center gap-2">
        <input
          id={compact ? 'compact-search' : 'site-search'}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="focus-ring w-full rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-sm text-sky-950 placeholder:text-sky-500 dark:border-sky-700 dark:bg-sky-950/60 dark:text-sky-100 dark:placeholder:text-sky-300"
        />
        <button
          type="submit"
          className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
