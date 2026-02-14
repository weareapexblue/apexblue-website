import Seo from '@/components/Seo';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function CategoryPage({ category, posts }) {
  const canonical = getCanonical(`/category/${category.slug}/`);
  const description = `Read ${category.name} articles from Apex Blue on AI marketing agency systems, artificial intelligence implementation, and fractional C-suite execution.`;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: category.name, href: `/category/${category.slug}/` }
  ];

  return (
    <>
      <Seo
        title={`${category.name} Articles | Apex Blue`}
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: `${category.name} Articles`,
            description,
            pathname: `/category/${category.slug}/`,
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">{category.name}</h1>
        <p className="mt-4 text-muted">{posts.length} article(s) in this category.</p>

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
  const categories = getAllCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug
      }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const categories = getAllCategories();
  const category = categories.find((entry) => entry.slug === params.slug);
  const posts = getPostsByCategory(params.slug);

  return {
    props: {
      category,
      posts
    }
  };
}
