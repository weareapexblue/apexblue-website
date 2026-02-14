import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import { CloseIcon } from '@/components/icons';

const QUICK_LINKS = [
  { label: 'AI Marketing Insights', href: '/information/' },
  { label: 'A.I. Powered Fractional C-Suite', href: '/ai-powered-fractional-c-suite/' },
  { label: 'Navigating AI Podcast', href: '/podcast/' },
  { label: 'Custom GPT Library', href: '/gpts/' }
];

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  async function handleSearch(query) {
    onClose();
    await router.push(query ? `/search/?q=${encodeURIComponent(query)}` : '/search/');
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] px-4 py-6 sm:px-6" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <button
        type="button"
        aria-label="Close search dialog"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      <div className="panel relative mx-auto mt-16 w-full max-w-3xl rounded-3xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="search-modal-title" className="font-display text-2xl font-semibold">
              Search Apex Blue
            </h2>
            <p className="mt-2 text-sm text-muted">Find articles, podcast resources, guides, and product pages.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="focus-ring rounded-lg border border-sky-300 p-2 text-sky-800 dark:border-sky-700 dark:text-sky-200"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-6">
          <SearchBar autoFocus onSearch={handleSearch} />
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Popular destinations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="focus-ring rounded-full border border-sky-300 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
