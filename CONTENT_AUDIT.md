# Content preservation audit

Source: original `index.html` supplied for the homepage.

## Counts preserved in the Astro data/components

| Content type | Original count | Astro migration |
|---|---:|---:|
| Research overview cards | 3 | 3 |
| Research detail blocks | 3 | 3 |
| Video sources | 8 | 8 |
| Image sources | 25 | 25 |
| Publications | 19 | 19 |
| Teaching courses | 3 | 3 |
| Awards | 9 | 9 |
| Academic activities | 12 | 12 |

Automated source-string validation found **no missing image paths, video paths, publication titles, award titles, activity titles, or course titles** in the new `src/` tree.

The original Google Scholar URL is preserved in `src/data/publications.ts`.

## Asset behavior

The browser-facing paths remain unchanged (`photo.jpg`, `imgs/...`, `videos/...`).

`scripts/sync-assets.mjs` copies the existing root-level media into Astro's `public/` directory before `dev` and `build`, so no media rename is required.
