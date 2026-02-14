import Link from 'next/link';
import Seo from '@/components/Seo';
import { getCanonical } from '@/lib/schema';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Apex Blue"
        description="The page you requested is not available. Explore Apex Blue AI marketing resources and fractional C-suite services."
        canonical={getCanonical('/404/')}
      />
      <section id="main-content" className="container-shell py-24 text-center">
        <h1 className="section-title">Page not found</h1>
        <p className="mt-4 text-muted">The requested page does not exist or has moved.</p>
        <Link
          href="/"
          className="focus-ring mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Return to Apex Blue homepage
        </Link>
      </section>
    </>
  );
}
