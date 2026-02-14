import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { toSlug } from '@/lib/utils';

const anchorsDirectory = path.join(process.cwd(), 'anchors');

function readAnchorFile(fileName) {
  const fullPath = path.join(anchorsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const slug = data.slug || toSlug(data.title);
  const categories = (data.categories || []).map((item) => ({
    name: item,
    slug: toSlug(item)
  }));
  const tags = (data.tags || []).map((item) => ({
    name: item,
    slug: toSlug(item)
  }));

  return {
    fileName,
    content,
    frontmatter: {
      ...data,
      slug,
      categories,
      tags,
      path: `/${slug}/`
    }
  };
}

function injectHeadingIds(html) {
  return html.replace(/<(h[2-4])>(.*?)<\/\1>/g, (match, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    const id = toSlug(text);
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
}

function collectTableOfContents(content) {
  const lines = content.split('\n');
  return lines
    .filter((line) => /^##\s+|^###\s+/.test(line.trim()))
    .map((line) => {
      const level = line.startsWith('###') ? 3 : 2;
      const text = line.replace(/^###?\s+/, '').trim();
      return {
        id: toSlug(text),
        level,
        text
      };
    });
}

export function getSortedAnchorsData(options = {}) {
  const { includeContent = false } = options;

  if (!fs.existsSync(anchorsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(anchorsDirectory)
    .filter((fileName) => fileName.endsWith('.md'));

  return fileNames
    .map((fileName) => {
      const { frontmatter, content } = readAnchorFile(fileName);
      return includeContent ? { ...frontmatter, content } : { ...frontmatter };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllAnchorPaths() {
  return getSortedAnchorsData().map((anchor) => ({
    params: {
      slug: anchor.slug
    }
  }));
}

export async function getAnchorDataBySlug(slug) {
  const anchors = getSortedAnchorsData({ includeContent: true });
  const anchor = anchors.find((item) => item.slug === slug);

  if (!anchor) {
    return null;
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(anchor.content);

  const contentHtml = injectHeadingIds(processedContent.toString());
  const toc = collectTableOfContents(anchor.content);

  return {
    ...anchor,
    contentHtml,
    toc,
    articleBody: anchor.content.replace(/\s+/g, ' ').trim()
  };
}
