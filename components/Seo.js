import Head from 'next/head';
import { SITE_NAME } from '@/data/site';

export default function Seo({
  title,
  description,
  canonical,
  image = '/assets/apex-blue-ai-marketing-agency-og-image.webp',
  type = 'website',
  jsonLd = []
}) {
  const pageTitle = title || SITE_NAME;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`https://apex.blue${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://apex.blue${image}`} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/assets/apex-blue-ai-marketing-agency-site-icon-32.png" sizes="32x32" />
      <link rel="icon" href="/assets/apex-blue-ai-marketing-agency-site-icon.webp" type="image/webp" />
      <link rel="apple-touch-icon" href="/assets/apex-blue-ai-marketing-agency-site-icon-180.png" />
      {jsonLd
        .filter(Boolean)
        .map((entry, index) => (
          <script
            key={`jsonld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(entry)
            }}
          />
        ))}
    </Head>
  );
}
