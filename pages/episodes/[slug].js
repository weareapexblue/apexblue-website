import Link from 'next/link';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import LazyEmbed from '@/components/podcast/LazyEmbed';
import { episodes } from '@/data/podcast';
import { getPodcastEpisodeSchema } from '@/lib/podcast';
import { getCanonical, getWebPageSchema } from '@/lib/schema';
import { formatHumanDate } from '@/lib/utils';

function buildResourceChecklist(title) {
  return [
    `Signal map template aligned to ${title}`,
    'Pilot KPI tracker (roles, milestones, and owner accountability)',
    'Implementation checklist for week 1 and week 2',
    'Follow-up prompts for Lyric, Nova, Stryker, and Pulse'
  ];
}

export default function EpisodePage({ episode }) {
  const canonical = getCanonical(`/episodes/${episode.slug}/`);
  const description = episode.description;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Podcast', href: '/podcast/' },
    { label: episode.title, href: `/episodes/${episode.slug}/` }
  ];

  const resourceChecklist = buildResourceChecklist(episode.title);

  return (
    <>
      <Seo
        title={`${episode.title} | Apex Blue`}
        description={description}
        canonical={canonical}
        jsonLd={[
          getPodcastEpisodeSchema(episode),
          getWebPageSchema({
            name: episode.title,
            description,
            pathname: `/episodes/${episode.slug}/`,
            breadcrumbs
          })
        ]}
      />

      <article id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <p className="section-kicker">Podcast Episode {episode.episodeNumber}</p>
        <h1 className="section-title mt-2">{episode.title}</h1>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          <span>{formatHumanDate(episode.datePublished)}</span>
          <span>{episode.shortDuration}</span>
        </div>

        <p className="mt-6 max-w-4xl text-muted">{episode.description}</p>

        <section className="mt-8" aria-labelledby="episode-preview-title">
          <h2 id="episode-preview-title" className="font-display text-2xl font-semibold">
            Episode preview
          </h2>
          <div className="mt-4">
            <LazyEmbed
              title={episode.title}
              src={episode.youtubeEmbed || episode.spotifyEmbed}
              fallbackUrl={episode.listenUrl}
              fallbackLabel="Open this episode on the main platform"
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            Canonical platform link:{' '}
            <a
              href={episode.canonical}
              target="_blank"
              rel="noreferrer"
              className="focus-ring text-sky-600 hover:text-sky-800"
            >
              {episode.canonical}
            </a>
          </p>
        </section>

        <section className="mt-10 panel rounded-3xl p-6" aria-labelledby="show-notes-title">
          <h2 id="show-notes-title" className="font-display text-2xl font-semibold">
            Show notes & resources
          </h2>
          <p className="mt-3 text-muted">
            This episode includes a startup-ready operating system: signal definitions, implementation sequence, and a
            lightweight pilot plan that can be tested in under 30 days.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {resourceChecklist.map((item) => (
              <li key={`${episode.slug}-${item}`}>- {item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="next-steps-title">
          <h2 id="next-steps-title" className="font-display text-2xl font-semibold">
            Next steps
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/gpts/"
              className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Open Apex Blue GPT library
            </Link>
            <Link
              href="/ai-powered-fractional-c-suite/"
              className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
            >
              Explore fractional C-suite services
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: episodes.map((episode) => ({
      params: {
        slug: episode.slug
      }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const episode = episodes.find((entry) => entry.slug === params.slug);

  return {
    props: {
      episode
    }
  };
}
