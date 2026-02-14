import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import { getCanonical } from '@/lib/schema';
import { getAdminSession } from '@/lib/adminAuth';

function sanitizeNextPath(value) {
  if (typeof value !== 'string') return '/admin/';
  return value.startsWith('/') ? value : '/admin/';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('guru@apex.blue');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const canonical = getCanonical('/admin/login/');
  const nextPath = sanitizeNextPath(router.query.next);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/admin/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Login failed.');
      }

      setStatus('success');
      await router.push(nextPath);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Login failed.');
    }
  }

  return (
    <>
      <Seo
        title="Apex Blue Admin Login"
        description="Secure admin login for Apex Blue submissions dashboard."
        canonical={canonical}
      />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <section className="container-shell py-16">
        <div className="mx-auto max-w-lg panel rounded-3xl p-8">
          <h1 className="section-title text-3xl">Apex Blue Admin</h1>
          <p className="mt-3 text-sm text-muted">Sign in to view website contact and newsletter submissions.</p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} aria-label="Admin login form">
            <div className="grid gap-2">
              <label htmlFor="admin-username" className="text-sm font-semibold">
                Username
              </label>
              <input
                id="admin-username"
                type="email"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="admin-password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="focus-ring rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-70"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign in to Admin'}
            </button>

            {message ? (
              <p role="status" className="text-sm text-rose-700 dark:text-rose-400">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const session = getAdminSession(req);
  if (session) {
    const nextPath = sanitizeNextPath(query.next);
    return {
      redirect: {
        destination: nextPath,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
