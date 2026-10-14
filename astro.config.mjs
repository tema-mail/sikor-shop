import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Своего домена у SIKOR пока нет: варианты главной показываем на GitHub Pages (адрес и подпапку задаёт workflow).
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://tema-mail.github.io/sikor-shop',
  base: process.env.PUBLIC_BASE || '/',
  integrations: [preact()],
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
