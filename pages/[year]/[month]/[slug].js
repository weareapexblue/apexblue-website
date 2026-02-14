import Link from 'next/link';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogCard from '@/components/blog/BlogCard';
import {
  getAllPostPaths,
  getPostDataByPath,
  getRelatedPosts
} from '@/lib/posts';
import { getBlogPostingSchema, getCanonical, getWebPageSchema } from '@/lib/schema';
import { formatHumanDate } from '@/lib/utils';

export default function PostPage({ post, relatedPosts }) {
  const canonical = getCanonical(post.path);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.title, href: post.path }
  ];

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(canonical);

  return (
    <>
      <Seo
        title={post.title}
        description={post.description || post.excerpt}
        canonical={canonical}
        type="article"
        image={post.image}
        jsonLd={[
          getBlogPostingSchema(post),
          getWebPageSchema({
            name: post.title,
            description: post.description || post.excerpt,
            pathname: post.path,
            breadcrumbs
          })
        ]}
      />

      <article id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="section-title">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              <span>By {post.author || 'guru'}</span>
              <span>{formatHumanDate(post.date)}</span>
              {(post.categories || []).map((category) => (
                <Link
                  key={`${post.slug}-${category.slug}`}
                  href={`/category/${category.slug}/`}
                  className="focus-ring rounded-full bg-sky-100 px-3 py-1 text-[10px] text-sky-700 dark:bg-sky-950 dark:text-sky-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div
              className="prose-content mt-8 max-w-none"
              dangerouslySetInnerHTML={{
                __html: post.contentHtml
              }}
            />

            <section className="panel mt-10 rounded-3xl p-6" aria-labelledby="share-title">
              <h2 id="share-title" className="font-display text-2xl font-semibold">
                Share this AI marketing article
              </h2>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  className="focus-ring rounded-full border border-sky-300 px-4 py-2 hover:border-sky-500"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on LinkedIn
                </a>
                <a
                  className="focus-ring rounded-full border border-sky-300 px-4 py-2 hover:border-sky-500"
                  href={`https://x.com/intent/post?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on X
                </a>
                <a
                  className="focus-ring rounded-full border border-sky-300 px-4 py-2 hover:border-sky-500"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on Facebook
                </a>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="related-title">
              <h2 id="related-title" className="font-display text-3xl font-semibold">
                Related articles and podcast resources
              </h2>
              <p className="mt-3 text-muted">
                Continue learning with related posts and tune into the Navigating AI with Apex Blue podcast.
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.path} post={relatedPost} />
                ))}
              </div>
              <Link
                href="/podcast/"
                className="focus-ring mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Listen to the Apex Blue AI podcast
              </Link>
            </section>
          </div>

          <TableOfContents items={post.toc} />
        </div>
      </article>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: getAllPostPaths(),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostDataByPath(params);

  return {
    props: {
      post,
      relatedPosts: getRelatedPosts(post.path, 3)
    }
  };
}
