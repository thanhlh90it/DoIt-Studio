/**
 * NoduleTrack App Preview, Pathology Hub & App Preview Controller
 * v2 — Full gallery navigation, phone frame lightbox
 */

function initAppPreview() {
  // ──────────────────────────────────────────────────────────
  // 1. Pathology Hub Tabs
  // ──────────────────────────────────────────────────────────
  const tabButtons = document.querySelectorAll('.pathology-tab-btn');
  const contentPanels = document.querySelectorAll('.pathology-content-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      contentPanels.forEach(panel => {
        if (panel.getAttribute('data-panel') === targetTab) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        }
      });
    });
  });

  // ──────────────────────────────────────────────────────────
  // 2. Interactive Phone Mockup Tab Selector (Hero Section)
  // ──────────────────────────────────────────────────────────
  const mockupTabBtns = document.querySelectorAll('.mockup-tab-btn');
  const mockupScreens = document.querySelectorAll('.mockup-screen-view');

  if (mockupTabBtns.length > 0) {
    mockupTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const screenKey = btn.getAttribute('data-screen');

        mockupTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        mockupScreens.forEach(screen => {
          if (screen.getAttribute('data-screen-view') === screenKey) {
            screen.classList.add('active');
          } else {
            screen.classList.remove('active');
          }
        });
      });
    });
  }

  // ──────────────────────────────────────────────────────────
  // 3. App Showcase Tabs
  // ──────────────────────────────────────────────────────────
  const showcaseBtns = document.querySelectorAll('.showcase-tab-btn');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  if (showcaseBtns.length > 0) {
    showcaseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetShowcase = btn.getAttribute('data-showcase');

        showcaseBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        showcasePanels.forEach(panel => {
          if (panel.getAttribute('data-showcase-panel') === targetShowcase) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // ──────────────────────────────────────────────────────────
  // 4. App Preview Controller (Lightbox v2)
  //    — Full phone-frame gallery with thumbnail strip
  // ──────────────────────────────────────────────────────────
  const lightboxModal  = document.getElementById('screenshot-lightbox');
  const lightboxImg    = document.getElementById('lightbox-img-element');
  const lightboxCaption= document.getElementById('lightbox-caption-element');
  const lightboxClose  = document.getElementById('lightbox-close-btn');
  const backdrop       = document.getElementById('lightbox-backdrop');
  const prevBtn        = document.getElementById('lbx-prev-btn');
  const nextBtn        = document.getElementById('lbx-next-btn');
  const thumbStrip     = document.getElementById('lbx-thumb-strip');
  const currentIndexEl = document.getElementById('lbx-current-index');
  const totalCountEl   = document.getElementById('lbx-total-count');

  // Ordered gallery of all app screenshots
  const GALLERY = [
    { src: '/noduletrack/assets/screenshot/home-dashboard.jpg',  caption: 'Trang Chủ — Dashboard tổng quan sang thương & nhắc tái khám' },
    { src: '/noduletrack/assets/screenshot/lesion-detail.jpg',   caption: 'Chi Tiết Sang Thương — Biểu đồ tăng trưởng & phân loại TI-RADS' },
    { src: '/noduletrack/assets/screenshot/lesions-list.jpg',    caption: 'Danh Sách U/Hạch — Tất cả sang thương theo dõi' },
    { src: '/noduletrack/assets/screenshot/exam-history.jpg',    caption: 'Lịch Sử Khám — Các lần siêu âm theo thời gian' },
    { src: '/noduletrack/assets/screenshot/exam-detail.jpg',     caption: 'Chi Tiết Lần Khám — Đối chiếu kết quả 2 lần gần nhất' },
    { src: '/noduletrack/assets/screenshot/settings-profile.jpg',caption: 'Hồ Sơ & Cài Đặt — Thông tin bệnh nhân & tùy chỉnh' },
  ];

  let currentIndex = 0;

  /** Build thumbnail strip once */
  function buildThumbnails() {
    if (!thumbStrip) return;
    thumbStrip.innerHTML = '';
    if (totalCountEl) totalCountEl.textContent = GALLERY.length;

    GALLERY.forEach((item, idx) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'lbx-thumb';
      thumb.setAttribute('aria-label', item.caption);
      thumb.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy" />`;
      thumb.addEventListener('click', () => navigateTo(idx));
      thumbStrip.appendChild(thumb);
    });
  }

  /** Switch to a gallery item with a fade transition */
  function navigateTo(idx) {
    if (idx < 0 || idx >= GALLERY.length) return;
    currentIndex = idx;

    const item = GALLERY[idx];

    // Fade out → swap src → fade in
    if (lightboxImg) {
      lightboxImg.classList.add('switching');
      setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption;
        lightboxImg.classList.remove('switching');
      }, 200);
    }

    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (currentIndexEl) currentIndexEl.textContent = idx + 1;

    // Update thumbnail active state
    if (thumbStrip) {
      thumbStrip.querySelectorAll('.lbx-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === idx);
      });
      // Scroll thumbnail into view
      const activeThumb = thumbStrip.querySelectorAll('.lbx-thumb')[idx];
      if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // Disable/enable nav buttons
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === GALLERY.length - 1;
  }

  /** Find the best starting index for an opened screenshot */
  function findGalleryIndex(src) {
    const clean = src.split('?')[0];
    const found = GALLERY.findIndex(g => clean.endsWith(g.src.replace(/^\//, '')) || g.src === src || g.src.endsWith(clean));
    return found >= 0 ? found : 0;
  }

  function openLightbox(src) {
    if (!lightboxModal) return;
    buildThumbnails();
    const startIdx = findGalleryIndex(src);
    navigateTo(startIdx);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind all .open-lightbox triggers (zoom buttons & clickable screenshots)
  document.querySelectorAll('.open-lightbox').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = el.getAttribute('data-screenshot-src')
        || el.querySelector('img')?.src
        || el.src
        || '';
      if (imgSrc) openLightbox(imgSrc);
    });
  });

  // Nav controls
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo(currentIndex + 1));

  // Close controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    switch (e.key) {
      case 'Escape':    closeLightbox(); break;
      case 'ArrowLeft': navigateTo(currentIndex - 1); break;
      case 'ArrowRight':navigateTo(currentIndex + 1); break;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAppPreview);
} else {
  initAppPreview();
}
