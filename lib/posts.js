import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { toSlug, unique } from '@/lib/utils';

const postsDirectory = path.join(process.cwd(), 'posts');

function readPostFile(fileName) {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const year = data.year || String(data.date).slice(0, 4);
  const month = data.month || String(data.date).slice(5, 7);
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
      year,
      month,
      slug,
      categories,
      tags,
      path: `/${year}/${month}/${slug}/`
    }
  };
}

function injectHeadingIds(html) {
  // Generate stable heading ids so deep links and table-of-contents anchors stay in sync.
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

export function getSortedPostsData(options = {}) {
  const { includeContent = false } = options;

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'));

  return fileNames
    .map((fileName) => {
      const { frontmatter, content } = readPostFile(fileName);
      return includeContent ? { ...frontmatter, content } : { ...frontmatter };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostPaths() {
  return getSortedPostsData().map((post) => ({
    params: {
      year: post.year,
      month: post.month,
      slug: post.slug
    }
  }));
}

export async function getPostDataByPath({ year, month, slug }) {
  const posts = getSortedPostsData({ includeContent: true });
  const post = posts.find(
    (item) => item.year === year && item.month === month && item.slug === slug
  );

  if (!post) {
    return null;
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(post.content);

  // Keep rendered HTML and heading metadata separate for a cleaner article template API.
  const contentHtml = injectHeadingIds(processedContent.toString());
  const toc = collectTableOfContents(post.content);

  return {
    ...post,
    contentHtml,
    toc,
    articleBody: post.content.replace(/\s+/g, ' ').trim()
  };
}

export function getAllCategories() {
  const posts = getSortedPostsData();
  const categories = posts.flatMap((post) => post.categories || []);
  const categorySlugs = unique(categories.map((category) => category.slug));

  return categorySlugs.map((slug) => {
    const match = categories.find((item) => item.slug === slug);
    return {
      slug,
      name: match?.name || slug
    };
  });
}

export function getAllTags() {
  const posts = getSortedPostsData();
  const tags = posts.flatMap((post) => post.tags || []);
  const tagSlugs = unique(tags.map((tag) => tag.slug));

  return tagSlugs.map((slug) => {
    const match = tags.find((item) => item.slug === slug);
    return {
      slug,
      name: match?.name || slug
    };
  });
}

export function getPostsByCategory(slug) {
  return getSortedPostsData().filter((post) =>
    (post.categories || []).some((category) => category.slug === slug)
  );
}

export function getPostsByTag(slug) {
  return getSortedPostsData().filter((post) =>
    (post.tags || []).some((tag) => tag.slug === slug)
  );
}

export function paginatePosts(posts, page = 1, pageSize = 6) {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const safePage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    posts: posts.slice(start, end),
    page: safePage,
    pageSize,
    totalPages,
    totalItems: posts.length
  };
}

export function getRelatedPosts(currentPath, limit = 3) {
  const posts = getSortedPostsData();
  const currentPost = posts.find((post) => post.path === currentPath);
  if (!currentPost) {
    return posts.slice(0, limit);
  }

  const categorySlugs = (currentPost.categories || []).map((item) => item.slug);
  const related = posts
    .filter((post) => post.path !== currentPath)
    .map((post) => {
      const overlap = (post.categories || []).filter((category) =>
        categorySlugs.includes(category.slug)
      ).length;

      return {
        ...post,
        overlap
      };
    })
    .sort((a, b) => {
      if (a.overlap === b.overlap) {
        return a.date < b.date ? 1 : -1;
      }
      return b.overlap - a.overlap;
    })
    .slice(0, limit);

  return related;
}
