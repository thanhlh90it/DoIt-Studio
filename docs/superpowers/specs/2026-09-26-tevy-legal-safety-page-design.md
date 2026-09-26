# Thiết Kế Trang Pháp Lý & An Toàn Ứng Dụng Tevy

- **Mã tài liệu:** `SPEC-TEVY-LEGAL-SAFETY-20260926`
- **Ngày lập:** 26/09/2026
- **Tác giả:** DOIT Studio
- **Trạng thái:** Đã được phê duyệt thiết kế
- **Mục tiêu:** Xây dựng trang trung tâm Pháp lý & An toàn hợp nhất cho ứng dụng Tevy (Kids TV Parental Control), bao gồm Điều khoản dịch vụ, Chính sách quyền riêng tư và Cam kết bảo vệ an toàn trẻ em theo tiêu chuẩn Luật Trẻ em Việt Nam 2016, COPPA, GDPR-K và Google Play Families Policy.

---

## 1. Mục Đích & Bối Cảnh

Ứng dụng Tevy là giải pháp giám sát thời gian xem TV thông minh cho trẻ em (hỗ trợ Android TV / Google TV và ứng dụng di động cho phụ huynh trên iOS/Android).
Để phát hành và tuân thủ đầy đủ chính sách của Google Play Store (đặc biệt là chương trình Designed for Families) và Apple App Store (Kids Category), Tevy cần một trang Pháp lý & An toàn công khai, minh bạch, chuyên nghiệp với đầy đủ 3 trụ cột:
1. **Điều khoản dịch vụ (Terms of Service)**
2. **Chính sách quyền riêng tư (Privacy Policy)**
3. **Bảo vệ an toàn trẻ em (Children's Online Safety Policy & COPPA)**

---

## 2. Kiến Trúc & Cấu Trúc URL

### 2.1. Cấu trúc Route & File
- **Trang trung tâm chính:** `src/pages/tevy/legal.astro` (truy cập tại `https://doitstudio.tech/tevy/legal`)
- **Các trang chuyển hướng Store (Redirects):**
  - `src/pages/tevy/terms.astro` ➡️ Chuyển hướng 302 sang `/tevy/legal#terms`
  - `src/pages/tevy/privacy.astro` ➡️ Chuyển hướng 302 sang `/tevy/legal#privacy`
  - `src/pages/tevy/child-safety.astro` ➡️ Chuyển hướng 302 sang `/tevy/legal#child-safety`
  - `src/pages/apps/tevy/privacy.astro` ➡️ Chuyển hướng 302 sang `/tevy/legal#privacy`
- **Cập nhật liên kết trang chủ:** `src/pages/tevy/index.astro` (thay thế các liên kết `#` trong phần Footer thành `/tevy/legal#terms`, `/tevy/legal#privacy`, `/tevy/legal#child-safety`).

---

## 3. Thiết Kế Giao Diện & Trải Nghiệm Người Dùng (UI/UX)

### 3.1. Nhận diện thương hiệu & Design Tokens
- Kế thừa toàn bộ hệ thống token từ `/tevy/css/tokens.css`:
  - **Màu chính:** `--tevy-primary: #2563EB` (Xanh công nghệ tin cậy), `--tevy-primary-subtle: #DBEAFE`.
  - **Màu điểm nhấn:** `--tevy-accent: #F97316` (Cam năng động, ấm áp), `--tevy-accent-subtle: #FFEDD5`.
  - **Màu trạng thái an toàn:** `--tevy-safe: #10B981` (Xanh lá bảo vệ), `--tevy-safe-bg: #D1FAE5`.
  - **Bề mặt & Card:** Nền sáng dịu mắt `--tevy-mobile-bg: #F8FAFC`, card trắng `--tevy-mobile-card: #FFFFFF` với viền `--tevy-mobile-border: #E2E8F0`, đổ bóng mềm `--tevy-shadow-md`.
  - **Typography:** `Plus Jakarta Sans` cho nội dung văn bản và `JetBrains Mono` cho nhãn hệ thống/kỹ thuật.

### 3.2. Bố cục trang
1. **DoIT Studio Ecosystem Top Bar:**
   - Liên kết quay lại DoIT Studio: `/apps`
   - Liên kết quay lại Tevy Landing Page: `/tevy`
   - Chỉ báo trạng thái hệ thống: "DOIT STUDIO ECOSYSTEM · TEVY LEGAL & SAFETY"
2. **Banner tiêu đề trang (Hero Section):**
   - Breadcrumb điều hướng: `Trang chủ / Ứng dụng / Tevy / Pháp lý & An toàn`
   - Badge kiểm định: `GOOGLE PLAY FAMILIES & COPPA COMPLIANT`
   - Tiêu đề H1: `Pháp Lý & An Toàn – Ứng Dụng Tevy`
   - Metadata: Phiên bản tài liệu `v1.0.0`, Ngày có hiệu lực: `26/09/2026`, Đơn vị phát hành: `DOIT Studio`.
3. **Thẻ Tóm Tắt Dành Cho Cha Mẹ (Executive Summary Card):**
   - 4 cam kết cốt lõi:
     - 🚫 **100% Không quảng cáo bên thứ ba:** Không chứa quảng cáo thương mại hoặc mã theo dõi hành vi trẻ.
     - 🔒 **Không thu thập video / hình ảnh / âm thanh:** Không mở camera, không kích hoạt micro, không chụp ảnh màn hình sinh hoạt của gia đình.
     - 🛡️ **Bảo mật tuyệt đối:** Mã PIN phụ huynh được mã hóa cục bộ; lệnh điều khiển được mã hóa đầu cuối qua TLS 1.3.
     - 👨‍👩‍👧 **Quyền làm chủ thuộc về cha mẹ:** Dễ dàng hủy ghép đôi và xóa sạch dữ liệu khỏi hệ thống bất kỳ lúc nào.
4. **Bố cục 2 cột (Desktop):**
   - **Cột trái (Sticky Sidebar Navigation ~300px):**
     - Danh sách 3 chương chính và các mục con.
     - Scrollspy: Tự động highlight mục đang xem khi cuộn chuột.
     - Nút tiện ích: "In hoặc Lưu PDF" (`window.print()`).
     - Hộp thông tin hỗ trợ nhanh với email: `support@doitstudio.com`.
   - **Cột phải (Nội dung chính):** Toàn văn 3 chương pháp lý với định dạng bài bản, các bảng biểu minh bạch và khối lưu ý quan trọng.
5. **Giao diện di động (Mobile Responsive):**
   - Sticky Horizontal Menu Bar gồm các nút pill cuộn ngang mượt mà.
   - Các bảng biểu hỗ trợ cuộn ngang (`overflow-x: auto`) không làm vỡ bố cục màn hình nhỏ.
6. **Tối ưu in ấn (Print Stylesheet):**
   - Tự động ẩn thanh điều hướng, footer và sidebar khi in (`@media print`), căn lề chuẩn văn bản PDF trang trọng.

---

## 4. Chi Tiết Nội Dung 3 Chương Pháp Lý

### 4.1. Chương I: Điều Khoản Dịch Vụ (Terms of Service - `#terms`)
- **1.1. Phạm vi & Đối tượng áp dụng:**
  - Định nghĩa dịch vụ Tevy gồm ứng dụng di động cho phụ huynh (Tevy Parent) và ứng dụng Smart TV (Tevy TV Client) do DOIT Studio phát triển.
  - Điều kiện sử dụng: Người dùng phải là cha mẹ hoặc người giám hộ hợp pháp từ 18 tuổi trở lên.
- **1.2. Đăng ký & Ghép đôi an toàn:**
  - Cơ chế ghép đôi qua mã ghép 6 ký tự ngẫu nhiên, không yêu cầu cung cấp thông tin nhân thân phức tạp.
  - Quản trị mã PIN phụ huynh 4 số: Trách nhiệm của phụ huynh trong việc giữ bí mật mã PIN để ngăn trẻ thoát ứng dụng trên TV.
- **1.3. Cơ cấu tính năng & Gói dịch vụ:**
  - Gói Cơ bản (Miễn phí vĩnh viễn): Kết nối 1 TV, khóa từ xa 1 chạm, chu kỳ nghỉ mắt tự động 30 phút.
  - Gói Nâng cao (Tùy chọn tương lai): Đồng bộ nhiều TV, thống kê thói quen sử dụng chi tiết theo tuần/tháng.
- **1.4. Quyền & Nghĩa vụ của Người dùng:**
  - Cam kết chỉ cài đặt ứng dụng trên các thiết bị thuộc quyền sở hữu hoặc giám sát hợp pháp của gia đình.
  - Không cố tình dịch ngược, sửa đổi hoặc khai thác lỗ hổng kỹ thuật của hệ thống.
- **1.5. Giới hạn trách nhiệm (Disclaimer):**
  - Tevy là giải pháp công nghệ trợ lực, không thể thay thế hoàn toàn sự quan tâm, trò chuyện và định hướng trực tiếp từ cha mẹ.
  - DOIT Studio không chịu trách nhiệm trong các tình huống thiết bị mất kết nối Internet hoặc lỗi phần cứng từ nhà sản xuất TV.
- **1.6. Chấm dứt dịch vụ & Sửa đổi điều khoản:**
  - Người dùng có thể chấm dứt sử dụng bất kỳ lúc nào bằng cách hủy ghép đôi và gỡ ứng dụng.
  - Mọi cập nhật trọng yếu sẽ được thông báo trước ít nhất 15 ngày trên website và trong ứng dụng.

### 4.2. Chương II: Chính Sách Quyền Riêng Tư (Privacy Policy - `#privacy`)
- **2.1. Triết lý "Tối thiểu hóa dữ liệu" (Data Minimization):**
  - Không thu thập họ tên, ngày sinh, trường học, hình ảnh nhận diện của trẻ em.
  - Dữ liệu vận hành chỉ bao gồm: Mã định danh thiết bị ẩn danh (Anonymous Device UUID), mã ghép đôi tạm thời, thời lượng phiên xem TV (phút), trạng thái trực tuyến của TV (Online/Offline).
- **2.2. Bảng kê minh bạch quyền hạn ứng dụng (App Permissions Breakdown):**
  - **Android TV / Google TV Client:**
    - `SYSTEM_ALERT_WINDOW`: Cho phép hiển thị giao diện khóa màn hình và cảnh báo nghỉ mắt đè lên các ứng dụng phát video khi hết giờ.
    - `RECEIVE_BOOT_COMPLETED`: Tự động khởi chạy bộ đếm thời gian an toàn ngay khi Smart TV khởi động.
    - `FOREGROUND_SERVICE`: Duy trì kết nối thời gian thực ổn định giữa Smart TV và điện thoại phụ huynh.
    - `INTERNET` & `ACCESS_NETWORK_STATE`: Nhận lệnh khóa/mở từ phụ huynh qua giao thức an toàn.
  - **Mobile Parent App (iOS / Android):**
    - `POST_NOTIFICATIONS`: Gửi cảnh báo đến điện thoại phụ huynh khi bé xem quá giới hạn hoặc bật TV ngoài giờ quy định.
  - **Cam kết 5 KHÔNG tuyệt đối:**
    1. ❌ Không kích hoạt Camera hoặc cảm biến hình ảnh.
    2. ❌ Không kích hoạt Micro ghi âm phòng khách.
    3. ❌ Không chụp màn hình (Screenshot) nội dung video bé đang thưởng thức.
    4. ❌ Không thu thập dữ liệu định vị GPS.
    5. ❌ Không đọc danh bạ, tin nhắn hoặc thư viện ảnh trên điện thoại phụ huynh.
- **2.3. Bảo mật lưu trữ & Mã hóa:**
  - Mã PIN phụ huynh được băm an toàn (cryptographic hash) và lưu trữ cục bộ trong Android Keystore / iOS Keychain.
  - Kênh truyền tải dữ liệu điều khiển được bảo vệ qua mã hóa TLS 1.3 / HTTPS.
- **2.4. Quyền của Người dùng đối với Dữ liệu (User Data Rights):**
  - Quyền kiểm tra, xem lại thống kê thời lượng sử dụng.
  - Quyền xóa dữ liệu (Right to Erasure): Chỉ cần chọn "Hủy ghép đôi & Xóa dữ liệu", toàn bộ bản ghi trạng thái kết nối sẽ lập tức bị xóa vĩnh viễn khỏi hệ thống.

### 4.3. Chương III: Cam Kết Bảo Vệ An Toàn Trẻ Em (Child Safety - `#child-safety`)
- **3.1. Tuân thủ Pháp luật & Quy chuẩn Quốc tế:**
  - **Việt Nam:** Luật Trẻ em số 102/2016/QH13 và Nghị định số 56/2017/NĐ-CP về trách nhiệm bảo vệ trẻ em trên môi trường mạng.
  - **Hoa Kỳ:** Đạo luật bảo vệ quyền riêng tư của trẻ em trên mạng (**COPPA** - 16 CFR Part 312).
  - **Châu Âu:** Quy định chung về bảo vệ dữ liệu dành cho trẻ em (**GDPR-K**).
  - **Kho ứng dụng:** Chính sách gia đình (**Google Play Families Policy**) & Quy chuẩn danh mục Trẻ em (**Apple App Store Kids Guidelines**).
- **3.2. Không Quảng cáo Thương mại Bên thứ ba:**
  - Ứng dụng không tích hợp bất kỳ SDK quảng cáo nào (AdMob, Unity Ads, Facebook Audience Network...).
  - Không có quảng cáo nhắm mục tiêu hành vi (Behavioral Advertising).
- **3.3. Cổng bảo vệ Phụ huynh (Parental Gate & Anti-Bypass Mechanism):**
  - Mọi thao tác cấu hình lại thời gian, tắt giám sát hoặc gỡ cài đặt đều đòi hỏi vượt qua mã PIN phụ huynh 4 số.
  - Thiết kế tâm lý tích cực: Giao diện khóa TV được thể hiện bằng hình tượng chú gấu Tevy đáng yêu đang ngủ cùng thông điệp nhắc nhở vận động mắt nhẹ nhàng, không gây ức chế, hoảng sợ hay tranh chấp tâm lý cho trẻ nhỏ.
- **3.4. Đầu mối hỗ trợ & Tiếp nhận phản ánh an toàn:**
  - Hộp thư chuyên trách: `support@doitstudio.com`.
  - Cam kết phản hồi và xử lý các thắc mắc liên quan đến an toàn trẻ em trong vòng 24 giờ làm việc.

---

## 5. SEO, Khả Năng Tiếp Cận & Chuẩn Hóa Schema

- **Thẻ Meta SEO:**
  - `title`: `Pháp Lý & An Toàn | Tevy - Điều Khoản Dịch Vụ, Quyền Riêng Tư & Bảo Vệ Trẻ Em`
  - `description`: `Tài liệu công bố chính thức về Điều khoản dịch vụ, Chính sách quyền riêng tư và Cam kết bảo vệ an toàn trẻ em (COPPA, Google Play Families) của ứng dụng Tevy.`
  - `keywords`: `tevy legal, chính sách quyền riêng tư tevy, điều khoản dịch vụ tevy, bảo vệ an toàn trẻ em, coppa tevy, google play families policy`
  - `canonical`: `https://doitstudio.tech/tevy/legal/`
- **Thẻ Open Graph & Twitter Cards:**
  - Hình ảnh chia sẻ: `https://doitstudio.tech/tevy/assets/tevy-og-banner.png`
- **Structured Data (JSON-LD):**
  - `WebPage` với `BreadcrumbList` rõ ràng.
  - `Organization` chỉ định đơn vị chủ quản là DOIT Studio.
- **Accessibility (A11y):**
  - Độ tương phản màu sắc đạt chuẩn WCAG AA+.
  - Cấu trúc tiêu đề ngữ nghĩa từ `h1`, `h2`, `h3` chặt chẽ.
  - Hỗ trợ điều hướng bằng bàn phím (Tab navigation).

---

## 6. Kế Hoạch Xác Minh & Kiểm Thử (Verification Plan)

1. **Kiểm tra cú pháp & Build:** Chạy `npm run build` trên project Astro để đảm bảo tất cả các file Astro mới và redirect route biên dịch thành công.
2. **Kiểm tra liên kết điều hướng & Anchor Links:**
   - Truy cập `/tevy/legal` xem có tải mượt mà.
   - Nhấp vào các anchor `#terms`, `#privacy`, `#child-safety` xem vị trí cuộn có chính xác.
   - Kiểm tra các route redirect `/tevy/terms`, `/tevy/privacy`, `/tevy/child-safety`, `/apps/tevy/privacy` chuyển hướng đúng địa chỉ.
3. **Kiểm tra Footer tại [src/pages/tevy/index.astro](file:///Users/thanhle/Workspaces/DoIt-Studio/src/pages/tevy/index.astro):** Xác nhận các link "Điều khoản dịch vụ", "Chính sách quyền riêng tư", "Bảo vệ an toàn trẻ em (COPPA)" đã được cập nhật thành các đường dẫn mới.
4. **Kiểm tra Responsive & Print:** Kiểm tra hiển thị trên Mobile và giao diện khi gọi lệnh Print.
