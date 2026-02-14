import gpts from '@/data/gpts';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

function groupByCategory(items) {
  return items.reduce((groups, item) => {
    const key = item.category;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

export default function GptsPage() {
  const grouped = groupByCategory(gpts);
  const canonical = getCanonical('/gpts/');
  const description =
    'Discover Apex Blue custom GPTs for marketing automation, productivity, investor outreach, analytics, and technical problem solving across startup teams.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'GPT Library', href: '/gpts/' }
  ];

  return (
    <>
      <Seo
        title="Custom GPT Library - Marketing & Analytics"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'Custom GPT Library - Marketing & Analytics',
            description,
            pathname: '/gpts/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <p className="section-kicker">GPT Library</p>
        <h1 className="section-title mt-2">Custom GPT Library - Marketing, Productivity &amp; Analytics</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Apex Blue curates custom GPTs tailored for marketing, productivity, financial analysis, and development. Use
          these tools to move faster, produce stronger output, and standardize execution quality.
        </p>

        <div className="mt-10 space-y-10">
          {Object.entries(grouped).map(([category, models]) => (
            <section key={category} aria-labelledby={category.replace(/\s+/g, '-').toLowerCase()}>
              <h2 id={category.replace(/\s+/g, '-').toLowerCase()} className="font-display text-2xl font-semibold">
                {category}
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {models.map((model) => (
                  <article key={model.name} className="panel rounded-3xl p-5">
                    <h3 className="font-display text-xl font-semibold">{model.name}</h3>
                    <p className="mt-2 text-sm text-muted">{model.description}</p>
                    <ul className="mt-4 space-y-1 text-sm text-muted">
                      {model.useCases.map((useCase) => (
                        <li key={`${model.name}-${useCase}`}>- {useCase}</li>
                      ))}
                    </ul>
                    <a
                      href={model.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${model.name} on OpenAI`}
                      className="focus-ring mt-5 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                    >
                      Open this GPT on OpenAI
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
