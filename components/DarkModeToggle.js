import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('apex-theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('apex-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color theme"
        className="focus-ring rounded-full border border-sky-200 p-2 text-sky-700"
      >
        Theme
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="focus-ring rounded-full border border-sky-300 bg-white/60 px-3 py-1 text-xs font-semibold text-sky-900 transition hover:border-sky-500 hover:bg-sky-50 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-100"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
