import { useState } from 'react';

export default function LazyEmbed({ title, src, fallbackUrl, fallbackLabel = 'Open on platform' }) {
  const [enabled, setEnabled] = useState(false);

  if (!src) {
    return null;
  }

  return (
    <div className="panel rounded-2xl p-4">
      {enabled ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-64 w-full rounded-xl border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEnabled(true)}
          className="focus-ring flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-sky-300 bg-sky-50 text-center text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:bg-sky-950/60 dark:text-sky-200"
        >
          <span>Load Podcast Preview</span>
          <span className="mt-2 text-xs font-normal text-muted">Embeds are loaded only after interaction for performance.</span>
        </button>
      )}

      {fallbackUrl ? (
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-3 inline-flex text-xs font-semibold text-sky-600 hover:text-sky-800"
        >
          {fallbackLabel}
        </a>
      ) : null}
    </div>
  );
}
