/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const PLAUSIBLE_BASE_URL = 'https://plausible.io/api/v1';

function formatDate(inputDate) {
  return inputDate.toISOString().slice(0, 10);
}

function getPreviousMonthRange(today = new Date()) {
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1));
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));

  return {
    start,
    end,
    slug: `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, '0')}`
  };
}

async function fetchJson(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Plausible API request failed (${response.status}): ${text}`);
  }

  return response.json();
}

function writeReport(fileName, contents) {
  const reportsDir = path.join(process.cwd(), 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const filePath = path.join(reportsDir, fileName);
  fs.writeFileSync(filePath, contents, 'utf8');
  return filePath;
}

async function generateReport() {
  const token = process.env.PLAUSIBLE_API_KEY;
  const siteId = process.env.PLAUSIBLE_SITE_ID || 'apex.blue';

  const { start, end, slug } = getPreviousMonthRange();
  const dateRange = `${formatDate(start)},${formatDate(end)}`;

  if (!token) {
    const placeholderReport = `# Apex Blue Monthly Analytics Report (${slug})\n\nPlausible credentials are not configured.\n\nSet these environment variables and run \`npm run analytics:report\` again:\n\n- \`PLAUSIBLE_API_KEY\`\n- \`PLAUSIBLE_SITE_ID\` (optional, defaults to \`apex.blue\`)\n`;

    const filePath = writeReport(`analytics-${slug}.md`, placeholderReport);
    console.log(`Created placeholder report at ${filePath}`);
    return;
  }

  const aggregateUrl = `${PLAUSIBLE_BASE_URL}/stats/aggregate?site_id=${encodeURIComponent(
    siteId
  )}&period=custom&date=${dateRange}&metrics=visitors,pageviews,visit_duration,bounce_rate`;

  const breakdownUrl = `${PLAUSIBLE_BASE_URL}/stats/breakdown?site_id=${encodeURIComponent(
    siteId
  )}&period=custom&date=${dateRange}&property=event:page&limit=10`;

  const [aggregate, breakdown] = await Promise.all([
    fetchJson(aggregateUrl, token),
    fetchJson(breakdownUrl, token)
  ]);

  const visitors = aggregate?.results?.visitors?.value ?? 0;
  const pageviews = aggregate?.results?.pageviews?.value ?? 0;
  const avgVisitDurationSeconds = aggregate?.results?.visit_duration?.value ?? 0;
  const bounceRate = aggregate?.results?.bounce_rate?.value ?? 0;

  const topPages = (breakdown?.results || []).slice(0, 10);

  const report = [
    `# Apex Blue Monthly Analytics Report (${slug})`,
    '',
    `Date range: ${formatDate(start)} to ${formatDate(end)}`,
    '',
    '## Summary metrics',
    '',
    `- Visitors: ${visitors}`,
    `- Pageviews: ${pageviews}`,
    `- Average visit duration (seconds): ${Math.round(avgVisitDurationSeconds)}`,
    `- Bounce rate: ${(bounceRate * 100).toFixed(2)}%`,
    '',
    '## Top pages',
    '',
    '| Page | Pageviews |',
    '| --- | ---: |',
    ...topPages.map((entry) => `| ${entry.page || '/'} | ${entry.pageviews || 0} |`),
    '',
    '## Notes',
    '',
    '- Review top landing pages for conversion quality and CTA alignment.',
    '- Compare performance changes after publishing new AI podcast episodes and GPT updates.',
    '- Update SEO priorities on pages with high views but low engagement.'
  ].join('\n');

  const filePath = writeReport(`analytics-${slug}.md`, report);
  console.log(`Generated analytics report at ${filePath}`);
}

generateReport().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
