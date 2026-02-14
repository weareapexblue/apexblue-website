/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://apex.blue';

const staticRoutes = [
  '/',
  '/information/',
  '/blog/',
  '/gpts/',
  '/podcast/',
  '/describe-artificial-intelligence/',
  '/ai-powered-fractional-c-suite/',
  '/contact/',
  '/search/'
];

function getPosts() {
  const postsDir = path.join(process.cwd(), 'posts');
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const year = data.year || String(data.date).slice(0, 4);
      const month = data.month || String(data.date).slice(5, 7);
      const slug = data.slug;

      return {
        path: `/${year}/${month}/${slug}/`,
        lastmod: data.updated || data.date
      };
    });
}

function getEpisodes() {
  const podcastDataPath = path.join(process.cwd(), 'data', 'podcast.js');
  if (!fs.existsSync(podcastDataPath)) {
    return [];
  }

  // Parse simple slug declarations directly from the podcast data module.
  const rawData = fs.readFileSync(podcastDataPath, 'utf8');
  const slugMatches = [...rawData.matchAll(/slug:\s*'([^']+)'/g)];

  return slugMatches.map((match) => ({
    path: `/episodes/${match[1]}/`,
    lastmod: new Date().toISOString().slice(0, 10)
  }));
}

function getAnchors() {
  const anchorsDir = path.join(process.cwd(), 'anchors');
  if (!fs.existsSync(anchorsDir)) {
    return [];
  }

  return fs
    .readdirSync(anchorsDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(anchorsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slug = data.slug;

      return {
        path: `/${slug}/`,
        lastmod: data.updated || data.date
      };
    });
}

function createSitemapXml(urlEntries) {
  const urls = urlEntries
    .map(
      (entry) => `  <url>\n    <loc>${SITE_URL}${entry.path}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function createRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

function writeFileSafe(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
}

function main() {
  const today = new Date().toISOString().slice(0, 10);

  const entries = [
    ...staticRoutes.map((route) => ({
      path: route,
      lastmod: today
    })),
    ...getPosts(),
    ...getAnchors(),
    ...getEpisodes()
  ];

  const uniqueEntries = entries.filter(
    (entry, index, allEntries) =>
      allEntries.findIndex((candidate) => candidate.path === entry.path) === index
  );

  const sitemap = createSitemapXml(uniqueEntries);
  const robots = createRobotsTxt();

  writeFileSafe(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  writeFileSafe(path.join(process.cwd(), 'public', 'robots.txt'), robots);

  console.log(`Generated sitemap.xml and robots.txt with ${uniqueEntries.length} URLs`);
}

main();
