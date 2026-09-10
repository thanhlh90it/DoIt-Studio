# DoIT-Studio SEO & Content Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai toàn diện giải pháp SEO & Growth Infrastructure cho website `https://doitstudio.tech` bao gồm: Tự động hóa Sitemap & Robots.txt, Component `SEO.astro` trung tâm, đo lường Google Analytics 4 (`G-64YJ3QLMEM`), dữ liệu có cấu trúc Schema.org JSON-LD, và Content Hub `/philosophy` với 3 bài viết kỹ thuật chuyên sâu (>1.500 từ/bài) có Table of Contents (TOC) tự động.

**Architecture:** 
- Tận dụng tối đa khả năng Zero JS Client-side của Astro 7 SSG.
- Đóng gói toàn bộ thẻ Meta, Canonical URL, OpenGraph, Twitter Cards và GA4 vào `SEO.astro`.
- Xây dựng module sinh Schema chuẩn `src/utils/seoSchemas.ts` và component `<StructuredData />`.
- Thiết lập Content Layer của Astro (`src/content.config.ts`) quản lý các bài viết MDX, tạo dynamic route `src/pages/philosophy/[slug].astro` với TOC tương tác và phong cách Cybernetic HUD.

**Tech Stack:** Astro 7 SSG, `@astrojs/sitemap`, `@astrojs/mdx`, `@tailwindcss/typography`, Tailwind CSS v4, TypeScript, Google Analytics 4 (`G-64YJ3QLMEM`).

**Spec:** [`docs/superpowers/specs/2026-09-10-doit-seo-implementation-design.md`](file:///Users/thanhle/Workspaces/DoIt-Studio/docs/superpowers/specs/2026-09-10-doit-seo-implementation-design.md)

## Global Constraints
- Target Domain: `https://doitstudio.tech`
- GA4 Measurement ID: `G-64YJ3QLMEM`
- Google Analytics script PHẢI chỉ xuất hiện khi `import.meta.env.PROD === true` để không ghi nhận traffic rác từ môi trường dev/local.
- Thẻ Canonical URL phải luôn là URL tuyệt đối chuẩn hóa (không chứa query params hoặc hash).
- Mọi bài viết trong `/philosophy` phải chứa tối thiểu 2-3 liên kết nội bộ tự nhiên dẫn về `/apps` hoặc `/profile`.
- Tuyệt đối không làm giảm tốc độ tải trang hoặc phá vỡ thiết kế giao diện Cybernetic hiện tại.

---

### Task 1: Cài đặt `@astrojs/sitemap`, cấu hình Sitemap và Robots.txt

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`

**Interfaces:**
- Produces: `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, `dist/robots.txt` khi chạy `npm run build`.

- [ ] **Step 1: Cài đặt thư viện `@astrojs/sitemap`**
Run:
```bash
npm install @astrojs/sitemap
```

- [ ] **Step 2: Cập nhật `astro.config.mjs` tích hợp sitemap**
Thay thế nội dung `astro.config.mjs`:
```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
    mdx()
  ]
});
```

- [ ] **Step 3: Tạo tệp `public/robots.txt`**
Tạo file `public/robots.txt` với nội dung:
```text
User-agent: *
Allow: /

Sitemap: https://doitstudio.tech/sitemap-index.xml
```

- [ ] **Step 4: Chạy thử build để kiểm tra sitemap**
Run:
```bash
npm run build
```
Verify:
File `dist/sitemap-index.xml` và `dist/robots.txt` tồn tại trong thư mục `dist/`.

- [ ] **Step 5: Commit thay đổi**
```bash
git add package.json package-lock.json astro.config.mjs public/robots.txt
git commit -m "feat(seo): configure @astrojs/sitemap and robots.txt"
```

---

### Task 2: Xây dựng Component `SEO.astro` & Tích hợp GA4 `G-64YJ3QLMEM`

**Files:**
- Create: `src/components/SEO.astro`
- Modify: `src/layouts/MainLayout.astro`

**Interfaces:**
- Produces: `<SEO />` component nhận `Props { title?: string, description?: string, canonical?: string, ogImage?: string, ogType?: 'website' | 'article', publishedTime?: string, modifiedTime?: string, author?: string, noindex?: boolean }`.
- Consumes: Google Analytics Measurement ID `G-64YJ3QLMEM`.

- [ ] **Step 1: Tạo component `src/components/SEO.astro`**
Tạo file `src/components/SEO.astro`:
```astro
---
export interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

const {
  title = "DoIT-Studio | Cybernetic Digital Workspace",
  description = "Tối giản, Sáng tạo và Xây dựng các ứng dụng chất lượng cao với tư duy kỹ thuật tương lai.",
  canonical,
  ogImage = "/brand/developer-header-4096x2304.jpg",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "Thành Lê",
  noindex = false,
} = Astro.props;

const siteUrl = Astro.site ? Astro.site.origin : "https://doitstudio.tech";
const canonicalURL = canonical ? canonical : new URL(Astro.url.pathname, siteUrl).href;

// Chuẩn hóa title có đuôi thương hiệu DoIT-Studio
const formattedTitle = title.includes("DoIT-Studio") ? title : `${title} | DoIT-Studio`;

// Chuẩn hóa absolute URL cho og:image
const ogImageURL = ogImage.startsWith("http") ? ogImage : new URL(ogImage, siteUrl).href;
---

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{formattedTitle}</title>
<meta name="title" content={formattedTitle} />
<meta name="description" content={description} />
<meta name="author" content={author} />
<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={formattedTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:site_name" content="DoIT-Studio" />
<meta property="og:locale" content="vi_VN" />
{ogType === "article" && publishedTime && <meta property="article:published_time" content={publishedTime} />}
{ogType === "article" && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
{ogType === "article" && author && <meta property="article:author" content={author} />}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalURL} />
<meta name="twitter:title" content={formattedTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

<!-- Google Analytics 4 (Only loaded in Production) -->
{import.meta.env.PROD && (
  <>
    <script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-64YJ3QLMEM"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-64YJ3QLMEM', {
        page_path: window.location.pathname,
      });
    </script>
  </>
)}
```

- [ ] **Step 2: Cập nhật `src/layouts/MainLayout.astro` để sử dụng `<SEO />`**
Trong file `src/layouts/MainLayout.astro`:
Import `SEO.astro`:
```astro
import SEO from '../components/SEO.astro';
```
Cập nhật Props của `MainLayout`:
```typescript
interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}
```
Và trong phần `<head>` của `MainLayout.astro`, thay thế các thẻ `<title>` và `<meta name="description">` bằng:
```astro
<SEO
  title={title}
  description={description}
  canonical={canonical}
  ogImage={ogImage}
  ogType={ogType}
  publishedTime={publishedTime}
  modifiedTime={modifiedTime}
  author={author}
  noindex={noindex}
/>
```

- [ ] **Step 3: Kiểm tra build tĩnh**
Run:
```bash
npm run build
```
Verify:
Lệnh build thành công, kiểm tra file `dist/index.html` có chứa `<link rel="canonical" href="https://doitstudio.tech/">` và các thẻ OpenGraph/Twitter.

- [ ] **Step 4: Commit**
```bash
git add src/components/SEO.astro src/layouts/MainLayout.astro
git commit -m "feat(seo): add central SEO component and integrate GA4 G-64YJ3QLMEM"
```

---

### Task 3: Xây dựng Schema.org JSON-LD và Tích hợp cho các Trang Chủ Lực

**Files:**
- Create: `src/utils/seoSchemas.ts`
- Create: `src/components/StructuredData.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/apps/index.astro`
- Modify: `src/pages/profile.astro`

**Interfaces:**
- Produces: `getOrganizationSchema()`, `getWebSiteSchema()`, `getSoftwareAppSchema()`, `getCourseAndServiceSchema()`, `getArticleSchema()`, and `<StructuredData schema={...} />`.

- [ ] **Step 1: Tạo `src/utils/seoSchemas.ts`**
Tạo file `src/utils/seoSchemas.ts`:
```typescript
export interface AppSchemaOptions {
  name: string;
  description: string;
  operatingSystem?: string;
  applicationCategory?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  url?: string;
  downloadUrl?: string;
}

export interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DoIT-Studio",
    "url": "https://doitstudio.tech",
    "logo": "https://doitstudio.tech/brand/developer-icon-512x512.jpg",
    "description": "Solo Venture Studio & Tech Mentorship Lab - Cybernetic Product Venture.",
    "founder": {
      "@type": "Person",
      "name": "Thành Lê",
      "jobTitle": "Founder & Principal Engineer",
      "url": "https://doitstudio.tech/profile"
    },
    "sameAs": [
      "https://github.com/thanhle",
      "https://facebook.com/doitstudio"
    ]
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DoIT-Studio",
    "url": "https://doitstudio.tech",
    "description": "Không gian nghiên cứu, phát triển sản phẩm công nghệ và chia sẻ tri thức lập trình thực chiến."
  };
}

export function getSoftwareAppSchema(app: AppSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "operatingSystem": app.operatingSystem || "iOS, Android",
    "applicationCategory": app.applicationCategory || "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": app.offers?.price || "0",
      "priceCurrency": app.offers?.priceCurrency || "VND"
    },
    "description": app.description,
    ...(app.url && { "url": app.url }),
    ...(app.downloadUrl && { "downloadUrl": app.downloadUrl })
  };
}

export function getCourseAndServiceSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Thành Lê",
      "jobTitle": "Founder & Principal Engineer",
      "url": "https://doitstudio.tech/profile",
      "worksFor": {
        "@type": "Organization",
        "name": "DoIT-Studio",
        "url": "https://doitstudio.tech"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "IT & AI Coaching 1-on-1: AI-Augmented Developer Workflows",
      "description": "Đào tạo kỹ sư phần mềm làm chủ AI-assisted coding (Cursor, Claude, Gemini, Antigravity), tư duy kiến trúc và nhân bản năng suất thực tế.",
      "provider": {
        "@type": "Organization",
        "name": "DoIT-Studio",
        "sameAs": "https://doitstudio.tech"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Tư Vấn Kiến Trúc & Phát Triển Phần Mềm May Đo Cho SME",
      "provider": {
        "@type": "Organization",
        "name": "DoIT-Studio",
        "url": "https://doitstudio.tech"
      },
      "serviceType": "Software Development & Architecture Consultation",
      "description": "Tư vấn kiến trúc công nghệ, phát triển web/app theo đơn đặt hàng và tự động hóa quy trình nghiệp vụ nội bộ."
    }
  ];
}

export function getArticleSchema(article: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author || "Thành Lê",
      "url": "https://doitstudio.tech/profile"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DoIT-Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://doitstudio.tech/brand/developer-icon-512x512.jpg"
      }
    },
    "image": article.image || "https://doitstudio.tech/brand/developer-header-4096x2304.jpg"
  };
}
```

- [ ] **Step 2: Tạo component `src/components/StructuredData.astro`**
Tạo file `src/components/StructuredData.astro`:
```astro
---
interface Props {
  schema: Record<string, any> | Array<Record<string, any>>;
}

const { schema } = Astro.props;
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 3: Nhúng Schema vào Trang Chủ (`src/pages/index.astro`)**
Trong `src/pages/index.astro`:
Import `StructuredData` và `getOrganizationSchema`, `getWebSiteSchema`:
```astro
import StructuredData from '../components/StructuredData.astro';
import { getOrganizationSchema, getWebSiteSchema } from '../utils/seoSchemas';

const homepageSchemas = [getOrganizationSchema(), getWebSiteSchema()];
```
Render `<StructuredData schema={homepageSchemas} />` bên trong `MainLayout`.

- [ ] **Step 4: Nhúng Schema vào Trang Ứng Dụng (`src/pages/apps/index.astro`)**
Trong `src/pages/apps/index.astro`:
Import `StructuredData` và `getSoftwareAppSchema`. Khai báo schemas cho các ứng dụng chính:
```astro
import StructuredData from '../../components/StructuredData.astro';
import { getSoftwareAppSchema } from '../../utils/seoSchemas';

const appsSchemas = [
  getSoftwareAppSchema({
    name: "SecureVault",
    description: "Két sắt cá nhân bảo mật cao trên di động - 100% local-first privacy, không máy chủ, mã hóa AES-256-GCM.",
    applicationCategory: "SecurityApplication",
    url: "https://doitstudio.tech/apps/securevault",
    downloadUrl: "https://apps.apple.com/us/app/securevault-ẩn-ảnh-mật-khẩu/id6800250737"
  }),
  getSoftwareAppSchema({
    name: "NhàTa",
    description: "Không gian số ấm áp, riêng tư cho tổ ấm gia đình: Lịch biểu chung & TKB, phân chia việc nhà, tích sao đổi quà.",
    applicationCategory: "LifestyleApplication",
    url: "https://doitstudio.tech/nhata"
  }),
  getSoftwareAppSchema({
    name: "NoduleTrack",
    description: "Ứng dụng di động y tế cá nhân chuyên biệt hỗ trợ số hóa hồ sơ siêu âm, theo dõi tốc độ tăng trưởng của nang, nhân, hạch chuẩn TI-RADS.",
    applicationCategory: "HealthApplication",
    url: "https://doitstudio.tech/noduletrack"
  })
];
```
Render `<StructuredData schema={appsSchemas} />`.

- [ ] **Step 5: Nhúng Schema vào Trang Profile (`src/pages/profile.astro`)**
Trong `src/pages/profile.astro`:
Import `StructuredData` và `getCourseAndServiceSchema`.
Render `<StructuredData schema={getCourseAndServiceSchema()} />`.

- [ ] **Step 6: Kiểm tra build & commit**
Run:
```bash
npm run build
```
Verify:
Trang index, apps, profile build thành công và chứa thẻ `<script type="application/ld+json">`.
Commit:
```bash
git add src/utils/seoSchemas.ts src/components/StructuredData.astro src/pages/index.astro src/pages/apps/index.astro src/pages/profile.astro
git commit -m "feat(seo): add JSON-LD structured data schemas for Organization, Apps, and Course"
```

---

### Task 4: Thiết Lập Content Collections và Dynamic Route cho `/philosophy`

**Files:**
- Create: `src/content.config.ts`
- Create: `src/pages/philosophy/[slug].astro`
- Modify: `src/pages/philosophy/index.astro`

**Interfaces:**
- Consumes: `src/content/philosophy/*.mdx`
- Produces: Dynamic routes `/philosophy/:slug` với Table of Contents (TOC) và typography chuẩn mực.

- [ ] **Step 1: Tạo cấu hình Content Layer `src/content.config.ts`**
Tạo file `src/content.config.ts`:
```typescript
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
```

- [ ] **Step 2: Tạo trang động `src/pages/philosophy/[slug].astro`**
Tạo file `src/pages/philosophy/[slug].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import MainLayout from '../../layouts/MainLayout.astro';
import StructuredData from '../../components/StructuredData.astro';
import { getArticleSchema } from '../../utils/seoSchemas';

export async function getStaticPaths() {
  const posts = await getCollection('philosophy');
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.(md|mdx)$/, '') },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);

// Lọc các đề mục H2, H3 để tạo TOC
const tocHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

const currentUrl = new URL(Astro.url.pathname, Astro.site || 'https://doitstudio.tech').href;

const articleSchema = getArticleSchema({
  title: post.data.title,
  description: post.data.description,
  url: currentUrl,
  datePublished: post.data.date,
  author: post.data.author,
  image: post.data.ogImage,
});
---

<MainLayout
  title={post.data.title}
  description={post.data.description}
  ogType="article"
  publishedTime={post.data.date}
  author={post.data.author}
  ogImage={post.data.ogImage}
>
  <StructuredData schema={articleSchema} />

  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
    <!-- Back Navigation -->
    <div class="mb-8 font-mono">
      <a
        href="/philosophy"
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <span>←</span>
        <span>// QUAY LẠI DANH MỤC BÀI VIẾT</span>
      </a>
    </div>

    <!-- Article Header -->
    <header class="mb-10 pb-8 border-b border-slate-800">
      <div class="flex items-center gap-3 text-xs sm:text-sm text-slate-400 mb-4 flex-wrap font-mono">
        <span class="px-3 py-1 rounded-md bg-blue-600/25 text-cyan-300 font-bold border border-cyan-400/40 uppercase tracking-wider text-xs">
          LOG // {post.data.category}
        </span>
        <span class="text-slate-600">•</span>
        <span>[{post.data.date}]</span>
        <span class="text-slate-600">•</span>
        <span class="text-slate-300">{post.data.readTime}</span>
        <span class="text-slate-600">•</span>
        <span class="text-slate-400">Tác giả: {post.data.author}</span>
      </div>

      <h1 class="font-tech text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
        {post.data.title}
      </h1>

      <p class="text-lg sm:text-xl text-slate-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
        {post.data.description}
      </p>

      {post.data.tags.length > 0 && (
        <div class="flex flex-wrap gap-2 mt-6">
          {post.data.tags.map((tag: string) => (
            <span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>

    <!-- Table of Contents (TOC) -->
    {tocHeadings.length > 0 && (
      <nav class="mb-12 p-6 rounded-2xl glass-card hud-corners border border-blue-900/60 bg-[#070d1e]/80">
        <div class="flex items-center gap-2 mb-4 font-mono text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>MỤC LỤC BÀI VIẾT (TABLE OF CONTENTS)</span>
        </div>
        <ul class="space-y-2 text-sm font-mono">
          {tocHeadings.map((h) => (
            <li class={h.depth === 3 ? "pl-5 text-xs text-slate-400" : "text-slate-300 font-semibold"}>
              <a
                href={`#${h.slug}`}
                class="hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <span class="text-cyan-500/70">{h.depth === 2 ? "▸" : "•"}</span>
                <span>{h.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )}

    <!-- Article Content -->
    <div class="prose prose-invert prose-cyan lg:prose-lg max-w-none font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed prose-headings:font-tech prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-img:rounded-2xl prose-pre:border prose-pre:border-slate-800">
      <Content />
    </div>

    <!-- Author Bio & CTA Footer -->
    <footer class="mt-16 pt-10 border-t border-slate-800/80">
      <div class="glass-card hud-corners p-6 sm:p-8 rounded-2xl border border-blue-900/60 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-400 p-0.5 shrink-0 shadow-lg shadow-cyan-500/30">
          <div class="w-full h-full bg-black rounded-[14px] flex items-center justify-center font-tech font-bold text-xl text-white">
            TL
          </div>
        </div>
        <div class="flex-grow text-center sm:text-left">
          <h3 class="font-tech text-lg font-bold text-white mb-1">Thành Lê</h3>
          <p class="text-xs font-mono text-cyan-400 mb-3">FOUNDER & PRINCIPAL ENGINEER // DOIT-STUDIO</p>
          <p class="text-sm text-slate-300 mb-5 leading-relaxed">
            Theo đuổi triết lý kỹ nghệ tinh gọn (Zero-Bloat), kiến trúc Local-First và nâng cao năng suất kỹ sư bằng AI Workflows. Xây dựng và chia sẻ các sản phẩm công nghệ thực chiến.
          </p>
          <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href="/profile"
              class="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-md"
            >
              ĐĂNG KÝ COACHING 1-ON-1 →
            </a>
            <a
              href="/apps"
              class="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-black text-cyan-300 border border-cyan-500/50 hover:bg-blue-950/80 transition-all"
            >
              KHÁM PHÁ CÁC ỨNG DỤNG →
            </a>
          </div>
        </div>
      </div>
    </footer>
  </article>
</MainLayout>
```

- [ ] **Step 3: Cập nhật `src/pages/philosophy/index.astro` để hiển thị bài viết động**
Trong file `src/pages/philosophy/index.astro`:
Thay thế mảng `articles` tĩnh bằng:
```astro
---
import { getCollection } from 'astro:content';
import MainLayout from '../../layouts/MainLayout.astro';
import BlogCard from '../../components/BlogCard.astro';

const principles = [
  {
    icon: '🌿',
    title: 'Tối Giản Trong Thiết Kế & Code',
    desc: 'Loại bỏ những chi tiết thừa thãi. Sự tinh gọn trong mã nguồn và giao diện mang lại sự rõ ràng trong tư duy sáng tạo.'
  },
  {
    icon: '🎯',
    title: 'Tập Trung Vào Giá Trị Thật',
    desc: 'Không chạy theo xu hướng nhất thời. Tập trung tạo ra những công cụ giải quyết đúng nhu cầu thiết thực của con người.'
  },
  {
    icon: '🔄',
    title: 'Học Tập & Cải Tiến Liên Tục',
    desc: 'Xem mỗi dự án là một phòng thí nghiệm nhỏ, sẵn sàng lắng nghe phản hồi và nâng cấp chất lượng sản phẩm từng ngày.'
  }
];

const rawPosts = await getCollection('philosophy');
const posts = rawPosts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---
```
Và trong phần render:
```astro
<div class="space-y-6">
  {posts.map((post) => (
    <BlogCard
      title={post.data.title}
      description={post.data.description}
      date={post.data.date}
      slug={post.id.replace(/\.(md|mdx)$/, '')}
      readTime={post.data.readTime}
      category={post.data.category}
    />
  ))}
</div>
```

- [ ] **Step 4: Commit thay đổi hạ tầng Content Collections**
```bash
git add src/content.config.ts src/pages/philosophy/[slug].astro src/pages/philosophy/index.astro
git commit -m "feat(content): setup content collections and dynamic article layout with TOC for philosophy"
```

---

### Task 5: Soạn Thảo 3 Bài Viết Chuyên Sâu Chuẩn SEO (>1.500 từ/bài)

**Files:**
- Create: `src/content/philosophy/ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian.mdx`
- Create: `src/content/philosophy/tu-duy-ship-to-production-ai-augmented-developer.mdx`
- Create: `src/content/philosophy/kien-truc-local-first-privacy-trong-ky-nguyen-ai.mdx`

**Interfaces:**
- Produces: 3 bài viết kỹ thuật hoàn chỉnh định dạng MDX, đáp ứng tiêu chuẩn SEO: độ dài > 1.500 từ, cấu trúc thẻ H2/H3 chặt chẽ, từ khóa tự nhiên, bảng biểu so sánh, khối mã nguồn minh họa, và ít nhất 2-3 internal links trỏ về `/apps` hoặc `/profile`.

- [ ] **Step 1: Soạn thảo bài viết 1: `ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian.mdx`**
Nội dung: Phân tích căn bệnh "bloatware" trong ngành công nghệ hiện nay, chi phí ẩn của sự cồng kềnh, các nguyên tắc thực hành Kỹ nghệ Zero-Bloat (tối ưu bundle, Astro SSG, loại bỏ framework runtime thừa), dẫn chứng thực tế từ ứng dụng *SecureVault* và *DoTask Minimalist*.

- [ ] **Step 2: Soạn thảo bài viết 2: `tu-duy-ship-to-production-ai-augmented-developer.mdx`**
Nội dung: Vượt qua bẫy "Tutorial Hell", triết lý "Ship to Production", ứng dụng thực tế AI-Augmented Engineering (Cursor, Claude, Gemini, Antigravity IDE) để đưa ý tưởng thành MVP chạy thực tế trong 48h, kỹ năng prompt và review code AI, dẫn chứng dịch vụ *IT & AI Coaching 1-on-1* (`/profile`) và danh mục `/apps`.

- [ ] **Step 3: Soạn thảo bài viết 3: `kien-truc-local-first-privacy-trong-ky-nguyen-ai.mdx`**
Nội dung: Khủng hoảng niềm tin đám mây, các cột trụ của Local-First Architecture (Offline-by-default, Zero-Knowledge, mã hóa AES-256-GCM tại máy, kiểm soát dữ liệu cá nhân), so sánh Cloud vs Local-First, dẫn chứng ứng dụng két sắt *SecureVault* và ứng dụng gia đình *NhàTa* tại `/apps`.

- [ ] **Step 4: Commit 3 bài viết**
```bash
git add src/content/philosophy/
git commit -m "feat(content): publish 3 comprehensive SEO-optimized articles for /philosophy"
```

---

### Task 6: Kiểm Thử Toàn Diện, Xác Thực Build và Hoàn Thiện Checklist

**Files:**
- Toàn bộ thư mục `dist/` sau khi build

- [ ] **Step 1: Thực hiện build tĩnh toàn diện**
Run:
```bash
npm run build
```
Verify:
- Exit code 0, không có lỗi TypeScript hay lỗi biên dịch MDX.
- Các route tĩnh được tạo ra:
  - `dist/index.html`
  - `dist/apps/index.html`
  - `dist/apps/securevault/index.html`
  - `dist/profile/index.html`
  - `dist/philosophy/index.html`
  - `dist/philosophy/ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian/index.html`
  - `dist/philosophy/tu-duy-ship-to-production-ai-augmented-developer/index.html`
  - `dist/philosophy/kien-truc-local-first-privacy-trong-ky-nguyen-ai/index.html`

- [ ] **Step 2: Xác thực Sitemap và Robots.txt**
Run:
```bash
cat dist/robots.txt
cat dist/sitemap-0.xml
```
Verify:
- `robots.txt` trỏ chính xác về `https://doitstudio.tech/sitemap-index.xml`.
- `sitemap-0.xml` chứa đầy đủ tất cả các URL của bài viết mới và các trang đích.

- [ ] **Step 3: Xác thực Thẻ SEO, GA4 và Schema JSON-LD trong HTML build**
Run:
```bash
grep -n "G-64YJ3QLMEM" dist/index.html
grep -n "application/ld+json" dist/index.html dist/apps/index.html dist/profile/index.html dist/philosophy/ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian/index.html
grep -n "canonical" dist/philosophy/ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian/index.html
```
Verify:
- Script GA4 `G-64YJ3QLMEM` có mặt trong production build.
- Thẻ JSON-LD hợp lệ trên các trang.
- Thẻ Canonical trỏ đúng URL tuyệt đối của bài viết.

- [ ] **Step 4: Kiểm tra trực quan với Dev Server**
Run:
```bash
astro dev --background
```
Kiểm tra phản hồi HTTP từ server nội bộ:
```bash
curl -I http://localhost:4321/
curl -I http://localhost:4321/philosophy/
```
Sau đó dừng server dev:
```bash
astro dev stop
```
