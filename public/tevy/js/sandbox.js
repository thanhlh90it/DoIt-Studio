/**
 * Tevy Interactive Sandbox State Machine
 * Coordinates state between Tevy Parent Phone Mockup & Tevy Smart TV Mockup
 */

const SANDBOX_STATES = {
  normal: {
    key: 'normal',
    phoneBadge: 'Đang xem an toàn',
    phoneColor: 'var(--tevy-safe)',
    tvHeader: 'Phim Hoạt Hình: Chú Gấu Thông Thái',
    tvSub: 'Thời gian đã xem liên tục: 28 phút / Giới hạn: 30 phút. TV đang hoạt động an toàn.',
    tvBadgeText: 'Đang phát • HD 1080p',
    tvBadgeColor: '#10B981',
    tvBg: 'radial-gradient(circle at center, #1E293B 0%, #0B1120 100%)',
    graphicSvg: '/tevy/assets/tevy-tv-banner.svg',
    timerVal: '28:15',
    progressWidth: '94%',
    showPins: false
  },
  warning: {
    key: 'warning',
    phoneBadge: 'Cảnh báo 30 phút',
    phoneColor: 'var(--tevy-warning-session)',
    tvHeader: 'Đến giờ nghỉ mắt rồi bạn nhỏ ơi!',
    tvSub: 'Mắt chúng mình đã làm việc liên tục 30 phút rồi. Cùng đứng lên vươn vai và uống một ngụm nước nhé!',
    tvBadgeText: 'Nhắc nhở nghỉ mắt 5 phút',
    tvBadgeColor: '#F59E0B',
    tvBg: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.25) 0%, #0B1120 85%)',
    graphicSvg: '/tevy/assets/tevy-bear-alert.svg',
    timerVal: '30:00',
    progressWidth: '100%',
    showPins: false
  },
  locked: {
    key: 'locked',
    phoneBadge: 'TV Đang Tạm Khóa',
    phoneColor: 'var(--tevy-lock-daily)',
    tvHeader: 'Màn hình đã được tạm khóa',
    tvSub: 'Bố Mẹ đã khóa TV từ điện thoại. Hãy dành thời gian đọc sách hoặc vui chơi cùng gia đình nhé!',
    tvBadgeText: 'Khóa từ xa bởi Bố/Mẹ',
    tvBadgeColor: '#EF4444',
    tvBg: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.2) 0%, #0B1120 85%)',
    graphicSvg: '/tevy/assets/tevy-app-icon.svg',
    timerVal: 'TẠM KHÓA',
    progressWidth: '100%',
    showPins: true
  },
  bedtime: {
    key: 'bedtime',
    phoneBadge: 'Chế độ Giờ đi ngủ',
    phoneColor: 'var(--tevy-bedtime)',
    tvHeader: 'Đã đến 21:00 - Giờ đi ngủ rồi!',
    tvSub: 'TV tự động tắt để bảo vệ giấc ngủ của bé. Chúc bạn nhỏ có những giấc mơ thật ngọt ngào!',
    tvBadgeText: 'Chế độ Ru ngủ ban đêm',
    tvBadgeColor: '#6366F1',
    tvBg: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, #0B1120 90%)',
    graphicSvg: '/tevy/assets/tevy-bear-sleep.svg',
    timerVal: 'NGỦ NGON',
    progressWidth: '100%',
    showPins: false
  }
};

class SandboxController {
  constructor() {
    this.currentState = 'normal';
    this.isTransitioning = false;
    this.autoTimer = null;
    this.idleTime = 0;
  }

  init() {
    this.buttons = document.querySelectorAll('.phone-btn[data-state]');
    this.tvScreen = document.getElementById('tvScreen');
    this.tvBadge = document.getElementById('tvStatusBadge');
    this.tvGraphic = document.getElementById('tvGraphic');
    this.tvTitle = document.getElementById('tvTitle');
    this.tvDesc = document.getElementById('tvDesc');
    this.tvPinRow = document.getElementById('tvPinRow');
    this.phoneTimerVal = document.getElementById('phoneTimerVal');
    this.phoneTimerProgress = document.getElementById('phoneTimerProgress');
    this.phoneDeviceStatus = document.getElementById('phoneDeviceStatus');

    if (!this.buttons.length || !this.tvScreen) {
      return;
    }

    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stateKey = btn.getAttribute('data-state');
        this.setState(stateKey);
        this.resetIdleTimer();
      });
    });

    this.startLiveClock();
    this.startAutoTour();
  }

  setState(stateKey) {
    if (!SANDBOX_STATES[stateKey] || this.isTransitioning) return;
    this.currentState = stateKey;
    this.isTransitioning = true;

    // 1. Update Phone UI immediately
    this.buttons.forEach(btn => {
      if (btn.getAttribute('data-state') === stateKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const stateData = SANDBOX_STATES[stateKey];
    if (this.phoneDeviceStatus) {
      this.phoneDeviceStatus.textContent = stateData.phoneBadge;
      this.phoneDeviceStatus.style.color = stateData.phoneColor;
    }

    if (this.phoneTimerVal) {
      this.phoneTimerVal.textContent = stateData.timerVal;
    }

    if (this.phoneTimerProgress) {
      this.phoneTimerProgress.style.width = stateData.progressWidth;
    }

    // 2. Simulate network sync delay (150ms) to Smart TV
    setTimeout(() => {
      this.renderTV(stateData);
      this.isTransitioning = false;
    }, 150);
  }

  renderTV(stateData) {
    if (!this.tvScreen) return;

    this.tvScreen.style.background = stateData.tvBg;

    if (this.tvBadge) {
      this.tvBadge.textContent = stateData.tvBadgeText;
      this.tvBadge.style.borderColor = stateData.tvBadgeColor;
      this.tvBadge.style.color = stateData.tvBadgeColor;
    }

    if (this.tvGraphic) {
      this.tvGraphic.src = stateData.graphicSvg;
      this.tvGraphic.alt = stateData.tvHeader;
    }

    if (this.tvTitle) {
      this.tvTitle.textContent = stateData.tvHeader;
    }

    if (this.tvDesc) {
      this.tvDesc.textContent = stateData.tvSub;
    }

    if (this.tvPinRow) {
      this.tvPinRow.style.display = stateData.showPins ? 'flex' : 'none';
    }
  }

  startLiveClock() {
    const clockEl = document.getElementById('tvLiveClock');
    const update = () => {
      if (!clockEl) return;
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hrs}:${mins}:${secs}`;
    };
    update();
    setInterval(update, 1000);
  }

  resetIdleTimer() {
    this.idleTime = 0;
  }

  startAutoTour() {
    const statesCycle = ['normal', 'warning', 'locked', 'bedtime'];
    setInterval(() => {
      this.idleTime += 1;
      // If user has not interacted for 12 seconds, switch to next demo state
      if (this.idleTime >= 12) {
        const nextIdx = (statesCycle.indexOf(this.currentState) + 1) % statesCycle.length;
        this.setState(statesCycle[nextIdx]);
        this.idleTime = 0;
      }
    }, 1000);
  }
}

// Global initialization
const TevySandbox = new SandboxController();
document.addEventListener('DOMContentLoaded', () => {
  TevySandbox.init();
});

if (typeof window !== 'undefined') {
  window.TevySandbox = TevySandbox;
  window.SANDBOX_STATES = SANDBOX_STATES;
}
