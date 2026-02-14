import Seo from '@/components/Seo';
import ContactForm from '@/components/forms/ContactForm';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/data/site';
import { getCanonical, getWebPageSchema } from '@/lib/schema';

export default function ContactPage() {
  const canonical = getCanonical('/contact/');
  const phoneHref = CONTACT_PHONE.replace(/[^\d+]/g, '');
  const description =
    'Contact Apex Blue for AI marketing agency support, artificial intelligence development, and fractional C-suite implementation for your startup or business.';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact/' }
  ];

  return (
    <>
      <Seo
        title="Contact Apex Blue AI Marketing Agency"
        description={description}
        canonical={canonical}
        jsonLd={[
          getWebPageSchema({
            name: 'Contact Apex Blue AI Marketing Agency',
            description,
            pathname: '/contact/',
            breadcrumbs
          })
        ]}
      />

      <section id="main-content" className="container-shell py-16">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="section-title">Contact Apex Blue</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Share your objectives and constraints. We can map a practical AI roadmap across development, marketing, and
          fractional executive strategy.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <article className="panel rounded-3xl p-6">
            <h2 className="font-display text-2xl font-semibold">Direct contact</h2>
            <p className="mt-4 text-sm text-muted">
              Email:{' '}
              <a className="focus-ring text-sky-700 hover:text-sky-900 dark:text-sky-300" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">
              Phone:{' '}
              <a className="focus-ring text-sky-700 hover:text-sky-900 dark:text-sky-300" href={`tel:${phoneHref}`}>
                {CONTACT_PHONE}
              </a>
            </p>
          </article>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
