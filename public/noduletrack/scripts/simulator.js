/**
 * NoduleTrack Interactive Growth Rate & Clinical Alert Simulator
 */

function initSimulator() {
  const sliderD1 = document.getElementById('sim-slider-d1');
  const sliderD2 = document.getElementById('sim-slider-d2');
  const timeframe6m = document.getElementById('sim-time-6m');
  const timeframe12m = document.getElementById('sim-time-12m');

  const valD1Elem = document.getElementById('sim-val-d1');
  const valD2Elem = document.getElementById('sim-val-d2');
  const growthNumElem = document.getElementById('sim-growth-number');
  const statusBadgeElem = document.getElementById('sim-status-badge');
  const adviceTextElem = document.getElementById('sim-advice-text');
  const outputCardElem = document.getElementById('sim-output-card');
  const chartPathElem = document.getElementById('sim-chart-path');

  if (!sliderD1 || !sliderD2) return;

  function updateSimulator() {
    const d1 = parseFloat(sliderD1.value);
    const d2 = parseFloat(sliderD2.value);
    const is6m = timeframe6m && timeframe6m.checked;

    valD1Elem.textContent = `${d1.toFixed(1)} mm`;
    valD2Elem.textContent = `${d2.toFixed(1)} mm`;

    // Calculate percentage change
    const deltaPercent = ((d2 - d1) / d1) * 100;
    const sign = deltaPercent > 0 ? '+' : '';
    growthNumElem.textContent = `${sign}${deltaPercent.toFixed(1)}%`;

    // Determine clinical status tier
    // Thresholds: <= 10% Stable, 10% - 20% Warning, > 20% Critical
    let tier = 'stable';
    if (deltaPercent > 20) {
      tier = 'critical';
    } else if (deltaPercent > 10) {
      tier = 'warning';
    } else {
      tier = 'stable';
    }

    // Update Output Card styling
    outputCardElem.className = `sim-output-card ${tier}`;

    // Get current language dictionary
    const lang = document.documentElement.lang || 'vi';
    const dict = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : null;

    if (dict) {
      if (tier === 'stable') {
        statusBadgeElem.textContent = dict['sim.status_stable'] || 'STATUS: STABLE';
        adviceTextElem.textContent = dict['sim.advice_stable'] || '';
      } else if (tier === 'warning') {
        statusBadgeElem.textContent = dict['sim.status_warning'] || 'STATUS: MONITOR CLOSELY';
        adviceTextElem.textContent = dict['sim.advice_warning'] || '';
      } else {
        statusBadgeElem.textContent = dict['sim.status_critical'] || 'STATUS: RAPID GROWTH ALERT';
        adviceTextElem.textContent = dict['sim.advice_critical'] || '';
      }
    }

    // Dynamically morph the SVG curve path based on d1 and d2
    if (chartPathElem) {
      const y1 = 120 - Math.min(100, Math.max(10, d1 * 6));
      const y2 = 120 - Math.min(100, Math.max(10, d2 * 6));
      chartPathElem.setAttribute('d', `M 20 ${y1} C 90 ${y1}, 110 ${y2}, 180 ${y2}`);
      
      let strokeColor = '#10B981';
      if (tier === 'warning') strokeColor = '#F59E0B';
      if (tier === 'critical') strokeColor = '#D32F2F';
      chartPathElem.setAttribute('stroke', strokeColor);
    }
  }

  // Bind input listeners
  sliderD1.addEventListener('input', updateSimulator);
  sliderD2.addEventListener('input', updateSimulator);
  if (timeframe6m) timeframe6m.addEventListener('change', updateSimulator);
  if (timeframe12m) timeframe12m.addEventListener('change', updateSimulator);

  // Listen to language change events
  window.addEventListener('languageChanged', updateSimulator);

  // Initial calculation
  updateSimulator();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimulator);
} else {
  initSimulator();
}
