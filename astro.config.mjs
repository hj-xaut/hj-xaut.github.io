import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hj-xaut.github.io',
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});