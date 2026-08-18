/**
 * NoduleTrack Main Interactive Scripts
 * Handles Header Blur, FAQ Accordion, QR Modal, Smooth Scroll, and Scroll Animations
 */

function initMain() {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items for clean accordion behavior
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. QR Code Modal Logic
  const qrModal = document.getElementById('qr-modal');
  const qrTriggers = document.querySelectorAll('.open-qr-modal');
  const qrCloseBtn = document.getElementById('qr-modal-close');

  function openQrModal(e) {
    if (e) e.preventDefault();
    if (qrModal) {
      qrModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQrModal() {
    if (qrModal) {
      qrModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  qrTriggers.forEach((btn) => btn.addEventListener('click', openQrModal));
  if (qrCloseBtn) qrCloseBtn.addEventListener('click', closeQrModal);

  // Close modal when clicking backdrop
  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) closeQrModal();
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrModal && qrModal.classList.contains('active')) {
      closeQrModal();
    }
  });

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
