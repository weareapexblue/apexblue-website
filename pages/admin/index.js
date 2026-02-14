import { neon } from '@neondatabase/serverless';
import Head from 'next/head';
import Seo from '@/components/Seo';
import { getCanonical } from '@/lib/schema';
import { getAdminSession } from '@/lib/adminAuth';

const FILTERS = ['all', 'contact', 'fractional', 'newsletter'];

function formatAdminDate(dateValue) {
  const date = new Date(dateValue);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function getEnvBySuffix(suffix) {
  const match = Object.entries(process.env).find(([key, value]) => key.endsWith(`_${suffix}`) && value);
  return match?.[1] || '';
}

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    getEnvBySuffix('DATABASE_URL') ||
    getEnvBySuffix('POSTGRES_URL') ||
    getEnvBySuffix('POSTGRES_PRISMA_URL') ||
    getEnvBySuffix('POSTGRES_URL_NON_POOLING') ||
    ''
  );
}

function parsePayload(payload) {
  if (!payload) return {};
  if (typeof payload === 'object') return payload;
  try {
    return JSON.parse(payload);
  } catch (error) {
    return {};
  }
}

export default function AdminDashboardPage({ submissions, selectedType, errorMessage }) {
  const canonical = getCanonical('/admin/');

  async function handleLogout() {
    await fetch('/api/admin/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    });

    window.location.href = '/admin/login/';
  }

  return (
    <>
      <Seo
        title="Apex Blue Admin Submissions"
        description="Admin dashboard for Apex Blue website form submissions."
        canonical={canonical}
      />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <section className="container-shell py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="section-title">Form Submissions</h1>
            <p className="mt-2 text-sm text-muted">Review contact, fractional C-suite, and newsletter form entries.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="focus-ring rounded-xl border border-sky-300 px-4 py-2 text-sm font-semibold hover:bg-sky-50 dark:border-sky-700 dark:hover:bg-sky-900/40"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const active = selectedType === filter;
            const href = filter === 'all' ? '/admin/' : `/admin/?type=${filter}`;
            return (
              <a
                key={filter}
                href={href}
                className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                  active
                    ? 'bg-sky-600 text-white'
                    : 'border border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-sky-900/40'
                }`}
              >
                {filter}
              </a>
            );
          })}
        </div>

        {errorMessage ? (
          <p className="mt-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-600/40 dark:bg-rose-900/30 dark:text-rose-300">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 grid gap-4">
          {submissions.map((submission) => {
            const payload = parsePayload(submission.payload);
            const entries = Object.entries(payload);

            return (
              <article key={submission.id} className="panel rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      {submission.form_type}
                    </span>
                    <span className="text-xs text-muted">#{submission.id}</span>
                  </div>
                  <time className="text-xs text-muted">{formatAdminDate(submission.created_at)}</time>
                </div>

                <div className="mt-3 grid gap-1 text-sm">
                  {submission.email ? <p><strong>Email:</strong> {submission.email}</p> : null}
                  {submission.subject ? <p><strong>Subject:</strong> {submission.subject}</p> : null}
                  {submission.source ? <p><strong>Source:</strong> {submission.source}</p> : null}
                </div>

                {entries.length ? (
                  <dl className="mt-4 grid gap-2 rounded-xl border border-sky-200 bg-white/70 p-4 text-sm dark:border-sky-800 dark:bg-sky-950/30">
                    {entries.map(([key, value]) => (
                      <div key={`${submission.id}-${key}`} className="grid gap-1">
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </dt>
                        <dd className="leading-6">{String(value || '-')}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </article>
            );
          })}
        </div>

        {!errorMessage && submissions.length === 0 ? (
          <p className="mt-6 rounded-xl border border-sky-200 bg-white/70 px-4 py-3 text-sm text-muted dark:border-sky-800 dark:bg-sky-950/30">
            No submissions found for this filter.
          </p>
        ) : null}
      </section>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const session = getAdminSession(req);
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login/?next=/admin/',
        permanent: false
      }
    };
  }

  const requestedType = typeof query.type === 'string' ? query.type : 'all';
  const selectedType = FILTERS.includes(requestedType) ? requestedType : 'all';
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return {
      props: {
        submissions: [],
        selectedType,
        errorMessage: 'Database is not configured in this environment.'
      }
    };
  }

  try {
    const sql = neon(databaseUrl);
    let rows = [];

    if (selectedType === 'all') {
      rows = await sql`
        SELECT id, form_type, source, name, email, subject, payload, created_at
        FROM form_submissions
        ORDER BY created_at DESC
        LIMIT 200
      `;
    } else {
      rows = await sql`
        SELECT id, form_type, source, name, email, subject, payload, created_at
        FROM form_submissions
        WHERE form_type = ${selectedType}
        ORDER BY created_at DESC
        LIMIT 200
      `;
    }

    return {
      props: {
        submissions: rows,
        selectedType,
        errorMessage: ''
      }
    };
  } catch (error) {
    return {
      props: {
        submissions: [],
        selectedType,
        errorMessage: 'Unable to load submissions. Check database access and try again.'
      }
    };
  }
}
