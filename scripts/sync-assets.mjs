import { cp, mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const publicDir = resolve(root, 'public');
const items = ['photo.jpg', 'imgs', 'videos'];

await mkdir(publicDir, { recursive: true });

for (const item of items) {
  const source = resolve(root, item);
  const destination = resolve(publicDir, item);

  try {
    const info = await stat(source);
    await cp(source, destination, {
      recursive: info.isDirectory(),
      force: true
    });
    console.log(`[assets] synced ${item}`);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      console.warn(`[assets] ${item} not found at project root; keeping URL references unchanged.`);
      continue;
    }
    throw error;
  }
}
