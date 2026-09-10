# THIẾT KẾ ĐẶC TẢ KỸ THUẬT: CHIẾN LƯỢC SEO TOÀN DIỆN CHO DOIT-STUDIO

- **Tên dự án**: DoIT-Studio SEO & Content Growth Infrastructure
- **Tên miền**: `https://doitstudio.tech`
- **Mã đo lường GA4**: `G-64YJ3QLMEM`
- **Công nghệ nền tảng**: Astro 7 SSG, Tailwind CSS v4, MDX, TypeScript
- **Ngày lập đặc tả**: 2026-09-10
- **Trạng thái**: Approved for Implementation

---

## 1. TỔNG QUAN VÀ MỤC TIÊU (OVERVIEW & GOALS)

Tài liệu này đặc tả kiến trúc kỹ thuật triển khai toàn bộ 3 Epic theo tài liệu PRD `DOCS/doit-seo-prd-epic.md`:
1. **Epic 1 - Technical SEO Foundation & Performance Infrastructure**: Đảm bảo website đạt trạng thái chuẩn mực về kỹ thuật tìm kiếm: Tự động hóa Sitemap (`@astrojs/sitemap`), `robots.txt`, component `SEO.astro` quản lý Canonical/Meta/OG/Twitter Cards, và tích hợp Google Analytics 4 (`G-64YJ3QLMEM`).
2. **Epic 2 - On-Page Optimization & Structured Data**: Triển khai dữ liệu có cấu trúc Schema.org JSON-LD dạng module cho Trang chủ (`Organization`, `WebSite`), Sản phẩm (`SoftwareApplication`), Khóa học & Dịch vụ (`Course`, `Service`, `Person`), và Bài viết tri thức (`TechArticle`).
3. **Epic 3 - Content Hub & Open Knowledge Engine**: Thiết lập hệ thống Astro Content Collections cho mục `/philosophy`, xây dựng trang xem bài viết động `/philosophy/[slug]` có Mục lục tự động (TOC), và xuất bản 3 bài viết kỹ thuật chuyên sâu (> 1.500 từ/bài) với ma trận liên kết nội bộ tự nhiên trỏ về `/apps` và `/profile`.

---

## 2. KIẾN TRÚC KỸ THUẬT CHI TIẾT (TECHNICAL ARCHITECTURE)

### 2.1 Epic 1: Hạ Tầng Kỹ Thuật SEO & Đo Lường

#### 2.1.1 Tích hợp Sitemap & Robots.txt
- **Gói phụ thuộc**: Thêm `@astrojs/sitemap` vào dự án.
- **Cấu hình `astro.config.mjs`**:
  ```typescript
  import { defineConfig } from 'astro/config';
  import tailwindcss from '@tailwindcss/vite';
  import mdx from '@astrojs/mdx';
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://doitstudio.tech',
    base: '/',
    output: 'static',
    vite: {
      plugins: [tailwindcss()]
    },
    integrations: [
      sitemap({
        filter: (page) => !page.includes('/sample-mdx'), // Loại trừ trang mẫu thử nghiệm
      }),
      mdx()
    ]
  });
  ```
- **Tệp `public/robots.txt`**:
  ```text
  User-agent: *
  Allow: /

  Sitemap: https://doitstudio.tech/sitemap-index.xml
  ```

#### 2.1.2 Component SEO Trung Tâm (`src/components/SEO.astro`)
- **Vị trí**: `src/components/SEO.astro`
- **Giao diện thuộc tính (Interface Props)**:
  ```typescript
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
  ```
- **Xử lý logic**:
  - `siteUrl`: Mặc định `https://doitstudio.tech`.
  - `canonicalURL`: Nếu không truyền thủ công, tự động chuẩn hóa qua `new URL(Astro.url.pathname, siteUrl).href`.
  - `formattedTitle`: Nếu `title` chưa kết thúc bằng `DoIT-Studio`, tự động gắn hậu tố ` | DoIT-Studio`.
  - `ogImageURL`: Chuẩn hóa URL tuyệt đối từ ảnh nội bộ (mặc định: `https://doitstudio.tech/brand/developer-header-4096x2304.jpg`).
  - Thẻ `meta name="robots"`: Đặt `noindex, nofollow` nếu `noindex = true`, ngược lại là `index, follow`.
- **Tích hợp Google Analytics 4 (`G-64YJ3QLMEM`)**:
  ```astro
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

#### 2.1.3 Cập nhật Layout Hệ Thống (`src/layouts/MainLayout.astro`)
- Loại bỏ các thẻ `<title>` và `<meta name="description">` thủ công.
- Nhúng `<SEO ...seoProps />` trực tiếp vào `<head>`.
- Chuyển tiếp các tham số SEO từ trang con (`title`, `description`, `ogImage`, `ogType`, `canonical`) vào `SEO.astro`.

---

### 2.2 Epic 2: Dữ Liệu Có Cấu Trúc Schema.org (JSON-LD)

#### 2.2.1 Bộ Tiện Ích Sinh Schema (`src/utils/seoSchemas.ts`)
Xây dựng các hàm TypeScript thuần để trả về các đối tượng Schema chuẩn xác:
1. `getOrganizationSchema()`:
   - `@type: "Organization"`
   - Tên: "DoIT-Studio"
   - URL: "https://doitstudio.tech"
   - Logo: "https://doitstudio.tech/brand/developer-icon-512x512.jpg"
   - Slogan / Description: "Solo Venture Studio & Tech Mentorship Lab - Cybernetic Product Venture."
   - Founder: "Thành Lê" (`@type: "Person"`)
   - sameAs: GitHub, Facebook.
2. `getWebSiteSchema()`:
   - `@type: "WebSite"`
   - URL: "https://doitstudio.tech"
   - Name: "DoIT-Studio"
3. `getSoftwareAppSchema(app: AppMetadata)`:
   - Khai báo `@type: "SoftwareApplication"` cho từng ứng dụng:
     - **SecureVault**: Category `SecurityApplication`, OS `iOS, Android`, Price `0 VND`, Local-first privacy.
     - **NhàTa**: Category `LifestyleApplication`, OS `iOS, Android`, Gia đình, phân việc nhà và tài chính.
     - **NoduleTrack**: Category `HealthApplication`, OS `Android`, Theo dõi hạch tuyến giáp TI-RADS.
4. `getCourseAndServiceSchema()`:
   - Khai báo `@type: "Course"` ("IT & AI Coaching 1-on-1: AI-Augmented Developer Workflows") và `@type: "Service"` (Tư vấn kiến trúc & Phát triển phần mềm may đo).
5. `getArticleSchema(article: ArticleMetadata)`:
   - Khai báo `@type: "TechArticle"` / `"BlogPosting"` với headline, datePublished, dateModified, author, publisher.

#### 2.2.2 Component Render Schema (`src/components/StructuredData.astro`)
```astro
---
interface Props {
  schema: Record<string, any> | Array<Record<string, any>>;
}
const { schema } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

### 2.3 Epic 3: Content Hub & Triển Khai Bài Viết Triết Lý

#### 2.3.1 Cấu Hình Content Layer (`src/content.config.ts`)
Sử dụng chuẩn Content Layer của Astro:
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

#### 2.3.2 Template Động Cho Bài Viết (`src/pages/philosophy/[slug].astro`)
- **Data Fetching**: Dùng `getStaticPaths()` gọi `getCollection('philosophy')`.
- **Hiển thị bài viết**: Render `<Content />` bằng MDX parser của Astro.
- **Table of Contents (Mục Lục Tự Động)**:
  - Lấy mảng `headings` từ `render(entry)`.
  - Lọc các đề mục `depth === 2` (H2) và `depth === 3` (H3).
  - Hiển thị menu mục lục dạng Cyber HUD ở thanh bên (desktop) và collapsible ở đầu bài (mobile).
- **Typography & Styling**:
  - Kế thừa Tailwind `@tailwindcss/typography` với theme tối (`prose prose-invert prose-cyan lg:prose-lg max-w-none`).
  - Tinh chỉnh khoảng cách đọc, code block syntax highlighting, bảng số liệu và callout blocks.
- **Tác giả & CTA Matrix**:
  - Cuối bài đặt Bio Card của tác giả Thành Lê.
  - Call-to-action dẫn về sản phẩm liên quan (`/apps`) và dịch vụ coaching (`/profile`).

#### 2.3.3 Ba Bài Viết Chuyên Sâu Đạt Chuẩn SEO (> 1.500 từ/bài)
1. `src/content/philosophy/ky-nghe-zero-bloat-tu-duy-phan-mem-toi-gian.mdx`:
   - Tiêu đề: *Kỹ Nghệ Zero-Bloat: Tại Sao Sự Tối Giản Là Tương Lai Của Phần Mềm Hiện Đại*
   - Keywords: `kỹ nghệ zero-bloat`, `kiến trúc phần mềm tối giản`, `tối ưu hiệu suất web astro`, `clean code`
   - Nội dung: Hiện tượng Bloatware, chi phí bảo trì hệ thống, triết lý "Less is More", so sánh kích thước bundle và tốc độ tải trang, bài học thực tế từ dự án DoIT-Studio.
   - Internal Links: Dẫn về *SecureVault* và *DoTask Minimalist*.
2. `src/content/philosophy/tu-duy-ship-to-production-ai-augmented-developer.mdx`:
   - Tiêu đề: *Tư Duy Ship to Production: Tăng Tốc Xây Dựng Sản Phẩm Với AI-Augmented Engineering*
   - Keywords: `tư duy ship to production`, `học lập trình AI 1 on 1`, `AI coding Cursor Claude Gemini`, `nâng cao năng suất lập trình viên`
   - Nội dung: Phá vỡ bẫy "Tutorial Hell", quy trình 48h từ ý tưởng đến bản phát hành thực tế, cách phối hợp ăn ý giữa tư duy kỹ sư và AI Agents, kỹ năng prompt và code review cho AI.
   - Internal Links: Dẫn về gói đào tạo *IT & AI Coaching 1-on-1* (`/profile`) và danh mục `/apps`.
3. `src/content/philosophy/kien-truc-local-first-privacy-trong-ky-nguyen-ai.mdx`:
   - Tiêu đề: *Kiến Trúc Local-First & Quyền Riêng Tư: Định Hình Chuẩn Mực Ứng Dụng Mới*
   - Keywords: `kiến trúc local-first privacy`, `bảo mật dữ liệu cá nhân`, `app két sắt ẩn ảnh bảo mật`, `không lưu trữ máy chủ`
   - Nội dung: Rủi ro rò rỉ dữ liệu đám mây, các trụ cột của kiến trúc Local-First (Offline-First, Zero-Knowledge, mã hóa AES-256-GCM tại máy), cách triển khai với SQLite/Expo.
   - Internal Links: Dẫn về ứng dụng *SecureVault* và *NhàTa*.

#### 2.3.4 Cập Nhật Trang Danh Sách `src/pages/philosophy/index.astro`
- Thay thế mảng dữ liệu giả lập bằng truy vấn thực tế `await getCollection('philosophy')`.
- Sắp xếp bài viết theo thời gian mới nhất.

---

## 3. KẾ HOẠCH KIỂM THỬ VÀ XÁC THỰC (VERIFICATION PLAN)

### 3.1 Kiểm Tra Tự Động & Build
1. **Lệnh build tĩnh**:
   ```bash
   npm run build
   ```
   - Xác nhận biên dịch 100% không lỗi.
   - Kiểm tra xem file `dist/sitemap-index.xml` và `dist/sitemap-0.xml` có tồn tại và chứa đủ danh sách các URL trang chủ, apps, profile, philosophy và các bài viết slug.
   - Kiểm tra `dist/robots.txt` chứa đúng liên kết sitemap.

### 3.2 Kiểm Tra Thẻ SEO & Structured Data
1. **Kiểm tra mã nguồn HTML tạo ra (`dist/**/*.html`)**:
   - Thẻ `<link rel="canonical" href="...">` khớp với URL của từng trang.
   - Thẻ OpenGraph và Twitter Cards đầy đủ.
   - Script Google Analytics `G-64YJ3QLMEM` chỉ được nhúng ở bản build production.
   - Thẻ `<script type="application/ld+json">` xuất hiện hợp lệ, không bị lỗi cú pháp JSON.

### 3.3 Kiểm Tra Hiển Thị & Trải Nghiệm Người Dùng (UI/UX)
1. Khởi chạy dev server: `astro dev --background`
2. Kiểm tra trang `/philosophy`: hiển thị danh sách bài viết từ Content Collections.
3. Kiểm tra từng bài viết chi tiết `/philosophy/[slug]`:
   - Mục lục Table of Contents cuộn mượt đến các đề mục.
   - Các liên kết nội bộ dẫn chính xác về `/apps` và `/profile`.
   - Giao diện bài viết hiển thị sắc nét trên cả Mobile và Desktop.
