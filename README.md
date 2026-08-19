# HU Jing Academic Homepage — Astro Edition

Modern componentized rebuild of the original academic homepage.

## Important asset rule

Keep the existing media at the **project root** exactly as before:

```text
photo.jpg
imgs/
videos/
```

All image/video references in the page keep the original browser paths such as:

```text
photo.jpg
imgs/C_textbook.png
videos/sdr.mp4
videos/IR视频.mp4
```

Before development/build, `scripts/sync-assets.mjs` automatically copies those root assets into Astro's `public/` directory. You do not need to rename any image or video.

## Run

Astro 6 requires Node.js 22.12.0 or newer.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Content organization

- `src/data/profile.ts` — profile, education, experience
- `src/data/research.ts` — all research areas, topics and video paths
- `src/data/publications.ts` — all 19 publications from the original page
- `src/data/teaching.ts` — all teaching content
- `src/data/media.ts` — all 9 awards and 12 academic activities
- `src/components/` — reusable UI components
- `src/sections/` — page sections
- `src/scripts/site.ts` — interactive behavior
- `src/styles/` — design system and responsive layout

## Preserved content counts

- Research areas: 3
- Research detail blocks: 3
- Videos: 8
- Publications: 19
- Courses: 3
- Awards: 9
- Academic activities: 12

The original Google Scholar URL is also preserved.

## Homepage design revision

The first-screen profile layout has been redesigned as a compact editorial academic masthead: a small portrait, biography-led hierarchy, research index, and a horizontal academic path. All original content and all `photo.jpg`, `imgs/*`, and `videos/*` asset paths remain unchanged.
