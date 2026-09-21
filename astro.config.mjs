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

// Danh sách các route chuyển hướng (redirect) hoặc nháp/mẫu không đưa vào sitemap
const EXCLUDED_SITEMAP_ROUTES = [
  '/sample-mdx',
  '/apps/nhata',
  '/nhata/data-deletion',
  '/nhata/delete-account',
  '/nhata/privacy',
  '/nhata/terms',
  '/securevault/privacy'
];

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
      filter: (page) => {
        try {
          const url = new URL(page);
          const cleanPath = url.pathname.replace(/\/$/, '');
          return !EXCLUDED_SITEMAP_ROUTES.some(
            (excluded) => cleanPath === excluded || cleanPath.startsWith(`${excluded}/`)
          );
        } catch {
          return !EXCLUDED_SITEMAP_ROUTES.some((excluded) => page.includes(excluded));
        }
      },
    }),
    sitemapXmlAlias(),
    mdx()
  ]
});