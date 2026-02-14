import Seo from '@/components/Seo';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import Pagination from '@/components/blog/Pagination';
import { getSortedPostsData, paginatePosts } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function BlogPaginationPage({ paginated }) {
  const canonical = getCanonical(`/blog/page/${paginated.page}/`);
  const description =
    'Browse more Apex Blue AI marketing agency articles covering artificial intelligence development and fractional C-suite strategy for startups.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: `Page ${paginated.page}`, href: `/blog/page/${paginated.page}/` }
  ];

  return (
    <>
      <Seo
        title={`AI Marketing Insights - Page ${paginated.page}`}
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: `AI Marketing Insights - Page ${paginated.page}`,
            description,
            pathname: `/blog/page/${paginated.page}/`,
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">AI marketing insights - page {paginated.page}</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginated.posts.map((post) => (
            <BlogCard key={post.path} post={post} />
          ))}
        </div>
        <Pagination page={paginated.page} totalPages={paginated.totalPages} basePath="/blog/" />
      </section>
    </>
  );
}

export function getStaticPaths() {
  const posts = getSortedPostsData();
  const paginated = paginatePosts(posts, 1, 6);
  const pageNumbers = Array.from({ length: paginated.totalPages }, (_, index) => index + 1).filter(
    (page) => page > 1
  );

  return {
    paths: pageNumbers.map((page) => ({
      params: {
        page: String(page)
      }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const posts = getSortedPostsData();
  const paginated = paginatePosts(posts, Number(params.page), 6);

  return {
    props: {
      paginated
    }
  };
}
