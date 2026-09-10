// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Tự động tạo bản sao sitemap.xml từ sitemap-0.xml để tương thích tuyệt đối
 * với các công cụ SEO Checker chỉ tìm kiếm file sitemap.xml mặc định.
 */
function sitemapXmlAlias() {
  return {
    name: 'sitemap-xml-alias',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const source = path.join(outDir, 'sitemap-0.xml');
        const dest = path.join(outDir, 'sitemap.xml');
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, dest);
          console.log('[sitemap-xml-alias] Successfully generated sitemap.xml');
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://doitstudio.tech',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/sample-mdx'),
    }),
    sitemapXmlAlias(),
    mdx()
  ]
});