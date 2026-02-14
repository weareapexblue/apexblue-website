export default function TableOfContents({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="panel sticky top-24 rounded-2xl p-4" aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a href={`#${item.id}`} className="focus-ring text-muted transition hover:text-sky-700 dark:hover:text-sky-200">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
