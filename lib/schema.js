import { SITE_URL, SITE_NAME } from '@/data/site';
import { buildBreadcrumbSchema } from '@/lib/utils';

export function getCanonical(pathname = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

export function getWebPageSchema({
  name,
  description,
  pathname,
  breadcrumbs = []
}) {
  const canonical = getCanonical(pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    },
    breadcrumb: breadcrumbs.length
      ? buildBreadcrumbSchema(
          breadcrumbs.map((item) => ({
            label: item.label,
            href: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`
          }))
        )
      : undefined
  };
}

export function getBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'guru'
    },
    description: post.description || post.excerpt,
    articleBody: post.articleBody,
    image: [`https://apex.blue${post.image}`],
    mainEntityOfPage: `https://apex.blue${post.path}`,
    publisher: {
      '@type': 'Organization',
      name: 'Apex Blue',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apex.blue/assets/apex-blue-ai-development-marketing-horizontal-logo.webp'
      }
    }
  };
}
