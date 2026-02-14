import slugify from 'slugify';

export function toSlug(value) {
  return slugify(String(value || ''), {
    lower: true,
    strict: true,
    trim: true
  });
}

export function formatHumanDate(dateInput) {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function truncate(text, length = 160) {
  const input = String(text || '').trim();
  if (input.length <= length) {
    return input;
  }
  return `${input.slice(0, length - 1).trimEnd()}...`;
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href
    }))
  };
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
