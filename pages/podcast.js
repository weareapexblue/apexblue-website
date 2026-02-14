import Link from 'next/link';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import PodcastCard from '@/components/podcast/PodcastCard';
import LazyEmbed from '@/components/podcast/LazyEmbed';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { CHARACTERS } from '@/data/site';
import { episodes, podcastSeries } from '@/data/podcast';
import { getCanonical, getWebPageSchema } from '@/lib/schema';
import { getPodcastEpisodeSchema, getPodcastSeriesSchema } from '@/lib/podcast';

export default function PodcastPage() {
  const canonical = getCanonical('/podcast/');
  const description =
    'Join Lyric, Nova, Stryker, and Pulse in the Apex Blue AI podcast with over 70 episodes on growth strategy, trust systems, AI engineering, and revenue intelligence.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Podcast', href: '/podcast/' }
  ];

  return (
    <>
      <Seo
        title="Navigating AI with Apex Blue Podcast"
        description={description}
        canonical={canonical}
        jsonLd={[
          getPodcastSeriesSchema(),
          ...episodes.map((episode) => getPodcastEpisodeSchema(episode)),
          getWebPageSchema({
            name: 'Navigating AI with Apex Blue Podcast',
            description,
            pathname: '/podcast/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="panel rounded-3xl p-8">
          <p className="section-kicker">A.I. Podcast</p>
          <h1 className="section-title mt-2">Navigating AI with Apex Blue</h1>
          <p className="mt-4 max-w-4xl text-muted">
            This AI-generated series follows Lyric, Nova, Stryker, and Pulse as they unpack real-world constraints
            faced by small businesses. Lyric frames the commercial problem, Nova translates strategy into humane trust
            rules, Stryker delivers technical recipes, and Pulse closes with KPIs and pilot plans teams can execute.
          </p>
          <p className="mt-3 max-w-4xl text-muted">
            As of February 14, 2026, the show has over {podcastSeries.overEpisodeCount} episodes and publishes new
            episodes regularly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={podcastSeries.links.apple}
              target="_blank"
              rel="noreferrer"
              aria-label="Listen on Apple Podcasts"
              className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Apple Podcasts
            </a>
            <a
              href={podcastSeries.links.spotify}
              target="_blank"
              rel="noreferrer"
              aria-label="Listen on Spotify"
              className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
            >
              Spotify
            </a>
            <a
              href={podcastSeries.links.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Watch on YouTube"
              className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
            >
              YouTube
            </a>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="latest-episodes-title">
          <h2 id="latest-episodes-title" className="section-title">
            Latest episodes
          </h2>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {episodes.map((episode) => (
              <PodcastCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="preview-title">
          <h2 id="preview-title" className="section-title">
            Preview an episode
          </h2>
          <p className="mt-3 text-muted">
            Embeds are deferred until interaction to protect Core Web Vitals and keep pages fast.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {episodes.slice(0, 2).map((episode) => (
              <div key={`embed-${episode.slug}`}>
                <p className="mb-2 text-sm font-semibold text-sky-700 dark:text-sky-300">{episode.title}</p>
                <LazyEmbed
                  title={episode.title}
                  src={episode.youtubeEmbed || episode.spotifyEmbed}
                  fallbackUrl={episode.listenUrl}
                  fallbackLabel="Open episode on platform"
                />
                <p className="mt-2 text-xs text-muted">
                  Canonical episode link:{' '}
                  <a
                    href={episode.canonical}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring text-sky-600 hover:text-sky-800"
                  >
                    {episode.canonical}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="bios-title">
          <h2 id="bios-title" className="section-title">
            Character bios
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CHARACTERS.map((character) => (
              <article key={`bio-${character.name}`} className="panel rounded-2xl p-5">
                <h3 className="font-display text-2xl font-semibold">{character.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{character.title}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">
                  {character.archetype} | {character.energy}
                </p>
                <p className="mt-1 text-sm font-semibold text-sky-700 dark:text-sky-300">
                  Podcast role: {character.podcastRole}
                </p>
                <p className="mt-3 text-sm text-muted">{character.coreIdentity}</p>
                <p className="mt-3 text-sm font-semibold text-sky-700 dark:text-sky-300">{character.mission}</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Responsibilities</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {character.responsibilities.map((item) => (
                        <li key={`${character.name}-responsibility-${item}`}>- {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Codex prompt behavior</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {character.codexBehavior.map((item) => (
                        <li key={`${character.name}-behavior-${item}`}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href="/gpts/"
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-800"
                >
                  Chat with {character.name} through Apex Blue GPTs
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 panel rounded-3xl p-6" aria-labelledby="notify-title">
          <h2 id="notify-title" className="font-display text-2xl font-semibold">
            Get episode notifications
          </h2>
          <p className="mt-2 text-sm text-muted">Subscribe for new podcast releases, GPT updates, and AI strategy briefings.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </section>
      </section>
    </>
  );
}
