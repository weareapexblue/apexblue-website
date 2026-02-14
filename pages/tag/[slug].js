import Seo from '@/components/Seo';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function TagPage({ tag, posts }) {
  const canonical = getCanonical(`/tag/${tag.slug}/`);
  const description = `Browse Apex Blue content tagged ${tag.name}, including AI marketing agency playbooks, artificial intelligence strategy, and startup workflows.`;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: tag.name, href: `/tag/${tag.slug}/` }
  ];

  return (
    <>
      <Seo
        title={`${tag.name} Tag | Apex Blue`}
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: `${tag.name} Tag`,
            description,
            pathname: `/tag/${tag.slug}/`,
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">Tag: {tag.name}</h1>
        <p className="mt-4 text-muted">{posts.length} article(s) found.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.path} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}

export function getStaticPaths() {
  const tags = getAllTags();

  return {
    paths: tags.map((tag) => ({
      params: {
        slug: tag.slug
      }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const tags = getAllTags();
  const tag = tags.find((entry) => entry.slug === params.slug);
  const posts = getPostsByTag(params.slug);

  return {
    props: {
      tag,
      posts
    }
  };
}
