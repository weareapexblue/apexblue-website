import Link from 'next/link';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import TableOfContents from '@/components/blog/TableOfContents';
import { getCanonical, getWebPageSchema } from '@/lib/schema';
import { formatHumanDate } from '@/lib/utils';

export default function AnchorPageTemplate({ anchor }) {
  const canonical = getCanonical(anchor.path);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Information', href: '/information/#anchor-pages' },
    { label: anchor.title, href: anchor.path }
  ];

  return (
    <>
      <Seo
        title={anchor.title}
        description={anchor.description || anchor.excerpt}
        canonical={canonical}
        type="article"
        image={anchor.image}
        jsonLd={[
          getWebPageSchema({
            name: anchor.title,
            description: anchor.description || anchor.excerpt,
            pathname: anchor.path,
            breadcrumbs
          })
        ]}
      />

      <article id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="section-title">{anchor.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              <span>{formatHumanDate(anchor.date)}</span>
              {(anchor.categories || []).map((category) => (
                <span
                  key={`${anchor.slug}-${category.slug}`}
                  className="rounded-full bg-sky-100 px-3 py-1 text-[10px] text-sky-700 dark:bg-sky-950 dark:text-sky-200"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <div
              className="prose-content mt-8 max-w-none"
              dangerouslySetInnerHTML={{
                __html: anchor.contentHtml
              }}
            />

            <section className="panel mt-10 rounded-3xl p-6" aria-labelledby="anchor-cta-title">
              <h2 id="anchor-cta-title" className="font-display text-2xl font-semibold">
                Put this framework into execution
              </h2>
              <p className="mt-3 text-muted">
                Apply this strategy with Apex Blue consulting, custom GPT workflows, and fractional AI leadership.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact/"
                  className="focus-ring rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Contact Apex Blue
                </Link>
                <Link
                  href="/gpts/"
                  className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
                >
                  Explore GPT Library
                </Link>
              </div>
            </section>
          </div>

          <TableOfContents items={anchor.toc} />
        </div>
      </article>
    </>
  );
}
