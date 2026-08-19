# Migration from the original HTML/CSS project

Original structure:

```text
project/
├─ imgs/
├─ videos/
├─ index.html
├─ photo.jpg
└─ style.css
```

New structure after extracting this Astro project into the same directory:

```text
project/
├─ imgs/                 # keep unchanged
├─ videos/               # keep unchanged
├─ photo.jpg             # keep unchanged
├─ src/
├─ scripts/
├─ public/               # generated/synced copies
├─ package.json
├─ astro.config.mjs
├─ tsconfig.json
└─ ...
```

You can keep the old `index.html` and `style.css` as backups or move them into a `legacy/` folder. Astro uses `src/pages/index.astro` as the new homepage source.

Run `npm run dev`; the asset sync step will copy `photo.jpg`, `imgs/`, and `videos/` into `public/` automatically while retaining the same browser URLs.
