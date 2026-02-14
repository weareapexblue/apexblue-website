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

Create `.env.local` to enable live form storage, email notifications, and analytics:

```bash
DATABASE_URL=
RESEND_API_KEY=
FORM_NOTIFICATION_TO=guru@apex.blue
FORM_NOTIFICATION_FROM="Apex Blue Forms <forms@apex.blue>"
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_COOKIE_SECRET=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=apex.blue
PLAUSIBLE_API_KEY=
PLAUSIBLE_SITE_ID=apex.blue
```

Notes:

- Forms submit to `/api/forms/[formType]` and are saved in a `form_submissions` table.
- If `RESEND_API_KEY` is missing, submissions are still saved, but notification email alerts are skipped.
- Admin dashboard is available at `/admin/`; set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_COOKIE_SECRET` in production.
- If Plausible domain is set, the client tracking script is injected.

## Build and Deploy

```bash
npm run build
```

- `npm run build` generates `public/sitemap.xml` and `public/robots.txt` before building.
- Deploy the project to Vercel as a standard Next.js app (serverless routes enabled for form APIs).

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

1. Add project environment variables in Vercel (`DATABASE_URL`, `RESEND_API_KEY`, `FORM_NOTIFICATION_TO`, `FORM_NOTIFICATION_FROM`).
2. Run `npm run build`.
3. Deploy from GitHub to Vercel.

## Form Data Access

- Submissions are stored in PostgreSQL table: `form_submissions`.
- You can review records via your database dashboard (Neon/Vercel Postgres) or SQL query tools.

## Notes

- Update contact phone/email in `data/site.js` as needed.
- Update social and podcast platform URLs in `data/site.js` and `data/podcast.js` if canonical links change.
