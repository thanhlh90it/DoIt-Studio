/**
 * Tevy Landing Page Main Script
 * Handles Navigation, FAQ Accordion, Smooth Scroll, and Scroll Reveal
 */

(function () {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. Navbar Scroll & Mobile Menu Toggle
   */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.navbar-link');

    if (!navbar) return;

    // Sticky glassmorphism blur effect on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Hamburger Menu
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
      });

      // Close menu when clicking outside or clicking any nav link
      document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Escape key to close mobile menu
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
          navMenu.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }
      });
    }
  }

  /**
   * 2. Accessible FAQ Accordion
   */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!questionBtn || !answer) return;

      // Assign ARIA identifiers
      const qId = `faq-q-${index}`;
      const aId = `faq-a-${index}`;
      questionBtn.id = qId;
      questionBtn.setAttribute('aria-controls', aId);
      questionBtn.setAttribute('aria-expanded', 'false');
      answer.id = aId;
      answer.setAttribute('aria-labelledby', qId);
      answer.setAttribute('role', 'region');

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for neat accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
        }
      });
    });
  }

  /**
   * 3. Smooth Scroll with Header Offset
   */
  function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 72; // match --tevy-header-height

    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  }

  /**
   * 4. Scroll Reveal with IntersectionObserver
   */
  function initScrollReveal() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll(
      '.hero-content, .bento-card, .ps-card, .step-card, .testimonial-card, .faq-item, .cta-card'
    );

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    // Helper CSS rule injection for revealed elements
    const style = document.createElement('style');
    style.textContent = `
      .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize all scripts when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFAQ();
    initSmoothScroll();
    initScrollReveal();
  });
})();
