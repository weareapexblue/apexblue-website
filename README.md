# Apex Blue Website Rebuild

A complete rebuild of [apex.blue](https://apex.blue) using **Next.js (pages router)** and **Tailwind CSS**.

This project is optimized for performance, accessibility, and SEO while preserving Apex Blue's core content and positioning:

- AI marketing agency services
- Artificial intelligence development
- Fractional C-suite tools (AI-CIO, AI-CMO, AI-CTO)
- Custom GPT library
- Educational blog content
- Navigating AI with Apex Blue podcast

## Stack

- Next.js (pages router)
- React
- Tailwind CSS
- Markdown content pipeline via `gray-matter` + `remark`
- Structured data with Schema.org JSON-LD
- Optional analytics via Plausible

## Project Structure

- `pages/`: route pages and dynamic templates
- `components/`: reusable UI components (hero, timeline, cards, forms)
- `posts/`: markdown blog posts
- `data/`: centralized site, podcast, and GPT datasets
- `lib/`: helpers for posts, schema, forms, and utility logic
- `public/assets/`: SVG assets and social imagery
- `scripts/`: sitemap/robots generator and monthly analytics reporting

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` if you want live form delivery or analytics:

```bash
NEXT_PUBLIC_FORMSPREE_CONTACT=
NEXT_PUBLIC_FORMSPREE_FRACTIONAL=
NEXT_PUBLIC_FORMSPREE_NEWSLETTER=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=apex.blue
PLAUSIBLE_API_KEY=
PLAUSIBLE_SITE_ID=apex.blue
```

Notes:

- If Formspree env vars are missing, forms simulate successful submission in development/static mode.
- If Plausible domain is set, the client tracking script is injected.

## Build and Export

```bash
npm run build
npm run export
```

- `npm run build` generates `public/sitemap.xml` and `public/robots.txt` before building.
- `npm run export` runs the static export build as well (Next.js 14 uses `output: 'export'` instead of the removed `next export` command) and writes deployable files to `out/`.

## Content Workflows

### Add a blog post

1. Create a markdown file in `posts/`.
2. Include frontmatter fields like:

```yaml
title:
date:
updated:
year:
month:
slug:
author:
excerpt:
description:
image:
imageAlt:
categories:
tags:
```

3. Run `npm run build` to regenerate sitemap entries.

### Podcast episodes

- Edit `data/podcast.js` to add or update episodes.
- Episode pages are generated automatically under `/episodes/[slug]`.

## Analytics Monthly Report

Generate an internal report from Plausible:

```bash
npm run analytics:report
```

Output file:

- `reports/analytics-YYYY-MM.md`

If API credentials are missing, the script creates a placeholder report with setup instructions.

## Accessibility and SEO Highlights

- Semantic HTML landmarks and labeled forms
- Keyboard-accessible navigation and controls
- Descriptive link text and alt text
- Per-page title/meta/canonical tags
- JSON-LD for Organization, WebSite, WebPage, BlogPosting, PodcastSeries, PodcastEpisode
- XML sitemap + robots.txt generation

## Deployment

1. Run `npm run build`.
2. Run `npm run export`.
3. Deploy the `out/` directory.

## Notes

- Update contact phone/email in `data/site.js` as needed.
- Update social and podcast platform URLs in `data/site.js` and `data/podcast.js` if canonical links change.
