import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-sky-200/70 py-20 dark:border-sky-900"
      aria-labelledby="home-hero-title"
    >
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'linear-gradient(120deg, rgba(5, 11, 29, 0.94) 0%, rgba(12, 29, 76, 0.92) 45%, rgba(14, 123, 245, 0.72) 100%)'
        }}
        aria-hidden="true"
      />
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-6 text-white">
          <p className="section-kicker text-sky-200">Launched in 2017 - Maryland</p>
          <h1 id="home-hero-title" className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Apex Blue: Innovative A.I. Development &amp; Marketing Agency
          </h1>
          <p className="max-w-2xl text-lg text-sky-100">
            Apex Blue builds artificial intelligence systems for growth, productivity, and execution. We combine
            development, marketing strategy, and fractional leadership tools to help companies move from ideas to
            revenue faster.
          </p>
          <Link
            href="/gpts/"
            className="focus-ring inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-950 transition hover:bg-cyan-200"
          >
            Explore our GPT Library
          </Link>
        </div>

        <div className="panel rounded-3xl p-6 text-white">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">AI Marketing Agency</p>
          <p className="text-xl font-semibold">Fractional C-suite + Custom GPTs + Practical execution plans.</p>
          <ul className="mt-4 space-y-2 text-sm text-sky-100">
            <li>Artificial intelligence development for growth teams</li>
            <li>AI-CIO, AI-CMO, and AI-CTO strategic support</li>
            <li>Weekly educational podcast and actionable templates</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
