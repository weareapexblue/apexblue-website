import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '@/data/site';
import DarkModeToggle from '@/components/DarkModeToggle';
import { CloseIcon, MenuIcon } from '@/components/icons';
import SearchModal from '@/components/SearchModal';

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function closeDesktopDropdowns() {
    if (typeof document === 'undefined') {
      return;
    }

    document.querySelectorAll('header nav details[open]').forEach((element) => {
      element.removeAttribute('open');
    });
  }

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [router.asPath]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-200/80 bg-white/95 backdrop-blur-lg dark:border-sky-800 dark:bg-slate-950/95">
        <div className="container-shell flex items-center justify-between gap-4 py-3">
          <Link href="/" className="focus-ring inline-flex items-center rounded-lg bg-white px-2 py-1 shadow-sm ring-1 ring-sky-100 dark:ring-sky-700">
            <Image
              src="/assets/apex-blue-ai-development-marketing-horizontal-logo.webp"
              alt="Apex Blue artificial intelligence development and AI marketing agency logo"
              width={500}
              height={83}
              className="h-5 w-auto sm:h-6"
              priority
            />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
            {NAV_ITEMS.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <details key={item.label} className="group relative">
                    <summary className="focus-ring cursor-pointer list-none rounded-md px-2 py-1 text-sm font-semibold text-sky-900 marker:hidden hover:text-sky-700 dark:text-sky-100 dark:hover:text-sky-300">
                      {item.label}
                    </summary>
                    <div className="panel absolute left-0 top-full mt-2 w-72 rounded-2xl p-2 shadow-glow">
                      {item.items.map((subItem) =>
                        subItem.external ? (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={closeDesktopDropdowns}
                            className="focus-ring block rounded-xl px-3 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-100 dark:text-sky-100 dark:hover:bg-sky-900"
                          >
                            {subItem.label}
                          </a>
                        ) : (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={closeDesktopDropdowns}
                            className="focus-ring block rounded-xl px-3 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-100 dark:text-sky-100 dark:hover:bg-sky-900"
                          >
                            {subItem.label}
                          </Link>
                        )
                      )}
                    </div>
                  </details>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-md px-2 py-1 text-sm font-semibold text-sky-900 hover:text-sky-700 dark:text-sky-100 dark:hover:text-sky-300"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              aria-label="Open site search"
              className="focus-ring rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-sky-800 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
            >
              Search
            </button>
            <DarkModeToggle />
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-ring rounded-lg border border-sky-300 p-2 text-sky-800 dark:border-sky-700 dark:text-sky-200 lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="container-shell pb-5 lg:hidden">
            <div className="panel space-y-3 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  aria-haspopup="dialog"
                  aria-expanded={searchOpen}
                  aria-label="Open site search"
                  className="focus-ring rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-sky-800 dark:border-sky-700 dark:text-sky-200"
                >
                  Search
                </button>
                <DarkModeToggle />
              </div>

              <nav className="space-y-2" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  if (item.type === 'dropdown') {
                    return (
                      <details key={item.label} className="rounded-xl border border-sky-200 p-2 dark:border-sky-800">
                        <summary className="cursor-pointer list-none text-sm font-semibold">{item.label}</summary>
                        <div className="mt-2 space-y-1">
                          {item.items.map((subItem) =>
                            subItem.external ? (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="focus-ring block rounded-lg px-3 py-2 text-sm hover:bg-sky-100 dark:hover:bg-sky-900"
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className="focus-ring block rounded-lg px-3 py-2 text-sm hover:bg-sky-100 dark:hover:bg-sky-900"
                              >
                                {subItem.label}
                              </Link>
                            )
                          )}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="focus-ring block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-sky-100 dark:hover:bg-sky-900"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
