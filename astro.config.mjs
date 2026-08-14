// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://doitstudio.tech', // Thay 'username' bằng GitHub username của bạn
  base: '/', // Tên repository trên GitHub
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx()]
});