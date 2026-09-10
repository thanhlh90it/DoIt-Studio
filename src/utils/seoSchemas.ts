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
