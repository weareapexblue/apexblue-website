import Link from 'next/link';
import Seo from '@/components/Seo';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import Pagination from '@/components/blog/Pagination';
import { getSortedPostsData, paginatePosts } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function BlogIndexPage({ paginated }) {
  const canonical = getCanonical('/blog/');
  const description =
    'Read Apex Blue articles on AI marketing insights, lead generation, fractional C-suite strategy, and artificial intelligence systems for startup growth.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' }
  ];

  return (
    <>
      <Seo
        title="AI Marketing & Fractional C-Suite Insights"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'AI Marketing & Fractional C-Suite Insights',
            description,
            pathname: '/blog/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <p className="section-kicker">Information</p>
        <h1 className="section-title mt-2">AI Marketing &amp; Fractional C-suite Insights</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Explore practical guides on artificial intelligence marketing, fractional executive systems, and growth
          workflows that help startups move faster with better decisions.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginated.posts.map((post) => (
            <BlogCard key={post.path} post={post} />
          ))}
        </div>

        <Pagination page={paginated.page} totalPages={paginated.totalPages} basePath="/blog/" />

        <div className="mt-8 text-sm text-muted">
          Looking for fundamentals?{' '}
          <Link href="/describe-artificial-intelligence/" className="focus-ring text-sky-600 hover:text-sky-800">
            Read our guide on what artificial intelligence is and how it works.
          </Link>
        </div>
      </section>
    </>
  );
}

export function getStaticProps() {
  const posts = getSortedPostsData();
  const paginated = paginatePosts(posts, 1, 6);

  return {
    props: {
      paginated
    }
  };
}
