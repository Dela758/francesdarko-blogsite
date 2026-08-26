# Frances Darko — Personal Blog

A calm, literary personal blog built with Next.js, Tailwind CSS, and MDX.

## Features

- **Static generation** — fast, lightweight, easy to deploy anywhere
- **MDX posts** — write in Markdown with frontmatter metadata
- **Dark / light mode** — subtle theme toggle via `next-themes`
- **Fully responsive** — mobile-first layout matching the editorial design
- **Accessible** — semantic HTML, skip links, keyboard navigation, good contrast
- **SEO-friendly** — per-page metadata and Open Graph tags

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured essay, recent notes |
| `/essays` | Full archive with tags |
| `/essays/[slug]` | Individual post with prev/next navigation |
| `/about` | Writer bio with photo |
| `/contact` | Newsletter / contact form |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Posts

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Essay Title"
date: "2024-10-14"
excerpt: "A short summary for listings."
featured: false
image: "https://images.unsplash.com/photo-..."
imageAlt: "Description of the image"
tags:
  - Topic
---

Your essay content here…
```

Posts are sorted by date automatically. Set `featured: true` to highlight one on the home page.

## Design System

Colors, typography, and spacing follow `DESIGN.md`:

- **Fonts:** EB Garamond (headings) + Manrope (body)
- **Palette:** Warm cream backgrounds, charcoal text, sage and dusty rose accents
- **Max content width:** 840px

## Deploy

Works on Vercel, Netlify, or any static host:

```bash
npm run build
npm start
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/) via `next-mdx-remote`
- [next-themes](https://github.com/pacocoursey/next-themes)
# Frances Darko

## Editing essays

The site uses a lightweight [Decap CMS](https://decapcms.org/) editor at `/admin`.

For local editing, run the Next.js server and the CMS proxy in separate terminals:

```bash
npm run dev
npm run cms
```

Then open `http://localhost:3000/admin`. Saving an essay updates the MDX file in
`content/posts`, which the static site uses on the next build.

Before deploying the editor publicly, update `public/admin/config.yml` from the
local `test-repo` backend to an authenticated GitHub or Git Gateway backend.
