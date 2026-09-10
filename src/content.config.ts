import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const philosophy = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/philosophy' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string().default('Kỹ Nghệ & Triết Lý'),
    readTime: z.string().default('8 phút đọc'),
    author: z.string().default('Thành Lê'),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { philosophy };
