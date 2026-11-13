/**
 * ThyroMate (An Giáp) Landing Page — Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('header.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDropdown = document.getElementById('mobileDropdown');

  if (mobileBtn && mobileDropdown) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target) && e.target !== mobileBtn) {
        mobileDropdown.classList.remove('active');
      }
    });

    // Close on clicking any link inside mobile menu
    mobileDropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDropdown.classList.remove('active');
      });
    });
  }

  // 3. Interactive Gallery Filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      galleryItems.forEach((item) => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Image Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach lightbox to all gallery items
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-meta h4')?.textContent;
      const subtitle = item.querySelector('.gallery-meta p')?.textContent;
      if (img) {
        openLightbox(img.src, `${title} — ${subtitle}`);
      }
    });
  });

  // Also attach to feature phone cards
  document.querySelectorAll('.feature-phone-card img').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const alt = img.getAttribute('alt') || 'Ảnh giao diện ThyroMate';
      openLightbox(img.src, alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });

  // 6. Smooth Scroll with Offset for Fixed Header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
