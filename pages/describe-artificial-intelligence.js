import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

const aiTypes = [
  {
    name: 'Reactive Machines',
    description: 'Systems that respond to inputs in real time but do not store memory from past actions.'
  },
  {
    name: 'Limited Memory',
    description: 'Models that use historical data to improve predictions, common in most modern AI applications.'
  },
  {
    name: 'Theory of Mind',
    description: 'An emerging concept where AI understands human emotions and intent at a deeper level.'
  },
  {
    name: 'Self-Aware AI',
    description: 'A speculative future state where AI possesses consciousness and independent self-modeling.'
  },
  {
    name: 'Autonomous AI',
    description: 'Goal-driven systems that can plan and execute tasks with minimal human intervention.'
  }
];

export default function DescribeAiPage() {
  const canonical = getCanonical('/describe-artificial-intelligence/');
  const description =
    'Learn what artificial intelligence is, including types of AI, machine learning, natural language processing, and core ethical considerations around privacy and bias.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Describe Artificial Intelligence', href: '/describe-artificial-intelligence/' }
  ];

  return (
    <>
      <Seo
        title="What Is Artificial Intelligence? Types & Ethics"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'What Is Artificial Intelligence? Types & Ethics',
            description,
            pathname: '/describe-artificial-intelligence/',
            breadcrumbs
          })
        ]}
      />

      <article id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">What Is Artificial Intelligence? Types, Technologies &amp; Ethics</h1>
        <p className="mt-4 max-w-4xl text-muted">
          Artificial intelligence (AI) describes machines performing tasks that usually require human intelligence.
          Today AI is used across marketing, finance, healthcare, logistics, customer service, and software
          development.
        </p>

        <section className="mt-10" aria-labelledby="what-is-ai-title">
          <h2 id="what-is-ai-title" className="font-display text-3xl font-semibold">
            What is AI?
          </h2>
          <p className="mt-3 text-muted">
            AI combines algorithms and data to solve problems, recognize patterns, make predictions, and generate
            language. Core technologies include natural language processing, robotics, expert systems, and neural
            networks.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="types-title">
          <h2 id="types-title" className="font-display text-3xl font-semibold">
            Types of AI
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {aiTypes.map((type) => (
              <article key={type.name} className="panel rounded-2xl p-5">
                <h3 className="font-display text-2xl font-semibold">{type.name}</h3>
                <p className="mt-2 text-sm text-muted">{type.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="brain-title">
          <h2 id="brain-title" className="font-display text-3xl font-semibold">
            The "Brain" of an AI system
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <article className="panel rounded-2xl p-4">
              <h3 className="font-display text-xl font-semibold">Machine learning</h3>
              <p className="mt-2 text-sm text-muted">Learns patterns from data to improve decisions over time.</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <h3 className="font-display text-xl font-semibold">Neural networks</h3>
              <p className="mt-2 text-sm text-muted">Layered models that detect complex relationships in large datasets.</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <h3 className="font-display text-xl font-semibold">Sensors & inputs</h3>
              <p className="mt-2 text-sm text-muted">Collect text, image, audio, or physical-world signals.</p>
            </article>
            <article className="panel rounded-2xl p-4">
              <h3 className="font-display text-xl font-semibold">NLP & robotics</h3>
              <p className="mt-2 text-sm text-muted">Translate intent into action through language or automation.</p>
            </article>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="ml-title">
          <h2 id="ml-title" className="font-display text-3xl font-semibold">
            Machine Learning
          </h2>
          <p className="mt-3 text-muted">
            Machine learning trains models on historical data and validates them against new examples. Benefits include
            speed, personalization, and predictive power. Risks include bias from unrepresentative data and privacy
            issues if data governance is weak.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="nlp-title">
          <h2 id="nlp-title" className="font-display text-3xl font-semibold">
            Natural Language Processing (NLP)
          </h2>
          <p className="mt-3 text-muted">
            NLP enables computers to work with human language. Common steps include tokenization, named entity
            recognition, and semantic interpretation. NLP powers support assistants, search, summarization, and
            sentiment analysis.
          </p>
        </section>

        <section className="mt-10 panel rounded-3xl p-6" aria-labelledby="ethics-title">
          <h2 id="ethics-title" className="font-display text-3xl font-semibold">
            Ethics: privacy, bias, and workforce impact
          </h2>
          <p className="mt-3 text-muted">
            Responsible AI requires transparent data use, bias testing, and human oversight. Organizations should define
            governance standards early to reduce harm and preserve trust while adopting automation.
          </p>
        </section>
      </article>
    </>
  );
}
