import Link from 'next/link';
import Seo from '@/components/Seo';
import FractionalInquiryForm from '@/components/forms/FractionalInquiryForm';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { AI_C_SUITE, AI_C_SUITE_LOCK_SUMMARY, CHARACTERS } from '@/data/site';
import { FRACTIONAL_GPT_LINKS } from '@/data/gpts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

const roles = [
  {
    id: 'ai-cio',
    title: 'AI-CIO - Chief Investment Officer',
    description:
      'Capital matchmaking and AI-generated valuations connect startups with aligned investors through data-driven discovery, outreach, and strategic pitch refinement.',
    capabilities: [
      'Dry powder discovery',
      'Investor analysis',
      'Personalized outreach',
      'Booking VC meetings',
      'Follow-ups and momentum sequences',
      'Six valuation methods',
      'Efficiency audit',
      'Affordability audit'
    ],
    href: FRACTIONAL_GPT_LINKS.aiCio
  },
  {
    id: 'ai-cmo',
    title: 'AI-CMO - Chief Marketing Officer',
    description:
      'An always-on marketing specialist that structures campaigns, automates growth loops, and keeps startup budgets focused on outcomes instead of guesswork.',
    capabilities: [
      'Strategy analysis',
      'Campaign structure',
      'Deployment workflows',
      'Automated growth loops',
      'AI-optimized ads',
      'On-site AI assistance',
      'Efficiency audit',
      'Affordability audit'
    ],
    href: FRACTIONAL_GPT_LINKS.aiCmo
  },
  {
    id: 'ai-cto',
    title: 'AI-CTO - Chief Technology Officer',
    description:
      'Optimizes technical stacks, cost structures, and automation systems so startups scale without compounding engineering debt or unnecessary spend.',
    capabilities: [
      'AI tech stack planning',
      'Cost reduction plan',
      'Scalable architecture design',
      'Automated optimizations',
      'Efficiency audit',
      'Affordability audit'
    ],
    href: FRACTIONAL_GPT_LINKS.aiCto
  }
];

export default function FractionalPage() {
  const canonical = getCanonical('/ai-powered-fractional-c-suite/');
  const description =
    'A.I. powered fractional C-suite services for startups with AI-CIO, AI-CMO, and AI-CTO support, investor matchmaking, marketing optimization, and stack planning.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Fractional C-Suite', href: '/ai-powered-fractional-c-suite/' }
  ];

  return (
    <>
      <Seo
        title="A.I. Powered Fractional C-Suite for Startups"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'A.I. Powered Fractional C-Suite for Startups',
            description,
            pathname: '/ai-powered-fractional-c-suite/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="panel overflow-hidden rounded-3xl border border-sky-200 dark:border-sky-900">
          <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-700 p-8 text-white">
            <p className="section-kicker text-sky-200">Fractional Leadership</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">A.I. Powered Fractional C-Suite for Startups</h1>
            <p className="mt-4 max-w-4xl text-sky-100">
              Mismanagement and lack of capital are difficult to overcome. Providing affordable, efficient CIO, CMO
              &amp; CTO services improves startup success rates.
            </p>
            <p className="mt-3 max-w-4xl text-sky-100">
              Apex Blue gives early-stage teams access to strategic executive capabilities through AI-driven tools at a
              fraction of traditional cost.
            </p>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="roles-title">
          <h2 id="roles-title" className="section-title">
            AI-CIO, AI-CMO, and AI-CTO role capabilities
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {roles.map((role) => (
              <article key={role.id} className="panel rounded-3xl p-5">
                <h3 className="font-display text-2xl font-semibold">{role.title}</h3>
                <p className="mt-3 text-sm text-muted">{role.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted">
                  {role.capabilities.map((capability) => (
                    <li key={`${role.id}-${capability}`}>- {capability}</li>
                  ))}
                </ul>
                <a
                  href={role.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-5 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  {`Chat with ${role.title.split(' - ')[0]}`}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="fractional-characters-title">
          <h2 id="fractional-characters-title" className="section-title">
            Podcast characters that power the fractional model
          </h2>
          <p className="mt-3 max-w-4xl text-muted">
            Lyric, Nova, Stryker, and Pulse are the operating voices behind the Navigating AI with Apex Blue podcast.
            Their frameworks shape how each fractional workflow is designed, deployed, and measured.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CHARACTERS.map((character) => (
              <article key={`fractional-${character.name}`} className="panel rounded-2xl p-5">
                <h3 className="font-display text-2xl font-semibold text-sky-800 dark:text-sky-100">{character.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{character.title}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">
                  {character.archetype}
                </p>
                <p className="mt-1 text-sm text-muted">{character.coreIdentity}</p>
                <p className="mt-3 text-sm font-semibold text-sky-700 dark:text-sky-300">{character.mission}</p>
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {character.voiceStyle.map((item) => (
                    <li key={`${character.name}-voice-${item}`}>- {item}</li>
                  ))}
                </ul>
                <Link
                  href="/podcast/"
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-800"
                >
                  Hear {character.name} on the podcast
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="official-c-suite-title">
          <h2 id="official-c-suite-title" className="section-title">
            Official Apex Blue AI C-Suite
          </h2>
          <p className="mt-3 max-w-4xl text-muted">
            Apex Blue&apos;s locked leadership architecture includes 10 AI executive roles spanning strategy, operations,
            infrastructure, finance, compliance, and brand execution.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {AI_C_SUITE.map((character) => (
              <article key={`official-${character.name}`} className="panel rounded-2xl p-5">
                <h3 className="font-display text-2xl font-semibold text-sky-800 dark:text-sky-100">{character.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{character.title}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-300">
                  {character.archetype}
                </p>
                <p className="mt-3 text-sm text-muted">{character.short}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <article className="panel rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Podcast Roundtable</p>
              <p className="mt-2 text-sm text-muted">{AI_C_SUITE_LOCK_SUMMARY.corePodcastRoundtable.join(' | ')}</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Strategic Authority</p>
              <p className="mt-2 text-sm text-muted">{AI_C_SUITE_LOCK_SUMMARY.strategicAuthority.join(', ')}</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Operational Backbone</p>
              <p className="mt-2 text-sm text-muted">{AI_C_SUITE_LOCK_SUMMARY.operationalBackbone.join(', ')}</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Risk Shield</p>
              <p className="mt-2 text-sm text-muted">{AI_C_SUITE_LOCK_SUMMARY.riskShield.join(', ')}</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Brand Narrative</p>
              <p className="mt-2 text-sm text-muted">{AI_C_SUITE_LOCK_SUMMARY.brandNarrative.join(', ')}</p>
            </article>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="why-title">
          <h2 id="why-title" className="section-title">
            Why startups choose fractional C-suite services
          </h2>
          <p className="mt-3 max-w-4xl text-muted">
            Startup failure is often tied to avoidable execution gaps. AI-powered executive guidance helps teams focus
            on high-signal decisions, preserve runway, and prioritize revenue-driving work.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="panel rounded-2xl p-5">
              <p className="text-3xl font-bold text-sky-700 dark:text-sky-300">~90%</p>
              <p className="mt-2 text-sm text-muted">of startups fail without strong strategic and operational discipline.</p>
            </article>
            <article className="panel rounded-2xl p-5">
              <p className="text-3xl font-bold text-sky-700 dark:text-sky-300">~40%</p>
              <p className="mt-2 text-sm text-muted">of founder time is lost on non-revenue tasks before systems are in place.</p>
            </article>
            <article className="panel rounded-2xl p-5">
              <p className="text-3xl font-bold text-sky-700 dark:text-sky-300">Data-first</p>
              <p className="mt-2 text-sm text-muted">planning improves capital efficiency and reduces expensive trial-and-error cycles.</p>
            </article>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="fractional-contact-title">
          <h2 id="fractional-contact-title" className="section-title">
            Request startup support
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Share your startup context and we will map where AI-CIO, AI-CMO, or AI-CTO support can unlock immediate
            progress.
          </p>
          <div className="mt-6">
            <FractionalInquiryForm />
          </div>
        </section>
      </section>
    </>
  );
}
