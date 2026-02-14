import { useState } from 'react';
import { submitForm } from '@/lib/forms';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter an email address for newsletter updates.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');
      await submitForm('newsletter', {
        email,
        source: 'apex-blue-footer-newsletter'
      });
      setStatus('success');
      setMessage('Thanks. You are now subscribed for GPT, blog, and podcast updates.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2" aria-label="Newsletter signup form">
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-sky-900 dark:text-sky-100">
        Get new episodes, GPT releases, and AI marketing insights.
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="focus-ring w-full rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm dark:border-sky-700 dark:bg-sky-950/60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="focus-ring rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-70"
        >
          {status === 'loading' ? 'Submitting...' : 'Subscribe'}
        </button>
      </div>
      {message ? (
        <p
          className={`text-xs ${
            status === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
