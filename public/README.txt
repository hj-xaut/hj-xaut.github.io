This folder is populated automatically by `npm run sync:assets`.
Keep the original media folders at the PROJECT ROOT exactly as before:

photo.jpg
imgs/
videos/

The sync script copies them into public/ before Astro dev/build, so the browser URLs remain unchanged:
photo.jpg, imgs/..., videos/...
