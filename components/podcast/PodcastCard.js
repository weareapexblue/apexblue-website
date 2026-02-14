import Link from 'next/link';
import { formatHumanDate } from '@/lib/utils';

export default function PodcastCard({ episode }) {
  return (
    <article className="panel rounded-3xl p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600 dark:text-sky-300">
        Episode {episode.episodeNumber}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold leading-tight">{episode.title}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        <span>{formatHumanDate(episode.datePublished)}</span>
        <span>{episode.shortDuration}</span>
      </div>
      <p className="mt-3 text-sm text-muted">{episode.description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={episode.listenUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Listen Now
        </a>
        <Link
          href={`/episodes/${episode.slug}/`}
          className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
        >
          Show Notes &amp; Resources
        </Link>
      </div>
    </article>
  );
}
