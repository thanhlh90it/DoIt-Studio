# 🌐 LANDING PAGE DESIGN BRIEF – SECUREVAULT (MVP 1.0)

Tài liệu này được biên soạn nhằm chuyển giao đầy đủ thông tin mô tả, cấu trúc wireframe, bộ nhận diện thương hiệu và danh sách tài nguyên hình ảnh có sẵn trong dự án để phục vụ cho việc thiết kế landing page giới thiệu ứng dụng **SecureVault**.

---

## I. THÔNG TIN CHUNG VỀ DỰ ÁN (PROJECT OVERVIEW)

* **Tên ứng dụng:** SecureVault (Phiên bản MVP 1.0)
* **Định vị sản phẩm:** Két sắt cá nhân bảo mật cao trên thiết bị di động, giúp ẩn và bảo vệ hình ảnh, video riêng tư tránh khỏi những ánh mắt tò mò.
* **Thông điệp cốt lõi (Tagline):** *Bảo mật cục bộ – An tâm tuyệt đối.*
* **Kiến trúc cốt lõi:** Vận hành hoàn toàn theo cơ chế **App Sandbox** (Local Storage), không lưu trữ dữ liệu trên máy chủ trung gian, đảm bảo tính riêng tư tối thượng cho người dùng.

---

## II. BỘ NHẬN DIỆN THƯƠNG HIỆU & PHONG CÁCH THIẾT KẾ (BRANDING & VISUAL IDENTITY)

Landing page cần truyền tải được cảm giác **công nghệ cao, an toàn, bảo mật tuyệt đối** nhưng vẫn **hiện đại và tối giản**.

### 1. Bảng Màu Chủ Đạo (Color Palette)
* 🖤 **Nền tối (Primary Dark):** `#000000` (Đen tuyền tối giản) và `#0A0E17` (Deep Space Navy - tạo chiều sâu cho giao diện).
* 🌐 **Màu nhấn công nghệ (Accent Cyan/Blue):** `#00F0FF` (Cyan điện tử - phát sáng neon giống trên logo) và `#007AFF` (Xanh dương hệ thống iOS/Android).
* ✉️ **Màu chữ (Typography Colors):** `#FFFFFF` (Chữ tiêu đề chính) và `#A0A5B5` (Chữ mô tả phụ, tạo độ tương phản dịu mắt).

### 2. Font Chữ Đề Xuất (Typography)
* **Tiêu đề (Headings):** Nên dùng các font sans-serif hình khối mạnh mẽ, hiện đại như **Montserrat**, **Inter Bold** hoặc **SF Pro Display**.
* **Nội dung (Body Text):** Sử dụng các font dễ đọc, độ dày vừa phải như **Inter Regular** hoặc **Roboto**.

### 3. Tài Nguyên Hình Ảnh Có Sẵn (Visual Assets in Studio)
* **Icon chính thức (`icon.png`):** Logo hình khiên bảo vệ (Shield) phát sáng Neon Cyan lồng ổ khóa ở trung tâm trên nền kính đen bo góc sang trọng.
* **Hình nền chủ đạo (`digital-bg.png`):** Họa tiết vi mạch điện tử (circuit board pattern) xanh cyan phát sáng mờ ảo trên nền tối, cực kỳ phù hợp để làm hình nền background cho Hero Section hoặc các khối tính năng.
* **Bộ ảnh Mockup điện thoại (`screenshot_*.jpg`):**
  * `screenshot_1_auth.jpg` (Auth): Màn hình nhập PIN và nhận diện khuôn mặt bảo mật.
  * `screenshot_2_albums.jpg` (Albums): Giao diện quản lý dạng lưới thư mục đa tầng khoa học.
  * `screenshot_3_viewer.jpg` (Viewer): Giao diện trình chiếu đa phương tiện toàn màn hình sắc nét.
  * `screenshot_4_security.jpg` (Security): Cơ chế làm mờ màn hình bảo vệ Blur Shield và chống chụp quay màn hình.

---

## III. CẤU TRÚC CHI TIẾT CỦA LANDING PAGE (LANDING PAGE STRUCTURE)

Một landing page tiêu chuẩn chuyển đổi cao cho SecureVault nên gồm **5 Section chính** sau:

### 1. SECTION 1: HERO SECTION (ẤN TƯỢNG ĐẦU TIÊN)
* **Mục tiêu:** Thuyết phục người dùng trong 3 giây đầu tiên về tính năng và độ an toàn của app.
* **Nội dung:**
  * **H1 (Tiêu đề chính):** *Két Sắt Số Cá Nhân – Bảo Mật Ảnh & Video Tuyệt Đối.*
  * **Sub-headline:** *Lưu trữ khép kín hoàn toàn trên thiết bị của bạn. Không máy chủ trung gian, không rò rỉ dữ liệu.*
  * **Nút CTA:** Bộ đôi nút tải xuống *"Download on the App Store"* và *"Get it on Google Play"* (Sử dụng hiệu ứng viền phát sáng màu Cyan `#00F0FF`).
* **Visual:** Ảnh Mockup điện thoại 3D chạy giao diện xác thực (`screenshot_1_auth.jpg`) lồng trên nền vi mạch điện tử (`digital-bg.png`).

### 2. SECTION 2: TẠI SAO CHỌN SECUREVAULT? (CORE USP)
* **Mục tiêu:** Nhấn mạnh sự khác biệt về mặt công nghệ bảo mật của SecureVault so với các ứng dụng khác trên thị trường.
* **Nội dung (Trình bày dạng lưới 3 cột kèm icon tối giản):**
  1. **100% Cục Bộ (Local Storage Sandbox):** Ảnh và video của bạn được lưu trong phân vùng Sandbox khép kín của hệ điều hành. Tuyệt đối không tải lên đám mây, loại bỏ hoàn toàn rủi ro bị hacker tấn công máy chủ.
  2. **Sinh Trắc Học Tích Hợp:** Mở khóa két sắt tức thì dưới 1 giây bằng Face ID, Touch ID hoặc mã PIN bảo mật đã mã hóa băm cục bộ.
  3. **Mượt Mà & Hiệu Năng Cao:** Trải nghiệm cuộn mượt mà không độ trễ ngay cả khi bạn có hơn 1000 ảnh và video chất lượng cao nhờ công nghệ tối ưu tải tài nguyên (Lazy load).

### 3. SECTION 3: KHÁM PHÁ CÁC TÍNH NĂNG CỐT LÕI (FEATURE SHOWCASE)
* **Mục tiêu:** Giúp người dùng hình dung rõ nét cách hoạt động thực tế của ứng dụng.
* **Nội dung (Trình bày xen kẽ dạng Z-pattern - Text bên trái, Mockup bên phải và ngược lại):**
  * **Tính năng 1: Quản lý Album Đa Tầng**
    * *Mô tả:* Phân loại hình ảnh, video nhạy cảm thành từng thư mục chuyên biệt. Dễ dàng di chuyển, sắp xếp tệp linh hoạt theo ý muốn.
    * *Hình ảnh đi kèm:* Mockup sử dụng ảnh `screenshot_2_albums.jpg`.
  * **Tính năng 2: Trình Xem Toàn Màn Hình & Khôi Phục Siêu Tốc**
    * *Mô tả:* Trải nghiệm xem ảnh toàn màn hình với zoom mượt mà 3x và trình phát video tích hợp. Hỗ trợ khôi phục (Export) ảnh ngược lại Album điện thoại bất kỳ lúc nào.
    * *Hình ảnh đi kèm:* Mockup sử dụng ảnh `screenshot_3_viewer.jpg`.
  * **Tính năng 3: Blur Shield & Chống Chụp Màn Hình**
    * *Mô tả:* Ngăn chặn chụp ảnh hay quay phim màn hình trên thiết bị. Tự động che mờ ứng dụng bằng lớp màn bảo vệ (Blur Shield) khi bạn chuyển sang chế độ đa nhiệm.
    * *Hình ảnh đi kèm:* Mockup sử dụng ảnh `screenshot_4_security.jpg`.

### 4. SECTION 4: QUY TRÌNH HOẠT ĐỘNG 3 BƯỚC (HOW IT WORKS)
* **Mục tiêu:** Minh họa sự đơn giản, nhanh chóng trong khâu sử dụng.
* **Nội dung (Hiển thị dạng dòng thời gian ngang 1-2-3):**
  * **Bước 1 – Thiết lập khóa:** Cài đặt mã PIN và kích hoạt Face ID chỉ trong lần đầu mở app.
  * **Bước 2 – Nhập file cực nhanh:** Chọn hàng loạt ảnh/video nhạy cảm từ thư viện điện thoại đưa vào Két sắt.
  * **Bước 3 – Tự động dọn dẹp:** Hệ thống tự động kích hoạt lệnh hỏi xóa file gốc khỏi thư viện máy để xóa sạch hoàn toàn dấu vết gốc chưa được bảo vệ.

### 5. SECTION 5: FOOTER & TRUNG TÂM PHÁP LÝ (LEGAL & DOWNLOAD)
* **Mục tiêu:** Tạo dựng niềm tin cuối cùng và cung cấp các tài liệu pháp lý bắt buộc.
* **Nội dung:**
  * Khối liên kết tải ứng dụng.
  * Cam kết bảo mật của nhà phát triển.
  * **Đường dẫn tải tài liệu pháp lý:** 
    * [Chính sách Quyền riêng tư (Privacy Policy)](chinh-sach-quyen-rieng-tu.pdf)
    * [Bảng Khai báo An toàn dữ liệu (Data Safety Statement)](bang-khai-bao-an-toan-du-lieu.pdf)
  * Thông tin bản quyền: *© 2026 SecureVault. Generated by Gemini Notebook.*

---
*Tài liệu được thiết kế nhằm tối ưu hóa việc truyền đạt ý tưởng từ Product Owner sang UI/UX Designer hoặc Developer phát triển Front-end.*
