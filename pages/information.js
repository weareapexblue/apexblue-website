import Link from 'next/link';
import Seo from '@/components/Seo';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import AnchorCard from '@/components/anchors/AnchorCard';
import { getSortedAnchorsData } from '@/lib/anchors';
import { getSortedPostsData } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function InformationPage({ posts, anchors }) {
  const canonical = getCanonical('/information/');
  const description =
    'Browse Apex Blue information resources on artificial intelligence, AI marketing agency strategy, lead generation, fractional C-suite operations, and long-form AI guides.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Information', href: '/information/' }
  ];

  return (
    <>
      <Seo
        title="Apex Blue Information Resources"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'Apex Blue Information Resources',
            description,
            pathname: '/information/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">Information</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Learn the fundamentals of artificial intelligence, then apply them with practical AI marketing agency and
          fractional C-suite frameworks.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/describe-artificial-intelligence/"
            className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Explain artificial intelligence
          </Link>
          <Link
            href="/blog/"
            className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
          >
            View all blog articles
          </Link>
          <Link
            href="#anchor-pages"
            className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
          >
            Browse AI strategy guides
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <BlogCard key={post.path} post={post} />
          ))}
        </div>

        <div id="anchor-pages" className="mt-16 border-t border-sky-200/80 pt-12 dark:border-sky-800">
          <p className="section-kicker">Guides</p>
          <h2 className="section-title mt-2">Long-form AI strategy guides</h2>
          <p className="mt-4 max-w-3xl text-muted">
            Explore practical playbooks for AI marketing, AI development, and growth systems that teams can apply right
            away.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {anchors.map((anchor) => (
              <AnchorCard key={anchor.path} anchor={anchor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function getStaticProps() {
  const posts = getSortedPostsData();
  const anchors = getSortedAnchorsData();

  return {
    props: {
      posts,
      anchors
    }
  };
}
