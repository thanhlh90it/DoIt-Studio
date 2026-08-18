/**
 * NoduleTrack Internationalization (i18n) Engine
 * Supports seamless 0ms instant bilingual switching (Vietnamese & English)
 */

const translations = {
  vi: {
    // Meta & Head
    "meta.title": "NoduleTrack - Minh bạch diễn biến, An tâm điều trị | Ứng dụng theo dõi U, Nang, Hạch, Polyp",
    "meta.description": "NoduleTrack là ứng dụng di động y tế cá nhân chuyên biệt hỗ trợ số hóa hồ sơ siêu âm, theo dõi tốc độ tăng trưởng của nang, nhân, hạch và nhắc lịch tái khám chuẩn TI-RADS/BI-RADS.",

    // Navbar
    "nav.features": "Tính năng",
    "nav.pathologies": "4 Dạng Sang thương",
    "nav.simulator": "Mô phỏng Tăng trưởng",
    "nav.summary": "Báo cáo Bác sĩ",
    "nav.faq": "Hỏi đáp",
    "nav.download": "Tải ứng dụng",

    // Hero Section
    "hero.badge": "✨ Chuẩn phân loại lâm sàng TI-RADS & BI-RADS Quốc Tế",
    "hero.title": "Minh bạch diễn biến.<br/><span class=\"text-gradient\">An tâm điều trị.</span>",
    "hero.subtitle": "Loại bỏ nỗi lo thất lạc phiếu siêu âm cũ. NoduleTrack tự động hóa việc theo dõi diễn biến kích thước u nang, nhân giáp, hạch và polyp qua từng mốc khám — trực quan, chính xác và bảo mật tuyệt đối.",
    "hero.cta_appstore": "Tải trên App Store",
    "hero.cta_playstore": "Tải trên Google Play",
    "hero.cta_qr": "Quét mã QR tải nhanh",
    "hero.trust_privacy": "100% Quyền riêng tư bệnh nhân",
    "hero.trust_senior": "Giao diện tối ưu người lớn tuổi",
    "hero.trust_offline": "Xem ngoại tuyến không cần mạng",

    // Mockup UI (Hero screen)
    "mockup.tag": "Đang theo dõi",
    "mockup.lesion_name": "Nhân thùy phải tuyến giáp",
    "mockup.tirads": "TI-RADS 3 (Nguy cơ thấp)",
    "mockup.latest_size": "Kích thước mới nhất",
    "mockup.size_val": "8.2 x 6.1 x 5.4 mm",
    "mockup.growth_rate": "Tốc độ tăng trưởng",
    "mockup.growth_val": "+3.8% (Ổn định)",
    "mockup.next_exam": "Lịch hẹn tái khám đề xuất",
    "mockup.next_date": "15/12/2026 (Sau 6 tháng)",
    "mockup.chart_title": "Diễn biến kích thước (18 tháng qua)",

    // Problem vs Solution
    "pvs.badge": "Thấu hiểu nỗi đau",
    "pvs.title": "Tại sao việc theo dõi sang thương lại cần sự chính xác?",
    "pvs.subtitle": "Quản lý hồ sơ giấy tờ truyền thống khiến người bệnh dễ rơi vào trạng thái hoang mang hoặc chủ quan bỏ lỡ thời điểm vàng điều trị.",
    "pvs.p1_title": "Phiếu siêu âm giấy dễ rải rác, thất lạc",
    "pvs.p1_desc": "Sau 1-2 năm, các bản in nhiệt bị mờ chữ hoặc mất góc, rất khó tìm lại để mang đi tái khám.",
    "pvs.s1_title": "Số hóa tập trung, tra cứu trong 3 giây",
    "pvs.s1_desc": "Mọi kết quả siêu âm, hình ảnh gốc và thông số đều được lưu trữ bảo mật trọn đời trên điện thoại của bạn.",

    "pvs.p2_title": "Không nhận biết được nốt/hạch có to lên không",
    "pvs.p2_desc": "Các con số đo lường 3 chiều rời rạc khiến người bệnh không biết khối mô phát triển nhanh hay chậm.",
    "pvs.s2_title": "Biểu đồ đường cong & Tự động tính % tăng trưởng",
    "pvs.s2_desc": "Hệ thống tự động so sánh số đo giữa các mốc khám và phát cảnh báo màu trực quan nếu tăng trên 20%.",

    "pvs.p3_title": "Quên bẵng lịch tái khám 6 tháng / 1 năm",
    "pvs.p3_desc": "Cuộc sống bận rộn khiến đa số bệnh nhân bỏ lỡ mốc kiểm tra định kỳ do bác sĩ dặn dò.",
    "pvs.s3_title": "Nhắc lịch thông minh theo chuẩn lâm sàng",
    "pvs.s3_desc": "Tự động gợi ý chu kỳ tái khám theo mức độ rủi ro (TI-RADS/BI-RADS) và đồng bộ lịch Apple/Google Calendar.",

    "pvs.p4_title": "Lúng túng giải thích bệnh sử với Bác sĩ",
    "pvs.p4_desc": "Bác sĩ mất nhiều thời gian lật tìm từng tờ kết quả cũ để tổng hợp lại tiến trình điều trị.",
    "pvs.s4_title": "Xuất 1 trang PDF tóm tắt bệnh án chuẩn y khoa",
    "pvs.s4_desc": "Chỉ 1 chạm để xuất bản tóm tắt diễn tiến và ảnh chụp phiếu khám mới nhất gửi bác sĩ xem ngay khi vào khám.",

    // 4 Pathology Hub
    "pathology.badge": "Phân loại chuyên sâu",
    "pathology.title": "Quản lý chuyên biệt cho 4 dạng sang thương",
    "pathology.subtitle": "Mỗi dạng sang thương có đặc tính sinh học riêng biệt và được NoduleTrack theo dõi theo đúng trường dữ liệu y khoa chuẩn.",
    "pathology.tab_nodule": "Nhân giáp (Nodule)",
    "pathology.tab_cyst": "U nang (Cyst)",
    "pathology.tab_lymph": "Hạch (Lymph Node)",
    "pathology.tab_polyp": "Polyp tiêu hóa/mật",

    "pathology.nodule_title": "Nhân Giáp & Khối Đặc (Nodules)",
    "pathology.nodule_desc": "Khối mô đặc phát triển bên trong nhu mô tuyến giáp hoặc tuyến vú. Cần theo dõi tỷ trọng âm, vi vôi hóa và tốc độ tăng trưởng thể tích.",
    "pathology.nodule_f1": "Hỗ trợ bảng phân tầng nguy cơ TI-RADS (Tuyến giáp) & BI-RADS (Tuyến vú)",
    "pathology.nodule_f2": "Ghi nhận đặc điểm siêu âm: Giảm âm, vi vôi hóa, chiều cao > chiều rộng",
    "pathology.nodule_f3": "Cảnh báo khi kích thước tăng trên 20% hoặc tăng trên 2mm ở 2 chiều trong 6 tháng",

    "pathology.cyst_title": "U Nang & Túi Dịch (Cysts)",
    "pathology.cyst_desc": "Túi màng mỏng chứa dịch lỏng hoặc chất keo bên trong (nang thận, nang gan, nang giáp, nang buồng trứng).",
    "pathology.cyst_f1": "Phân loại rõ ràng: Nang đơn thuần (lành tính) và Nang phức hợp (vách ngăn/chồi sùi)",
    "pathology.cyst_f2": "Theo dõi độ dày thành nang và dấu hiệu hồi âm bên trong dịch",
    "pathology.cyst_f3": "Nhắc tái khám định kỳ 12 tháng đối với các nang đơn thuần ổn định",

    "pathology.lymph_title": "Hạch Bạch Huyết (Lymph Nodes)",
    "pathology.lymph_desc": "Cấu trúc hệ miễn dịch có sẵn ở vùng cổ, nách, bẹn; thường sưng to khi có phản ứng viêm hoặc biến đổi bệnh lý.",
    "pathology.lymph_f1": "Theo dõi tỷ lệ trục ngắn / trục dài (Short-to-Long Axis Ratio)",
    "pathology.lymph_f2": "Đánh giá cấu trúc rốn hạch (Hilum) còn nguyên vẹn hay bị mất",
    "pathology.lymph_f3": "Phân biệt giữa hạch viêm phản ứng tự thoái triển và hạch tăng sinh nghi ngờ",

    "pathology.polyp_title": "Polyp Túi Mật & Đại Tràng (Polyps)",
    "pathology.polyp_desc": "Khối mô tăng sinh nhô lên khỏi bề mặt niêm mạc túi mật hoặc đường ruột. Kích thước đo bằng milimet là yếu tố quyết định hướng điều trị.",
    "pathology.polyp_f1": "Xác định rõ hình thái: Polyp có cuống (Pedunculated) hoặc Không cuống (Sessile)",
    "pathology.polyp_f2": "Theo dõi chặt chẽ ngưỡng 10mm đối với polyp túi mật để tầm soát nguy cơ",
    "pathology.polyp_f3": "Nhắc lịch siêu âm nội soi định kỳ theo khuyến cáo chuyên khoa tiêu hóa",

    // Interactive Simulator
    "sim.badge": "Trải nghiệm trực tiếp",
    "sim.title": "Mô Phỏng Tốc Độ Tăng Trưởng & Ngưỡng Cảnh Báo",
    "sim.subtitle": "Kéo các thanh trượt bên dưới để thử nghiệm thuật toán phân loại mức độ rủi ro lâm sàng của NoduleTrack.",
    "sim.scan1_label": "Mốc khám ban đầu (Lần 1)",
    "sim.scan2_label": "Mốc tái khám (Lần 2)",
    "sim.timeframe_label": "Khoảng cách thời gian",
    "sim.timeframe_6m": "6 tháng",
    "sim.timeframe_12m": "12 tháng",
    "sim.result_growth": "Tỷ lệ thay đổi kích thước",
    "sim.status_stable": "MỨC ĐỘ: ỔN ĐỊNH (STABLE)",
    "sim.status_warning": "MỨC ĐỘ: CẦN THEO DÕI (WARNING)",
    "sim.status_critical": "MỨC ĐỘ: TĂNG TRƯỞNG NHANH (CRITICAL)",
    "sim.advice_stable": "Kích thước sang thương duy trì ổn định (tăng dưới 10%/năm). Tiếp tục duy trì chế độ sinh hoạt lành mạnh và tái khám định kỳ sau 12 tháng.",
    "sim.advice_warning": "Sang thương có xu hướng phát triển từ 10% đến 20%. Bạn nên đặt lịch tái khám sau 6 tháng để theo dõi sát diễn biến.",
    "sim.advice_critical": "Kích thước sang thương tăng trên 20% trong vòng 6 tháng. Thuật toán khuyến nghị bạn nên đặt lịch thăm khám sớm với Bác sĩ chuyên khoa để được tư vấn can thiệp nếu cần.",

    // Side-by-Side & Doctor Summary
    "compare.badge": "Tính năng vượt trội",
    "compare.title": "Đối chiếu Song Song & Tóm Tắt Gửi Bác Sĩ",
    "compare.subtitle": "Mang lại sự chủ động và chuyên nghiệp nhất mỗi khi bạn bước vào phòng khám bệnh.",
    "compare.side_title": "Đối chiếu kết quả 2 lần khám gần nhất",
    "compare.side_desc": "Đặt 2 phiếu siêu âm cạnh nhau, tự động làm nổi bật các thông số thay đổi giúp bạn nhìn rõ tiến trình chỉ trong nháy mắt.",
    "compare.pdf_title": "Phiếu tóm tắt bệnh án chuẩn A4 gửi Bác sĩ",
    "compare.pdf_desc": "Xuất file PDF tóm lược 1 trang gồm: Biểu đồ kích thước, lịch sử thăm khám và hình ảnh siêu âm gốc để Bác sĩ nắm bắt nhanh bệnh sử.",
    "compare.pdf_btn": "Xem mẫu tóm tắt PDF",

    // Key Features Grid
    "feat.badge": "Hệ thống tính năng",
    "feat.title": "Mọi công cụ bạn cần trong một ứng dụng nhỏ gọn",
    "feat.subtitle": "Được thiết kế tỉ mỉ để người bệnh mọi lứa tuổi đều có thể sử dụng dễ dàng và an tâm.",
    "feat.f1_title": "Nhập liệu 4 bước đơn giản",
    "feat.f1_desc": "Điền thông tin buổi khám, chọn vị trí u/hạch, cập nhật kích thước và chụp đính kèm phiếu siêu âm chỉ trong 1 phút.",
    "feat.f2_title": "Nhắc lịch khám thông minh",
    "feat.f2_desc": "Tự động đề xuất lịch tái khám 3, 6 hoặc 12 tháng dựa trên kết quả phân loại y tế và đồng bộ lịch điện thoại.",
    "feat.f3_title": "Quản lý hồ sơ gia đình",
    "feat.f3_desc": "Tạo nhiều hồ sơ bệnh nhân riêng biệt trên cùng 1 tài khoản để theo dõi cho bản thân, cha mẹ và con cái.",
    "feat.f4_title": "Lưu trữ đám mây & Ngoại tuyến",
    "feat.f4_desc": "Dữ liệu được sao lưu an toàn trên đám mây, đồng thời hỗ trợ tra cứu ngoại tuyến khi ở phòng khám sóng yếu.",
    "feat.f5_title": "Bảo mật & Quyền riêng tư",
    "feat.f5_desc": "Toàn bộ dữ liệu bệnh án thuộc quyền sở hữu cá nhân của bạn, được mã hóa theo các tiêu chuẩn bảo mật y tế nghiêm ngặt.",
    "feat.f6_title": "Tối ưu cho Người cao tuổi",
    "feat.f6_desc": "Cỡ chữ lớn, độ tương phản cao, thao tác 1 chạm trực quan, mang lại cảm giác bình tĩnh và ấm áp khi sử dụng.",

    // Medical Trust & Disclaimer
    "trust.badge": "An tâm & Minh bạch",
    "trust.title": "Cam Kết Y Khoa & Bảo Mật Dữ Liệu",
    "trust.p1": "NoduleTrack được xây dựng dựa trên các hướng dẫn phân loại y khoa quốc tế như **ACR TI-RADS** (Hiệp hội X-quang Hoa Kỳ) và **BI-RADS** nhằm giúp người bệnh có cái nhìn khoa học, rõ ràng về tình trạng sức khỏe của mình.",
    "trust.disclaimer_title": "Tuyên Bố Miễn Trừ Trách Nhiệm Y Tế (Medical Disclaimer):",
    "trust.disclaimer_text": "NoduleTrack là ứng dụng hỗ trợ số hóa, theo dõi và nhắc lịch quản lý dữ liệu cá nhân. Ứng dụng **KHÔNG** đưa ra chẩn đoán y tế, chỉ định dùng thuốc hay thay thế ý kiến chuyên môn của bác sĩ và chuyên gia y tế. Khi phát hiện bất kỳ dấu hiệu bất thường nào, người bệnh cần đến ngay các cơ sở y tế uy tín để được thăm khám trực tiếp.",

    // FAQ Section
    "faq.badge": "Giải đáp thắc mắc",
    "faq.title": "Câu Hỏi Thường Gặp",
    "faq.subtitle": "Những điều bạn cần biết trước khi bắt đầu sử dụng NoduleTrack.",
    "faq.q1": "NoduleTrack có tính phí sử dụng không?",
    "faq.a1": "NoduleTrack cung cấp gói miễn phí trọn đời cho các tính năng theo dõi u/hạch cơ bản, vẽ biểu đồ tăng trưởng và nhắc lịch tái khám. Các tính năng nâng cao như xuất báo cáo PDF không giới hạn hay lưu trữ đa hồ sơ gia đình sẽ có gói nâng cấp linh hoạt.",
    "faq.q2": "Dữ liệu hồ sơ bệnh án của tôi có được bảo mật không?",
    "faq.a2": "Tuyệt đối an toàn. Dữ liệu của bạn được mã hóa đa tầng và chỉ bạn mới có quyền truy cập hoặc chia sẻ hồ sơ cho bác sĩ điều trị. Chúng tôi cam kết không bán hoặc chia sẻ dữ liệu y tế cho bên thứ ba.",
    "faq.q3": "Người lớn tuổi có thể tự sử dụng NoduleTrack không?",
    "faq.a3": "Hoàn toàn có thể. Giao diện ứng dụng được thiết kế theo triết lý Universal Simplicity với cỡ chữ to, màu sắc dịu mắt, nút bấm lớn và luồng thao tác trực quan. Ngoài ra, con cái có thể tạo hồ sơ cho cha mẹ trên cùng một điện thoại để quản lý giúp.",
    "faq.q4": "Ứng dụng nhắc lịch tái khám dựa trên tiêu chuẩn nào?",
    "faq.a4": "Thuật toán nhắc lịch của NoduleTrack dựa trên các khuyến cáo lâm sàng quốc tế (như TI-RADS cho tuyến giáp và BI-RADS cho tuyến vú). Ví dụ: TI-RADS 3 được đề xuất khám sau 6 tháng, sang thương ổn định tăng dưới 10% được đề xuất tái khám sau 12 tháng.",
    "faq.q5": "Làm thế nào để đưa kết quả cho Bác sĩ xem nhanh?",
    "faq.a5": "Bạn chỉ cần mở tính năng 'Tóm tắt bệnh án' và bấm 'Xuất PDF'. Ứng dụng sẽ tạo một trang tài liệu tổng hợp đầy đủ biểu đồ diễn biến kích thước và ảnh chụp kết quả gần nhất để đưa cho bác sĩ xem trực tiếp hoặc gửi qua Zalo/Email.",

    // Final CTA Banner
    "cta.title": "Bắt đầu theo dõi sức khỏe chủ động ngay hôm nay",
    "cta.subtitle": "Hàng ngàn gia đình đã an tâm hơn khi có NoduleTrack đồng hành quản lý các mốc siêu âm định kỳ.",
    "cta.btn_appstore": "Tải trên App Store",
    "cta.btn_playstore": "Tải trên Google Play",
    "cta.btn_qr": "Mở mã QR tải nhanh",

    // QR Modal
    "modal.title": "Quét mã QR để tải ứng dụng",
    "modal.subtitle": "Sử dụng camera điện thoại (iOS / Android) để quét mã và cài đặt NoduleTrack tức thì.",
    "modal.close": "Đóng cửa sổ",

    // Footer
    "footer.tagline": "Minh bạch diễn biến - An tâm điều trị",
    "footer.desc": "Ứng dụng cá nhân theo dõi và quản lý kích thước u, nang, hạch, polyp hàng đầu cho gia đình bạn.",
    "footer.col_nav": "Điều Hướng",
    "footer.col_legal": "Pháp Lý & Y Tế",
    "footer.col_contact": "Hỗ Trợ",
    "footer.terms": "Điều khoản sử dụng",
    "footer.privacy": "Chính sách quyền riêng tư",
    "footer.disclaimer": "Miễn trừ y tế",
    "footer.copyright": "© 2026 NoduleTrack. Đã đăng ký bản quyền. Được xây dựng vì sức khỏe cộng đồng."
  },

  en: {
    // Meta & Head
    "meta.title": "NoduleTrack - Clinical Clarity for Every Scan | Nodule, Cyst, Lymph Node & Polyp Tracker",
    "meta.description": "NoduleTrack is a specialized personal health app for digitizing ultrasound reports, tracking lesion growth rates, and smart appointment reminders based on TI-RADS/BI-RADS standards.",

    // Navbar
    "nav.features": "Features",
    "nav.pathologies": "4 Pathologies",
    "nav.simulator": "Growth Simulator",
    "nav.summary": "Doctor Summary",
    "nav.faq": "FAQ",
    "nav.download": "Get App Free",

    // Hero Section
    "hero.badge": "✨ Based on International Clinical TI-RADS & BI-RADS Standards",
    "hero.title": "Clinical Clarity.<br/><span class=\"text-gradient\">Peace of Mind.</span>",
    "hero.subtitle": "Never lose old ultrasound papers again. NoduleTrack automates tracking size progression of cysts, nodules, lymph nodes, and polyps over time — visual, precise, and completely secure.",
    "hero.cta_appstore": "Download on App Store",
    "hero.cta_playstore": "Get it on Google Play",
    "hero.cta_qr": "Scan QR to Download",
    "hero.trust_privacy": "100% Patient Data Privacy",
    "hero.trust_senior": "Optimized for Seniors",
    "hero.trust_offline": "Full Offline Support",

    // Mockup UI (Hero screen)
    "mockup.tag": "Active Monitoring",
    "mockup.lesion_name": "Right Thyroid Nodule",
    "mockup.tirads": "TI-RADS 3 (Low Suspicion)",
    "mockup.latest_size": "Latest Measurement",
    "mockup.size_val": "8.2 x 6.1 x 5.4 mm",
    "mockup.growth_rate": "Growth Progression",
    "mockup.growth_val": "+3.8% (Stable)",
    "mockup.next_exam": "Suggested Follow-up",
    "mockup.next_date": "Dec 15, 2026 (In 6 months)",
    "mockup.chart_title": "Size Progression (Past 18 Months)",

    // Problem vs Solution
    "pvs.badge": "Understanding Patient Pain",
    "pvs.title": "Why does physical lesion tracking require clinical precision?",
    "pvs.subtitle": "Managing paper medical records leads to anxiety or missing critical clinical intervention windows.",
    "pvs.p1_title": "Thermal paper reports fade and get lost",
    "pvs.p1_desc": "After 1-2 years, ultrasound prints fade away or tear, making historical comparison impossible.",
    "pvs.s1_title": "Centralized digital vault, instant 3s search",
    "pvs.s1_desc": "Every ultrasound report, scan image, and metric is stored safely and permanently on your device.",

    "pvs.p2_title": "Unclear whether nodules are growing",
    "pvs.p2_desc": "Three-dimensional raw numbers make it hard for patients to know if lesions are expanding dangerously.",
    "pvs.s2_title": "Growth curve charts & Automatic % rate calculation",
    "pvs.s2_desc": "Automatically compares metrics across exams and flags clinical alerts when growth exceeds 20%.",

    "pvs.p3_title": "Forgetting the 6 or 12-month checkup date",
    "pvs.p3_desc": "Busy everyday life causes patients to overlook recommended follow-up examination milestones.",
    "pvs.s3_title": "Smart clinical reminders & Calendar sync",
    "pvs.s3_desc": "Recommends follow-up dates based on clinical risk categories and syncs seamlessly with Apple & Google Calendar.",

    "pvs.p4_title": "Struggling to summarize medical history to doctors",
    "pvs.p4_desc": "Clinicians spend precious consultation minutes digging through unorganized paper records.",
    "pvs.s4_title": "One-click 1-page clinical PDF summary export",
    "pvs.s4_desc": "Export a clean one-page PDF summary with timeline charts and the latest scan photo to hand directly to your doctor.",

    // 4 Pathology Hub
    "pathology.badge": "Dedicated Pathology Tracking",
    "pathology.title": "Specialized Management for 4 Common Lesions",
    "pathology.subtitle": "Each lesion type has unique biological characteristics and is tracked with clinical fields tailored to medical standards.",
    "pathology.tab_nodule": "Thyroid Nodule",
    "pathology.tab_cyst": "Cyst",
    "pathology.tab_lymph": "Lymph Node",
    "pathology.tab_polyp": "Polyp",

    "pathology.nodule_title": "Thyroid Nodules & Solid Masses",
    "pathology.nodule_desc": "Solid tissue growth inside the thyroid or breast parenchyma. Requires monitoring echogenicity, microcalcifications, and volume doubling time.",
    "pathology.nodule_f1": "Full support for TI-RADS (Thyroid) & BI-RADS (Breast) stratification tiers",
    "pathology.nodule_f2": "Tracks ultrasound features: Hypoechogenicity, taller-than-wide, microcalcifications",
    "pathology.nodule_f3": "Alerts when size increases > 20% or > 2mm in two dimensions over 6 months",

    "pathology.cyst_title": "Cysts & Fluid-filled Sacs",
    "pathology.cyst_desc": "Thin-walled sacs containing liquid or colloid fluid (renal cysts, hepatic cysts, thyroid cysts, ovarian cysts).",
    "pathology.cyst_f1": "Clear distinction between Simple Cysts (benign) and Complex Cysts (septations/nodularity)",
    "pathology.cyst_f2": "Monitors cyst wall thickness and internal echogenic debris",
    "pathology.cyst_f3": "12-month follow-up scheduling for stable, simple benign cysts",

    "pathology.lymph_title": "Lymph Nodes",
    "pathology.lymph_desc": "Immune structures in the neck, axilla, and groin; enlarge in response to inflammation or pathological changes.",
    "pathology.lymph_f1": "Tracks Short-to-Long Axis ratio to evaluate spherical enlargement",
    "pathology.lymph_f2": "Evaluates fatty hilum integrity and cortical thickening",
    "pathology.lymph_f3": "Distinguishes between self-resolving reactive nodes and suspicious progressive lymphadenopathy",

    "pathology.polyp_title": "Gallbladder & Gastrointestinal Polyps",
    "pathology.polyp_desc": "Tissue projections from the mucosal surface of the gallbladder or colon. Millimeter sizing determines clinical management.",
    "pathology.polyp_f1": "Morphology classification: Pedunculated (stalk) vs Sessile (flat base)",
    "pathology.polyp_f2": "Strictly monitors the 10mm threshold in gallbladder polyps for surgical referral",
    "pathology.polyp_f3": "Follow-up reminders aligned with gastroenterology ultrasound guidelines",

    // Interactive Simulator
    "sim.badge": "Interactive Demo",
    "sim.title": "Growth Rate & Clinical Alert Simulator",
    "sim.subtitle": "Drag the sliders below to test NoduleTrack's automated clinical risk stratification algorithm.",
    "sim.scan1_label": "Initial Baseline Scan (Exam 1)",
    "sim.scan2_label": "Follow-up Scan (Exam 2)",
    "sim.timeframe_label": "Time Interval",
    "sim.timeframe_6m": "6 Months",
    "sim.timeframe_12m": "12 Months",
    "sim.result_growth": "Size Growth Rate",
    "sim.status_stable": "STATUS: STABLE",
    "sim.status_warning": "STATUS: MONITOR CLOSELY",
    "sim.status_critical": "STATUS: RAPID GROWTH ALERT",
    "sim.advice_stable": "Lesion size remains stable (growth < 10%/year). Maintain a healthy lifestyle and schedule a routine follow-up in 12 months.",
    "sim.advice_warning": "Lesion shows moderate expansion between 10% and 20%. A 6-month follow-up ultrasound is recommended to monitor progression.",
    "sim.advice_critical": "Lesion size grew over 20% in 6 months. Our clinical guidelines strongly advise consulting your specialist doctor promptly for thorough evaluation.",

    // Side-by-Side & Doctor Summary
    "compare.badge": "Visual Intelligence",
    "compare.title": "Side-by-Side Comparison & Doctor Summary",
    "compare.subtitle": "Empowering you with effortless clarity and confidence during every clinic appointment.",
    "compare.side_title": "Compare latest 2 ultrasound scans side-by-side",
    "compare.side_desc": "Places successive scan records next to each other, automatically highlighting dimensional shifts for instant visual appraisal.",
    "compare.pdf_title": "One-Page Clinical Summary PDF for Doctors",
    "compare.pdf_desc": "Export a structured A4 medical summary with growth progression curves, historical records, and scan photos to hand your physician.",
    "compare.pdf_btn": "Preview Sample PDF",

    // Key Features Grid
    "feat.badge": "Core Capabilities",
    "feat.title": "Everything you need in one reassuring app",
    "feat.subtitle": "Crafted with love and clinical rigor for patients and families of all ages.",
    "feat.f1_title": "4-Step Quick Entry",
    "feat.f1_desc": "Enter exam facility, select or create lesion, input 3D dimensions, and attach your scan photo in under 60 seconds.",
    "feat.f2_title": "Clinical Smart Reminders",
    "feat.f2_desc": "Automatically suggests 3, 6, or 12-month follow-ups based on TI-RADS/BI-RADS classifications and syncs with your calendar.",
    "feat.f3_title": "Family Profile Management",
    "feat.f3_desc": "Create separate patient profiles under a single account to care for yourself, your parents, and your children.",
    "feat.f4_title": "Cloud & Offline Continuity",
    "feat.f4_desc": "Safely backed up to cloud while remaining fully accessible offline when clinic waiting rooms have low signal.",
    "feat.f5_title": "Strict Privacy & Security",
    "feat.f5_desc": "Your medical data belongs solely to you, protected with state-of-the-art encryption and patient confidentiality protocols.",
    "feat.f6_title": "Senior-Friendly Design",
    "feat.f6_desc": "Generous typography, high-contrast palette, intuitive 1-tap navigation, and calming medical aesthetics.",

    // Medical Trust & Disclaimer
    "trust.badge": "Safety & Reassurance",
    "trust.title": "Clinical Integrity & Patient Privacy",
    "trust.p1": "NoduleTrack is grounded in international classification frameworks including the **ACR TI-RADS** (American College of Radiology) and **BI-RADS** to provide patients with clear, evidence-based health awareness.",
    "trust.disclaimer_title": "Medical Disclaimer:",
    "trust.disclaimer_text": "NoduleTrack is a personal health digitalization, tracking, and reminder assistant. It **DOES NOT** provide medical diagnoses, prescribe medications, or replace the professional judgment of qualified healthcare providers. If you notice any unusual symptoms or rapid changes, consult a physician promptly.",

    // FAQ Section
    "faq.badge": "Frequently Asked Questions",
    "faq.title": "Everything You Need to Know",
    "faq.subtitle": "Clear answers to help you get started with NoduleTrack.",
    "faq.q1": "Is NoduleTrack free to use?",
    "faq.a1": "Yes, NoduleTrack offers a generous free tier that includes essential lesion logging, growth chart visualization, and follow-up reminders. Optional premium features are available for unlimited family members and advanced PDF exports.",
    "faq.q2": "Is my private health data protected?",
    "faq.a2": "Absolutely. Your data is encrypted in transit and at rest. Only you have access to your health history and decide when to share reports with your physician. We never sell health data to third parties.",
    "faq.q3": "Can elderly family members use NoduleTrack easily?",
    "faq.a3": "Yes. The app is specifically designed with large text, high contrast, and simple 1-touch flows. Family members can also manage multiple patient profiles on one device to help parents track their exams.",
    "faq.q4": "How does the app determine follow-up dates?",
    "faq.a4": "Follow-up intervals adhere to clinical guidelines such as ACR TI-RADS. For example, TI-RADS 3 suggests a 6-month check, while stable lesions (<10% growth) default to a 12-month interval.",
    "faq.q5": "How do I share records with my doctor?",
    "faq.a5": "Simply tap 'Medical Summary' and export a one-page PDF. It presents a clean timeline chart, dimension table, and recent scan images for immediate physician review.",

    // Final CTA Banner
    "cta.title": "Take control of your health journey today",
    "cta.subtitle": "Join thousands of patients and families enjoying clarity and confidence across every follow-up scan.",
    "cta.btn_appstore": "Download on App Store",
    "cta.btn_playstore": "Get on Google Play",
    "cta.btn_qr": "Show QR Code",

    // QR Modal
    "modal.title": "Scan QR Code to Download",
    "modal.subtitle": "Point your smartphone camera (iOS or Android) at the code to install NoduleTrack immediately.",
    "modal.close": "Close window",

    // Footer
    "footer.tagline": "Clinical Clarity for Every Scan",
    "footer.desc": "The trusted personal medical app for monitoring nodule, cyst, lymph node, and polyp progression.",
    "footer.col_nav": "Navigation",
    "footer.col_legal": "Legal & Clinical",
    "footer.col_contact": "Support",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.disclaimer": "Medical Disclaimer",
    "footer.copyright": "© 2026 NoduleTrack. All rights reserved. Built for patient reassurance and health clarity."
  }
};

let currentLang = 'vi';

/**
 * Update all text elements with data-i18n attributes
 */
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('noduletrack_lang', lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];

  // Update text content
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.innerHTML = dict[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      elem.setAttribute('placeholder', dict[key]);
    }
  });

  // Update page title
  if (dict['meta.title']) {
    document.title = dict['meta.title'];
  }

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict['meta.description']) {
    metaDesc.setAttribute('content', dict['meta.description']);
  }

  // Update switcher buttons UI
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Dispatch custom event for dynamic components (simulator, tabs)
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Initialize language from storage or navigator
 */
function initI18n() {
  const savedLang = localStorage.getItem('noduletrack_lang');
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
  } else {
    // Check browser language
    const browserLang = (navigator.language || 'vi').toLowerCase();
    if (browserLang.startsWith('en')) {
      setLanguage('en');
    } else {
      setLanguage('vi');
    }
  }

  // Bind click listeners to language toggle buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        setLanguage(targetLang);
      }
    });
  });
}

// Auto init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
