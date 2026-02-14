import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import lunr from 'lunr';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import SearchBar from '@/components/SearchBar';
import { getSortedAnchorsData } from '@/lib/anchors';
import { getSortedPostsData } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

function normalize(text) {
  return String(text || '').toLowerCase();
}

export default function SearchPage({ documents }) {
  const router = useRouter();
  const query = String(router.query.q || '');

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    const index = lunr(function buildIndex() {
      this.ref('id');
      this.field('title');
      this.field('excerpt');
      this.field('body');

      documents.forEach((doc) => this.add(doc));
    });

    let indexedResults = [];
    try {
      indexedResults = index.search(
        trimmed
          .split(/\s+/)
          .filter(Boolean)
          .map((token) => `${token}*`)
          .join(' ')
      );
    } catch (error) {
      indexedResults = [];
    }
    const docById = Object.fromEntries(documents.map((doc) => [doc.id, doc]));

    const ranked = indexedResults
      .map((result) => docById[result.ref])
      .filter(Boolean)
      .slice(0, 20);

    if (!ranked.length) {
      return documents
        .filter((doc) => normalize(doc.title + doc.excerpt + doc.body).includes(normalize(trimmed)))
        .slice(0, 20);
    }

    return ranked;
  }, [documents, query]);

  const canonical = getCanonical(query ? `/search/?q=${encodeURIComponent(query)}` : '/search/');
  const description =
    'Search Apex Blue articles, podcast resources, AI strategy guides, and core service pages covering AI marketing agency execution, artificial intelligence, and fractional C-suite operations.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search/' }
  ];

  return (
    <>
      <Seo
        title="Search Apex Blue AI Resources"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'Search Apex Blue AI Resources',
            description,
            pathname: '/search/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">Search Apex Blue</h1>
        <p className="mt-3 text-muted">
          Find blog posts, podcast resources, strategy guides, and service pages in one place.
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar buttonLabel="Find" placeholder="Search AI marketing, GPTs, or podcast topics" />
        </div>

        {query ? (
          <p className="mt-6 text-sm text-muted">
            Showing {results.length} result(s) for <strong>{query}</strong>
          </p>
        ) : (
          <div className="panel mt-6 rounded-2xl p-4">
            <p className="text-sm text-muted">Popular searches:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['AI marketing agency', 'Fractional C-Suite', 'Lyric Nova Stryker Pulse', 'RoofEye', 'Custom GPT Library'].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/search/?q=${encodeURIComponent(term)}`}
                    className="focus-ring rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {query && !results.length ? (
          <p className="mt-6 text-sm text-muted">No results yet. Try broader terms like “AI marketing” or “fractional C-suite”.</p>
        ) : null}

        <ul className="mt-6 space-y-4">
          {results.map((result) => (
            <li key={result.id} className="panel rounded-2xl p-4">
              <h2 className="font-display text-xl font-semibold">
                <Link href={result.path} className="focus-ring hover:text-sky-600">
                  {result.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{result.excerpt}</p>
              <Link href={result.path} className="focus-ring mt-3 inline-flex text-sm font-semibold text-sky-600">
                Open result
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function getStaticProps() {
  const posts = getSortedPostsData({ includeContent: true });
  const anchors = getSortedAnchorsData({ includeContent: true });

  const staticPages = [
    {
      id: 'page-home',
      title: 'Apex Blue Home',
      excerpt: 'Apex Blue AI marketing agency with fractional C-suite strategy and GPT library.',
      body:
        'AI marketing agency artificial intelligence development fractional C-suite Lyric Nova Stryker Pulse Orion custom GPTs',
      path: '/'
    },
    {
      id: 'page-fractional',
      title: 'A.I. Powered Fractional C-Suite for Startups',
      excerpt: 'AI-CIO, AI-CMO and AI-CTO services for startup growth and efficiency.',
      body: 'fractional C-suite services startup success investor matchmaking marketing optimization tech stack planning',
      path: '/ai-powered-fractional-c-suite/'
    },
    {
      id: 'page-podcast',
      title: 'Navigating AI with Apex Blue Podcast',
      excerpt: 'Weekly AI podcast with Lyric, Nova, Stryker, and Pulse solving business problems.',
      body: 'AI podcast Lyric Nova Stryker Pulse business growth episodes',
      path: '/podcast/'
    },
    {
      id: 'page-gpts',
      title: 'Custom GPT Library',
      excerpt: 'Curated GPT models for marketing, outreach, analytics, and productivity.',
      body: 'custom GPT library AI tools marketing automation productivity',
      path: '/gpts/'
    }
  ];

  const postDocuments = posts.map((post) => ({
    id: `post-${post.slug}`,
    title: post.title,
    excerpt: post.excerpt,
    // Cap indexed body size to keep static page data lightweight while preserving relevance.
    body: String(post.content || '').slice(0, 1500),
    path: post.path
  }));

  const anchorDocuments = anchors.map((anchor) => ({
    id: `anchor-${anchor.slug}`,
    title: anchor.title,
    excerpt: anchor.excerpt,
    body: String(anchor.content || '').slice(0, 1500),
    path: anchor.path
  }));

  return {
    props: {
      documents: [...staticPages, ...postDocuments, ...anchorDocuments]
    }
  };
}
