(() => {
  const DAY_MS = 86400000;
  const LANG_KEY = 'pledgo.lang';
  const dict = window.PLEDGO_I18N || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- i18n ----------
  const readLang = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && dict[q]) return q;
    try { const v = localStorage.getItem(LANG_KEY); if (v && dict[v]) return v; } catch (_) {}
    return 'vi';
  };

  const applyLang = (lang) => {
    const t = dict[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    document.title = t['meta.title'];
    document.querySelector('meta[name="description"]')?.setAttribute('content', t['meta.description']);

    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t[el.dataset.i18nHtml]; });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => { el.alt = t[el.dataset.i18nAlt]; });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      el.setAttribute('aria-label', t[el.dataset.i18nAriaLabel]);
    });
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  };

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
      applyLang(lang);
    });
  });

  const initialLang = readLang();
  if (initialLang !== 'vi') applyLang(initialLang);

  // ---------- Year countdown (matches the app's Year Dashboard) ----------
  const now = new Date();
  const year = now.getFullYear();
  const startOfToday = new Date(year, now.getMonth(), now.getDate());
  const daysInYear = Math.round((new Date(year + 1, 0, 1) - new Date(year, 0, 1)) / DAY_MS);
  const dayOfYear = Math.round((startOfToday - new Date(year, 0, 1)) / DAY_MS) + 1;
  const daysLeft = daysInYear - dayOfYear;

  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setText('cd-days', String(daysLeft));
  setText('cd-year', String(year));
  setText('footer-year', String(year));

  // ---------- 365-tick ring ----------
  const ring = document.getElementById('year-ring');
  if (ring) {
    const NS = 'http://www.w3.org/2000/svg';
    const cx = 300, cy = 300, r0 = 238;
    const monthStarts = new Set();
    for (let m = 0; m < 12; m++) {
      monthStarts.add(Math.round((new Date(year, m, 1) - new Date(year, 0, 1)) / DAY_MS));
    }
    const frag = document.createDocumentFragment();
    for (let i = 0; i < daysInYear; i++) {
      const a = (i / daysInYear) * Math.PI * 2 - Math.PI / 2;
      const isToday = i === dayOfYear - 1;
      const isMonth = monthStarts.has(i);
      const len = isToday ? 46 : isMonth ? 24 : 14;
      const x1 = cx + Math.cos(a) * r0, y1 = cy + Math.sin(a) * r0;
      const x2 = cx + Math.cos(a) * (r0 + len), y2 = cy + Math.sin(a) * (r0 + len);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', x1.toFixed(2)); line.setAttribute('y1', y1.toFixed(2));
      line.setAttribute('x2', x2.toFixed(2)); line.setAttribute('y2', y2.toFixed(2));
      line.setAttribute('stroke-linecap', 'round');
      if (isToday) {
        line.setAttribute('stroke', '#F8FAFC');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('class', 'ring-today');
      } else if (i < dayOfYear - 1) {
        line.setAttribute('stroke', isMonth ? '#3A4357' : '#242B3A');
        line.setAttribute('stroke-width', isMonth ? '2.2' : '1.6');
      } else {
        // Remaining days glow bronze, brightest right after today
        const t = (i - dayOfYear) / Math.max(1, daysInYear - dayOfYear);
        line.setAttribute('stroke', isMonth ? '#FCD34D' : '#F59E0B');
        line.setAttribute('stroke-opacity', (1 - t * 0.55).toFixed(2));
        line.setAttribute('stroke-width', isMonth ? '2.6' : '1.8');
      }
      frag.appendChild(line);
    }
    const halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('cx', cx); halo.setAttribute('cy', cy); halo.setAttribute('r', r0 - 18);
    halo.setAttribute('fill', 'none');
    halo.setAttribute('stroke', 'rgba(217,119,6,0.12)');
    halo.setAttribute('stroke-dasharray', '6 8');
    ring.appendChild(halo);
    ring.appendChild(frag);
  }

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  }

  // ---------- Gallery controls ----------
  const track = document.getElementById('gallery-track');
  document.querySelectorAll('[data-gallery]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!track) return;
      const item = track.querySelector('li');
      const step = item ? item.getBoundingClientRect().width + 32 : 260;
      track.scrollBy({ left: btn.dataset.gallery === 'next' ? step : -step, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
})();
