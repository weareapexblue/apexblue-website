import Link from 'next/link';
import Seo from '@/components/Seo';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import BlogCard from '@/components/blog/BlogCard';
import ContactForm from '@/components/forms/ContactForm';
import { CHARACTERS, OBJECTIVE_STATEMENT, TIMELINE } from '@/data/site';
import { getSortedPostsData } from '@/lib/posts';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function HomePage({ highlightPosts }) {
  const canonical = getCanonical('/');
  const description =
    'Apex Blue is a Maryland AI marketing agency delivering artificial intelligence development, fractional C-suite leadership, Lyric, Nova, Stryker, and Pulse podcast insights, and custom GPTs.';

  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    }
  ];

  return (
    <>
      <Seo
        title="Apex Blue: AI Development & Marketing Agency"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'Apex Blue: AI Development & Marketing Agency',
            description,
            pathname: '/',
            breadcrumbs
          })
        ]}
      />

      <div id="main-content">
        <Hero />

        <section className="container-shell py-16" aria-labelledby="welcome-title">
          <p className="section-kicker">Welcome</p>
          <h2 id="welcome-title" className="section-title mt-2">
            Welcome to the future of business.
          </h2>
          <p className="mt-4 max-w-4xl text-lg text-muted">
            Apex Blue harnesses artificial intelligence to help brands accelerate growth and streamline operations. Our
            fractional C-suite characters power practical strategy through our podcast and custom AI tools.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHARACTERS.map((character) => (
              <article key={character.name} className="panel rounded-2xl p-5">
                <h3 className="font-display text-2xl font-semibold">
                  <Link href="/podcast/" className="focus-ring text-sky-700 hover:text-sky-500 dark:text-sky-300">
                    {character.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-muted">{character.title}</p>
                <p className="mt-3 text-sm text-muted">{character.short}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-shell py-4" aria-labelledby="timeline-title">
          <p className="section-kicker">Evolution</p>
          <h2 id="timeline-title" className="section-title mt-2">
            Apex Blue timeline
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            A concise view of how Apex Blue evolved from productivity experiments into a full AI marketing agency with
            fractional C-suite services.
          </p>
          <div className="mt-8">
            <Timeline items={TIMELINE} />
          </div>
        </section>

        <section className="container-shell py-16" aria-labelledby="gpt-teaser-title">
          <div className="panel rounded-3xl p-8">
            <p className="section-kicker">GPT Library</p>
            <h2 id="gpt-teaser-title" className="section-title mt-2">
              Curated GPT tools for marketing, strategy, and technical execution
            </h2>
            <p className="mt-4 max-w-3xl text-muted">
              Apex Blue offers custom GPT models for content generation, marketing analysis, technical problem solving,
              and strategic planning. Each model is tuned for action-ready output, not abstract advice.
            </p>
            <Link
              href="/gpts/"
              className="focus-ring mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Browse Apex Blue custom GPTs
            </Link>
          </div>
        </section>

        <section className="container-shell py-4" aria-labelledby="objective-title">
          <article className="panel rounded-3xl border-l-4 border-sky-500 p-8">
            <h2 id="objective-title" className="section-title">
              Objective
            </h2>
            <p className="mt-4 text-lg font-semibold text-sky-800 dark:text-sky-100">{OBJECTIVE_STATEMENT}</p>
            <p className="mt-4 text-muted">
              Apex Blue solutions reduce manual overhead, expose strategic blind spots, and convert noisy data into
              practical decisions. The result is faster execution, better budget allocation, and scalable growth.
            </p>
          </article>
        </section>

        <section className="container-shell py-16" aria-labelledby="movement-title">
          <div className="panel rounded-3xl bg-gradient-to-r from-sky-700 to-cyan-600 p-8 text-white">
            <h2 id="movement-title" className="font-display text-3xl font-semibold">
              Become part of the movement
            </h2>
            <p className="mt-3 max-w-3xl text-sky-100">
              Join founders, operators, and marketers who are replacing repetitive tasks with AI systems that produce
              measurable outcomes.
            </p>
            <Link
              href="/#contact"
              className="focus-ring mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-sky-900 hover:bg-sky-50"
            >
              Contact Apex Blue
            </Link>
          </div>
        </section>

        <section className="container-shell py-8" aria-labelledby="blog-highlights-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Blog Highlights</p>
              <h2 id="blog-highlights-title" className="section-title mt-2">
                Recent AI marketing and fractional C-suite insights
              </h2>
            </div>
            <Link
              href="/blog/"
              className="focus-ring rounded-full border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:border-sky-500 dark:border-sky-700 dark:text-sky-200"
            >
              View all articles
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {highlightPosts.map((post) => (
              <BlogCard key={post.path} post={post} />
            ))}
          </div>
        </section>

        <section id="contact" className="container-shell py-16" aria-labelledby="contact-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 id="contact-title" className="section-title mt-2">
                Start your AI marketing and development roadmap
              </h2>
              <p className="mt-4 text-muted">
                Tell us about your goals. We will suggest the fastest path to meaningful wins across strategy,
                technology, and growth execution.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}

export function getStaticProps() {
  const posts = getSortedPostsData();

  return {
    props: {
      highlightPosts: posts.slice(0, 3)
    }
  };
}
