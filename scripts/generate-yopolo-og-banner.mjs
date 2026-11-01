import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const imgPath = path.join(rootDir, 'public/yopolo/screenshots/4-2-ai-chat-dialog.jpg');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const imgSrc = 'data:image/jpeg;base64,' + imgBase64;

// 48 aesthetic radial ticks for the soundwave / neural constellation ring
const ticks = Array.from({ length: 48 }).map((_, i) => {
  const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
  const r1 = 252;
  const r2 = i % 4 === 0 ? 284 : 266;
  const x1 = Math.cos(a) * r1;
  const y1 = Math.sin(a) * r1;
  const x2 = Math.cos(a) * r2;
  const y2 = Math.sin(a) * r2;
  const color = i < 20 ? '#00F2FE' : (i < 34 ? '#A855F7' : '#242B3A');
  const width = i % 4 === 0 ? '2.5' : '1.5';
  const opacity = i < 34 ? (1 - i * 0.025).toFixed(2) : '0.35';
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacity}"/>`;
}).join('\n      ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070B"/>
      <stop offset="45%" stop-color="#0A0E17"/>
      <stop offset="100%" stop-color="#080B12"/>
    </linearGradient>

    <!-- Aurora Nebula Radial Gradients -->
    <radialGradient id="auroraCyanGlow" cx="80%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.32"/>
      <stop offset="45%" stop-color="#0284C7" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#05070B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="auroraPurpleGlow" cx="25%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.26"/>
      <stop offset="50%" stop-color="#6D28D9" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#05070B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="auroraPinkGlow" cx="95%" cy="85%" r="40%">
      <stop offset="0%" stop-color="#EC4899" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#05070B" stop-opacity="0"/>
    </radialGradient>

    <!-- Aurora Text Gradient -->
    <linearGradient id="auroraText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F2FE"/>
      <stop offset="45%" stop-color="#38BDF8"/>
      <stop offset="75%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>

    <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.2"/>
    </linearGradient>

    <!-- Phone Bezel Gradient -->
    <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0.4"/>
      <stop offset="20%" stop-color="#38BDF8" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="phoneShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="36" flood-color="#000000" flood-opacity="0.95"/>
      <feDropShadow dx="0" dy="4" stdDeviation="22" flood-color="#00F2FE" flood-opacity="0.25"/>
    </filter>

    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000000" flood-opacity="0.8"/>
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#00F2FE" flood-opacity="0.2"/>
    </filter>

    <!-- Phone Screen Clip Path -->
    <clipPath id="screenClip">
      <rect x="0" y="0" width="240" height="520" rx="36" ry="36"/>
    </clipPath>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#auroraCyanGlow)"/>
  <rect width="1200" height="630" fill="url(#auroraPurpleGlow)"/>
  <rect width="1200" height="630" fill="url(#auroraPinkGlow)"/>

  <!-- Subtle Cyber Hairline Grid -->
  <g opacity="0.05" stroke="#38BDF8" stroke-width="1">
    <line x1="0" y1="70" x2="1200" y2="70"/>
    <line x1="0" y1="140" x2="1200" y2="140"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="280" x2="1200" y2="280"/>
    <line x1="0" y1="350" x2="1200" y2="350"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="490" x2="1200" y2="490"/>
    <line x1="0" y1="560" x2="1200" y2="560"/>
    <line x1="100" y1="0" x2="100" y2="630"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="500" y1="0" x2="500" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="700" y1="0" x2="700" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
    <line x1="1100" y1="0" x2="1100" y2="630"/>
  </g>

  <!-- ==================== LEFT COLUMN: BRANDING & COPY ==================== -->

  <!-- Top HUD Pill -->
  <g transform="translate(72, 52)">
    <rect width="320" height="32" rx="16" fill="#0F172A" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1"/>
    <circle cx="16" cy="16" r="4.5" fill="#00F2FE"/>
    <text x="28" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="1.5">DOIT-STUDIO ECOSYSTEM</text>
    <text x="216" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#00F2FE">// YOPOLO AI</text>
  </g>

  <!-- Logo + Name -->
  <g transform="translate(72, 104)">
    <!-- App Icon Squircle -->
    <rect width="54" height="54" rx="15" fill="#0F172A" stroke="url(#auroraText)" stroke-width="1.8"/>
    <!-- Nexus Y Glyph inside squircle -->
    <path d="M 18 17 L 27 28 L 36 17 M 27 28 L 27 38" fill="none" stroke="#00F2FE" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="27" cy="28" r="3" fill="#EC4899"/>

    <!-- Brand Typography -->
    <text x="70" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">Yopolo</text>
    <rect x="236" y="16" width="138" height="26" rx="8" fill="url(#pillGrad)" stroke="rgba(139, 92, 246, 0.4)" stroke-width="1"/>
    <text x="246" y="33" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#C084FC" letter-spacing="1">GEMINI AI 1.5</text>
  </g>

  <!-- Headline -->
  <g transform="translate(72, 206)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-1">Mở Lối Ngoại Ngữ.</text>
    <text x="0" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="url(#auroraText)" letter-spacing="-1">Tự Do Đối Thoại 24/7.</text>
  </g>

  <!-- Subtitle Paragraph -->
  <g transform="translate(72, 308)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94A3B8" letter-spacing="0.1">
      <tspan x="0" dy="0">Trợ lý luyện phản xạ giao tiếp AI đa ngôn ngữ: Khởi tạo chủ đề mỗi ngày,</tspan>
      <tspan x="0" dy="26">bóc tách từ vựng, sửa lỗi ngữ pháp tức thì và lưu Flashcard 1 chạm.</tspan>
    </text>
  </g>

  <!-- Core Feature Badges Matrix (2x2) -->
  <g transform="translate(72, 384)">
    <!-- Badge 1: 5 Languages -->
    <g transform="translate(0, 0)">
      <rect width="255" height="38" rx="10" fill="#0F172A" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="18" cy="19" r="4.5" fill="#00F2FE"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0">Anh · Trung · Hàn · Nhật · Pháp</text>
    </g>

    <!-- Badge 2: AI Grammar Correction -->
    <g transform="translate(267, 0)">
      <rect width="248" height="38" rx="10" fill="#0F172A" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="18" cy="19" r="4.5" fill="#8B5CF6"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#DDD6FE">Sửa Lỗi Bằng Tiếng Mẹ Đẻ</text>
    </g>

    <!-- Badge 3: Web QR Sync -->
    <g transform="translate(0, 48)">
      <rect width="255" height="38" rx="10" fill="#0F172A" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="18" cy="19" r="4.5" fill="#EC4899"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#FBCFE8">Đồng Bộ Mã QR Web Realtime</text>
    </g>

    <!-- Badge 4: Flashcards Notebook -->
    <g transform="translate(267, 48)">
      <rect width="248" height="38" rx="10" fill="#0F172A" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="18" cy="19" r="4.5" fill="#38BDF8"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#BAE6FD">Sổ Tay Flashcard 1 Chạm</text>
    </g>
  </g>

  <!-- Bottom Trust & Canonical URL Bar -->
  <g transform="translate(72, 545)">
    <rect width="515" height="40" rx="12" fill="#0A0E17" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
    <!-- Platforms Summary -->
    <text x="18" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#94A3B8">
       iOS  ·  ▶ Android  ·  💻 <tspan fill="#F8FAFC">Web Client</tspan>
    </text>
    <!-- URL -->
    <text x="498" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#00F2FE" text-anchor="end">doitstudio.tech/yopolo</text>
  </g>


  <!-- ==================== RIGHT COLUMN: NEURAL RING & PHONE MOCKUP ==================== -->

  <!-- Concentric Neural Ring / Soundwave Watermark -->
  <g transform="translate(920, 315)">
    <circle cx="0" cy="0" r="260" fill="none" stroke="rgba(0, 242, 254, 0.22)" stroke-width="1.5" stroke-dasharray="6 8"/>
    <circle cx="0" cy="0" r="235" fill="none" stroke="rgba(139, 92, 246, 0.16)" stroke-width="1"/>
    <circle cx="0" cy="0" r="290" fill="none" stroke="rgba(236, 72, 153, 0.12)" stroke-width="1"/>

    <!-- Radiating Neural Ticks -->
    <g stroke-linecap="round">
      ${ticks}
    </g>
  </g>

  <!-- Phone Mockup Container (Rotated slightly 3 deg for premium angle) -->
  <g transform="translate(915, 315) rotate(3)">
    <g transform="translate(-130, -270)" filter="url(#phoneShadow)">
      <!-- Outer Bezel -->
      <rect x="0" y="0" width="260" height="540" rx="44" fill="url(#bezelGrad)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.5"/>
      <!-- Inner Rim -->
      <rect x="8" y="8" width="244" height="524" rx="38" fill="#05070B"/>

      <!-- Clipped Screen Content -->
      <g transform="translate(10, 10)" clip-path="url(#screenClip)">
        <image href="${imgSrc}" x="0" y="0" width="240" height="520" preserveAspectRatio="xMidYMid slice"/>
      </g>

      <!-- Dynamic Island Pill -->
      <rect x="92" y="18" width="76" height="20" rx="10" fill="#000000"/>
      <circle cx="152" cy="28" r="4.5" fill="#111827"/>
    </g>
  </g>

  <!-- ==================== FLOATING INTERACTIVE GLASS CHIPS ==================== -->

  <!-- Chip 1: Grammar Correction (Top Left of Phone) -->
  <g transform="translate(680, 105)" filter="url(#cardShadow)">
    <rect width="190" height="38" rx="19" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(0, 242, 254, 0.6)" stroke-width="1.5"/>
    <circle cx="20" cy="19" r="4.5" fill="#00F2FE"/>
    <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#38BDF8" letter-spacing="0.5">SỬA LỖI TỨC THÌ AI</text>
  </g>

  <!-- Chip 2: Daily Reflex (Top Right of Phone) -->
  <g transform="translate(980, 75)" filter="url(#cardShadow)">
    <rect width="168" height="38" rx="19" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(168, 85, 247, 0.6)" stroke-width="1.5"/>
    <circle cx="20" cy="19" r="4.5" fill="#A855F7"/>
    <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#DDD6FE">Phản xạ 15p/ngày</text>
  </g>

  <!-- Chip 3: Flashcard Glass Card (Bottom Center/Right) -->
  <g transform="translate(660, 475)" filter="url(#cardShadow)">
    <rect width="250" height="76" rx="18" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(236, 72, 153, 0.5)" stroke-width="1.5"/>
    <rect x="0" y="0" width="5" height="76" rx="2.5" fill="#EC4899"/>
    <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94A3B8" letter-spacing="1.5">SỔ TAY CÁ NHÂN HÓA</text>
    <text x="20" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">1 Chạm <tspan font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#EC4899">lưu Flashcards</tspan></text>
  </g>

</svg>`;

// Save SVG
const svgPath = path.join(rootDir, 'public/yopolo/assets/yopolo-og-banner.svg');
fs.writeFileSync(svgPath, svg);
console.log('Saved SVG to:', svgPath);

// Render to PNG 1200x630
const pngPath = path.join(rootDir, 'public/yopolo/assets/yopolo-og-banner.png');
await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile(pngPath);

console.log('Saved PNG to:', pngPath);

