# Kế Hoạch Triển Khai Trang Pháp Lý & An Toàn Ứng Dụng Tevy

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng trang trung tâm Pháp lý & An toàn (`/tevy/legal`) cho ứng dụng Tevy bao gồm Điều khoản dịch vụ, Chính sách quyền riêng tư và Cam kết bảo vệ an toàn trẻ em (COPPA, Google Play Families), cùng các route chuyển hướng store và cập nhật liên kết footer.

**Architecture:** Tạo trang Astro độc lập kế thừa Design Tokens (`/tevy/css/tokens.css`), bố cục 2 cột với Sticky Sidebar TOC & Scrollspy trên Desktop và Horizontal Pill Bar trên Mobile. Thêm các route alias redirects 302 cho `/tevy/terms`, `/tevy/privacy`, `/tevy/child-safety`, `/apps/tevy/privacy` và cập nhật liên kết footer của `src/pages/tevy/index.astro`.

**Tech Stack:** Astro, HTML5, Vanilla CSS (kế thừa Tokens CSS), Schema.org JSON-LD Structured Data.

**Spec:** `docs/superpowers/specs/2026-09-26-tevy-legal-safety-page-design.md`

## Global Constraints

- Tuân thủ nghiêm ngặt bảng màu và design tokens của Tevy (`--tevy-primary: #2563EB`, `--tevy-accent: #F97316`, `--tevy-safe: #10B981`, font Plus Jakarta Sans & JetBrains Mono).
- Ngôn ngữ: 100% Tiếng Việt chuẩn văn phong pháp lý, quyền riêng tư và an toàn trẻ em.
- Tuân thủ quy chuẩn COPPA, GDPR-K, Luật Trẻ em Việt Nam 2016 và Google Play Families Policy.
- Mọi trang chuyển hướng phải sử dụng Astro redirect 302 hợp lệ sang canonical route `/tevy/legal#...`.
- Bản build production (`npm run build`) phải hoàn thành thành công không có lỗi.

---

### Task 1: Tạo Các Tuyến Đường Chuyển Hướng Kho Ứng Dụng (Store Redirects)

**Files:**
- Create: `src/pages/tevy/terms.astro`
- Create: `src/pages/tevy/privacy.astro`
- Create: `src/pages/tevy/child-safety.astro`
- Create: `src/pages/apps/tevy/privacy.astro`

**Interfaces:**
- Consumes: Canonical URL `/tevy/legal#terms`, `/tevy/legal#privacy`, `/tevy/legal#child-safety`
- Produces: Tuyến đường chuyển hướng HTTP 302 cho Google Play Console, App Store Connect và bot kiểm duyệt

- [ ] **Step 1: Tạo `src/pages/tevy/terms.astro`**

```astro
---
// Redirect sang trang Pháp lý chính thức - Mục Điều khoản dịch vụ
return Astro.redirect('/tevy/legal#terms');
---
```

- [ ] **Step 2: Tạo `src/pages/tevy/privacy.astro`**

```astro
---
// Redirect sang trang Pháp lý chính thức - Mục Chính sách quyền riêng tư
return Astro.redirect('/tevy/legal#privacy');
---
```

- [ ] **Step 3: Tạo `src/pages/tevy/child-safety.astro`**

```astro
---
// Redirect sang trang Pháp lý chính thức - Mục Bảo vệ an toàn trẻ em
return Astro.redirect('/tevy/legal#child-safety');
---
```

- [ ] **Step 4: Tạo `src/pages/apps/tevy/privacy.astro`**

```astro
---
// Redirect sang trang Pháp lý chính thức - Mục Chính sách quyền riêng tư
return Astro.redirect('/tevy/legal#privacy');
---
```

- [ ] **Step 5: Kiểm tra các file chuyển hướng bằng Astro build hoặc kiểm tra cú pháp**

Run: `npx astro check --files src/pages/tevy/*.astro`
Expected: Không có lỗi cú pháp

- [ ] **Step 6: Commit**

```bash
git add src/pages/tevy/terms.astro src/pages/tevy/privacy.astro src/pages/tevy/child-safety.astro src/pages/apps/tevy/privacy.astro
git commit -m "feat(tevy): add store redirect routes for legal, terms, privacy, and child safety"
```

---

### Task 2: Xây Dựng Trang Pháp Lý & An Toàn `src/pages/tevy/legal.astro`

**Files:**
- Create: `src/pages/tevy/legal.astro`

**Interfaces:**
- Consumes: `/tevy/css/tokens.css`, `/tevy/assets/tevy-logo-horizontal.svg`, `/tevy/assets/tevy-og-banner.png`, font Plus Jakarta Sans & JetBrains Mono
- Produces: Trang web trung tâm `/tevy/legal` chứa đầy đủ 3 chương Điều khoản dịch vụ, Chính sách quyền riêng tư, Bảo vệ an toàn trẻ em, thẻ Meta SEO/ASO, Schema.org JSON-LD và giao diện tương tác Sticky TOC & Scrollspy

- [ ] **Step 1: Tạo cấu trúc HTML, Head, SEO metadata và JSON-LD Structured Data**

Tạo `src/pages/tevy/legal.astro` với:
- Meta title, description, canonical link `https://doitstudio.tech/tevy/legal/`, Open Graph, Twitter Cards.
- Structured Data JSON-LD (`WebPage`, `BreadcrumbList`, `Organization`).
- Link stylesheet: `/tevy/css/tokens.css` và style nhúng tối ưu cho trang pháp lý (Sticky Sidebar, Glass card, Highlight badges, Print stylesheet).

- [ ] **Step 2: Triển khai DoIT Studio Top Bar và Header Section**

- Top bar liên kết về DoIT Studio `/apps` và Tevy `/tevy`.
- Banner tiêu đề với Breadcrumb, Badge "GOOGLE PLAY FAMILIES & COPPA COMPLIANT", tiêu đề H1 và ngày hiệu lực `26/09/2026`.
- Executive Summary Card: 4 cam kết cốt lõi dành cho cha mẹ (Không quảng cáo bên thứ 3, Không thu thập video/hình ảnh, Mã hóa an toàn, Quyền kiểm soát thuộc phụ huynh).

- [ ] **Step 3: Triển khai Sticky Sidebar Navigation và Mobile Pill Bar**

- Cột trái desktop: 3 chương lớn `#terms`, `#privacy`, `#child-safety` kèm danh sách mục con và số thứ tự rõ ràng.
- Nút "In hoặc Lưu PDF" (`window.print()`).
- Hộp hỗ trợ nhanh với email `support@doitstudio.com`.
- Mobile pill bar: Thanh cuộn ngang cố định với hiệu ứng cuộn mượt khi bấm.

- [ ] **Step 4: Soạn thảo chi tiết Chương I - Điều khoản Dịch vụ (`#terms`)**

- 1.1. Giới thiệu & Thỏa thuận sử dụng.
- 1.2. Cơ chế ghép đôi an toàn & Quản lý mã PIN phụ huynh 4 số.
- 1.3. Phân định tính năng Gói Cơ bản (Miễn phí trọn đời) & Gói Nâng cao.
- 1.4. Quyền và nghĩa vụ của người sử dụng.
- 1.5. Giới hạn trách nhiệm (Disclaimer) - Công cụ hỗ trợ cha mẹ, không thay thế hoàn toàn sự đồng hành trực tiếp.
- 1.6. Chấm dứt dịch vụ & Sửa đổi điều khoản.

- [ ] **Step 5: Soạn thảo chi tiết Chương II - Chính sách Quyền Riêng Tư (`#privacy`)**

- 2.1. Nguyên tắc tối thiểu hóa dữ liệu (Data Minimization).
- 2.2. Bảng kê minh bạch quyền hạn ứng dụng:
  * Android TV / Google TV: `SYSTEM_ALERT_WINDOW`, `RECEIVE_BOOT_COMPLETED`, `FOREGROUND_SERVICE`, `INTERNET`.
  * Mobile Parent App: `POST_NOTIFICATIONS`.
  * Bảng cam kết 5 KHÔNG (Không Camera, Không Micro, Không chụp màn hình nội dung bé xem, Không GPS, Không đọc dữ liệu cá nhân).
- 2.3. Cơ chế mã hóa và lưu trữ an toàn (Hardware Keystore băm mã PIN, TLS 1.3).
- 2.4. Quyền của người dùng đối với dữ liệu (Quyền xem, quyền hủy ghép đôi và xóa sạch dữ liệu).

- [ ] **Step 6: Soạn thảo chi tiết Chương III - Bảo Vệ An Toàn Trẻ Em (`#child-safety`)**

- 3.1. Khung pháp lý & Chính sách quốc tế tuân thủ (Luật Trẻ em 2016, COPPA, GDPR-K, Google Play Families Policy, Apple Kids Guidelines).
- 3.2. Chính sách Không Quảng cáo Bên thứ ba (Zero Third-Party Ads).
- 3.3. Cổng bảo vệ Phụ huynh (Parental Gate & PIN Anti-Bypass, thiết kế hình ảnh chú gấu Tevy ngủ ngơi tâm lý tích cực).
- 3.4. Đầu mối hỗ trợ & Tiếp nhận phản ánh khẩn cấp (`support@doitstudio.com`).

- [ ] **Step 7: Tích hợp Script Scrollspy và Smooth Scrolling**

- JavaScript tự động cập nhật class `active` cho mục lục ở sidebar khi cuộn trang qua từng section.
- Xử lý hash URL khi tải trang để cuộn mượt tới đúng section `#terms`, `#privacy`, `#child-safety`.

- [ ] **Step 8: Chạy kiểm tra build và render**

Run: `npm run build`
Expected: Build thành công trang `/tevy/legal`

- [ ] **Step 9: Commit**

```bash
git add src/pages/tevy/legal.astro
git commit -m "feat(tevy): create comprehensive legal and safety page"
```

---

### Task 3: Cập Nhật Liên Kết Footer Tại Trang Chủ Tevy

**Files:**
- Modify: `src/pages/tevy/index.astro:881-888`

**Interfaces:**
- Consumes: `/tevy/legal#terms`, `/tevy/legal#privacy`, `/tevy/legal#child-safety`
- Produces: Footer links chuẩn trỏ tới các anchor tương ứng trên trang pháp lý

- [ ] **Step 1: Cập nhật các liên kết footer**

Thay thế:
```html
        <div>
          <div class="footer-title">Pháp lý & An toàn</div>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Điều khoản dịch vụ</a></li>
            <li><a href="#" class="footer-link">Chính sách quyền riêng tư</a></li>
            <li><a href="#" class="footer-link">Bảo vệ an toàn trẻ em (COPPA)</a></li>
          </ul>
        </div>
```
Thành:
```html
        <div>
          <div class="footer-title">Pháp lý & An toàn</div>
          <ul class="footer-links">
            <li><a href="/tevy/legal#terms" class="footer-link">Điều khoản dịch vụ</a></li>
            <li><a href="/tevy/legal#privacy" class="footer-link">Chính sách quyền riêng tư</a></li>
            <li><a href="/tevy/legal#child-safety" class="footer-link">Bảo vệ an toàn trẻ em (COPPA)</a></li>
          </ul>
        </div>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/tevy/index.astro
git commit -m "fix(tevy): link footer legal and safety items to /tevy/legal anchors"
```

---

### Task 4: Kiểm Thử & Xác Nhận Toàn Diện (End-to-End Verification)

**Files:**
- Check: Toàn bộ các file vừa tạo và sửa đổi

- [ ] **Step 1: Chạy build production toàn bộ website**

Run: `npm run build`
Expected: `✓ Completed in ...` với mã thoát 0, không có bất kỳ cảnh báo hoặc lỗi cú pháp nào.

- [ ] **Step 2: Kiểm tra các tệp đầu ra trong thư mục `dist`**

Run: `ls -la dist/tevy/`
Expected: Có `legal/index.html`, `terms/index.html` (hoặc redirect), `privacy/index.html`, `child-safety/index.html`.

- [ ] **Step 3: Kiểm tra định dạng và khả năng in ấn**

Xác minh `@media print` trong `src/pages/tevy/legal.astro` ẩn thanh sidebar và footer, tối ưu trang in.

- [ ] **Step 4: Commit và tổng kết hoàn tất**

```bash
git status
```
Expected: Clean working tree
