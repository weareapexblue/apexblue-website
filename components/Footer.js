import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '@/data/site';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { AppleIcon, LinkedInIcon, SpotifyIcon, YoutubeIcon } from '@/components/icons';

function SocialIcon({ label }) {
  if (label === 'LinkedIn') {
    return <LinkedInIcon />;
  }
  if (label === 'YouTube') {
    return <YoutubeIcon />;
  }
  if (label === 'Spotify') {
    return <SpotifyIcon />;
  }
  return <AppleIcon />;
}

export default function Footer() {
  const phoneHref = CONTACT_PHONE.replace(/[^\d+]/g, '');

  return (
    <footer className="mt-16 border-t border-sky-200/80 bg-white/60 py-10 dark:border-sky-900 dark:bg-ink/70">
      <div className="container-shell grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="section-kicker">Apex Blue</p>
          <p className="text-sm text-muted">
            AI marketing agency and artificial intelligence development partner for startups and small businesses.
          </p>
          <p className="text-sm text-muted">
            Email:{' '}
            <a className="focus-ring text-sky-700 hover:text-sky-900 dark:text-sky-300" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-sm text-muted">
            Phone:{' '}
            <a className="focus-ring text-sky-700 hover:text-sky-900 dark:text-sky-300" href={`tel:${phoneHref}`}>
              {CONTACT_PHONE}
            </a>
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="focus-ring hover:text-sky-600" href="/ai-powered-fractional-c-suite/">
                Learn more about our AI-powered Chief Marketing Officer
              </Link>
            </li>
            <li>
              <Link className="focus-ring hover:text-sky-600" href="/gpts/">
                Explore Apex Blue custom GPT library
              </Link>
            </li>
            <li>
              <Link className="focus-ring hover:text-sky-600" href="/podcast/">
                Listen to the Navigating AI with Apex Blue podcast
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            {SOCIAL_LINKS.map((socialLink) => (
              <a
                key={socialLink.name}
                href={socialLink.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow Apex Blue on ${socialLink.name}`}
                className="focus-ring rounded-full border border-sky-200 p-2 text-sky-700 transition hover:border-sky-500 dark:border-sky-700 dark:text-sky-300"
              >
                <SocialIcon label={socialLink.name} />
              </a>
            ))}
          </div>
        </div>

        <NewsletterForm />
      </div>
    </footer>
  );
}
