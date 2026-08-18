/**
 * NoduleTrack App Preview & Pathology Hub Controller
 */

function initAppPreview() {
  // 1. Pathology Hub Tabs
  const tabButtons = document.querySelectorAll('.pathology-tab-btn');
  const contentPanels = document.querySelectorAll('.pathology-content-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
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

  // 2. Interactive Phone Mockup Tab Selector (Hero Section)
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
            screen.style.display = 'block';
          } else {
            screen.style.display = 'none';
          }
        });
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAppPreview);
} else {
  initAppPreview();
}
