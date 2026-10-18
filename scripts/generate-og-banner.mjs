import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const imgPath = path.join(rootDir, 'public/pledgo/assets/screens/year-dashboard.jpg');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const imgSrc = 'data:image/jpeg;base64,' + imgBase64;

// 48 aesthetic radial ticks for the 365 concentric ring
const ticks = Array.from({ length: 48 }).map((_, i) => {
  const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
  const r1 = 250;
  const r2 = i % 4 === 0 ? 282 : 266;
  const x1 = Math.cos(a) * r1;
  const y1 = Math.sin(a) * r1;
  const x2 = Math.cos(a) * r2;
  const y2 = Math.sin(a) * r2;
  const color = i < 18 ? '#F59E0B' : '#242B3A';
  const width = i % 4 === 0 ? '2.5' : '1.5';
  const opacity = i < 18 ? (1 - i * 0.035).toFixed(2) : '0.4';
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacity}"/>`;
}).join('\n      ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08090E"/>
      <stop offset="50%" stop-color="#0F121C"/>
      <stop offset="100%" stop-color="#090A0F"/>
    </linearGradient>

    <radialGradient id="bronzeGlow" cx="75%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#D97706" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#090A0F" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="cobaltGlow" cx="20%" cy="80%" r="45%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#090A0F" stop-opacity="0"/>
    </radialGradient>

    <!-- Metallic Bronze Text Gradient -->
    <linearGradient id="bronzeText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="35%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <!-- Phone Bezel Gradient -->
    <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A4152"/>
      <stop offset="35%" stop-color="#1A1F2C"/>
      <stop offset="100%" stop-color="#0D0F15"/>
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="phoneShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="36" flood-color="#000000" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="4" stdDeviation="20" flood-color="#D97706" flood-opacity="0.25"/>
    </filter>

    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.7"/>
    </filter>

    <!-- Phone Screen Clip Path -->
    <clipPath id="screenClip">
      <rect x="0" y="0" width="240" height="520" rx="36" ry="36"/>
    </clipPath>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#bronzeGlow)"/>
  <rect width="1200" height="630" fill="url(#cobaltGlow)"/>

  <!-- Subtle Cyber Hairline Grid -->
  <g opacity="0.05" stroke="#94A3B8" stroke-width="1">
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
  
  <!-- HUD Label Pill -->
  <g transform="translate(72, 54)">
    <rect width="310" height="32" rx="16" fill="#12151E" stroke="#242B3A" stroke-width="1"/>
    <circle cx="16" cy="16" r="4.5" fill="#10B981"/>
    <text x="28" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="1.5">DOIT-STUDIO ECOSYSTEM</text>
    <text x="212" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#F59E0B">// PLEDGO</text>
  </g>

  <!-- Logo + Name -->
  <g transform="translate(72, 108)">
    <!-- Mini App Icon Squircle -->
    <rect width="52" height="52" rx="14" fill="#141722" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1.5"/>
    <rect x="15" y="12" width="4" height="28" rx="2" fill="#FFFFFF"/>
    <path d="M 19 14 H 30 C 37 14, 41 18, 41 24 C 41 29, 37 32, 32 33 C 27 34, 24 33, 21 36 L 21 40 H 19 Z" fill="url(#bronzeText)"/>
    <circle cx="28" cy="24" r="2.5" fill="#FFFFFF"/>

    <!-- Brand Typography -->
    <text x="68" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">pled<tspan fill="url(#bronzeText)">go</tspan></text>
  </g>

  <!-- Headline -->
  <g transform="translate(72, 210)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-1">Bắt Trọn Mục Tiêu Năm.</text>
    <text x="0" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="url(#bronzeText)" letter-spacing="-1">Giữ Trọn Lời Thề 365 Ngày.</text>
  </g>

  <!-- Subtitle Paragraph -->
  <g transform="translate(72, 310)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94A3B8" letter-spacing="0.1">
      <tspan x="0" dy="0">Khế ước danh dự 365 ngày: Tuyên thệ một lần, khoá chỉ tiêu</tspan>
      <tspan x="0" dy="26">và hành động mỗi ngày trước dòng nước thời gian đang rút.</tspan>
    </text>
  </g>

  <!-- Core Pillars Badges -->
  <g transform="translate(72, 386)">
    <!-- Badge 1: 365-day Countdown -->
    <g transform="translate(0, 0)">
      <rect width="242" height="38" rx="10" fill="#12151E" stroke="#242B3A" stroke-width="1"/>
      <circle cx="18" cy="19" r="4" fill="#F59E0B"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#FDE68A">365 Ngày Đếm Ngược Năm</text>
    </g>

    <!-- Badge 2: The Pledge Rule -->
    <g transform="translate(254, 0)">
      <rect width="248" height="38" rx="10" fill="#12151E" stroke="#242B3A" stroke-width="1"/>
      <circle cx="18" cy="19" r="4" fill="#10B981"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#6EE7B7">Nghi Thức Khóa Tuyên Thệ</text>
    </g>

    <!-- Badge 3: Goal Types -->
    <g transform="translate(0, 48)">
      <rect width="255" height="38" rx="10" fill="#12151E" stroke="#242B3A" stroke-width="1"/>
      <circle cx="18" cy="19" r="4" fill="#3B82F6"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#93C5FD">Thói Quen · Tích Lũy · Epic</text>
    </g>

    <!-- Badge 4: Museum -->
    <g transform="translate(267, 48)">
      <rect width="235" height="38" rx="10" fill="#12151E" stroke="#242B3A" stroke-width="1"/>
      <circle cx="18" cy="19" r="4" fill="#EAB308"/>
      <text x="30" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#FEF08A">Bảo Tàng Danh Dự Cá Nhân</text>
    </g>
  </g>

  <!-- Bottom Trust & Canonical URL Bar -->
  <g transform="translate(72, 545)">
    <rect width="502" height="40" rx="12" fill="#0D1017" stroke="#1F2430" stroke-width="1"/>
    <!-- Store Badges Summary -->
    <text x="16" y=\"25\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"#94A3B8\">
       App Store  ·  ▶ Google Play  ·  <tspan fill=\"#F8FAFC\">iOS &amp; Android</tspan>
    </text>
    <!-- URL -->
    <text x=\"486\" y=\"25\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#F59E0B\" text-anchor=\"end\">doitstudio.tech/pledgo</text>
  </g>


  <!-- ==================== RIGHT COLUMN: 365-RING & PHONE MOCKUP ==================== -->

  <!-- Concentric Time Ring Watermark -->
  <g transform=\"translate(920, 315)\">
    <circle cx=\"0\" cy=\"0\" r=\"260\" fill=\"none\" stroke=\"rgba(217,119,6,0.18)\" stroke-width=\"1.5\" stroke-dasharray=\"6 8\"/>
    <circle cx=\"0\" cy=\"0\" r=\"235\" fill=\"none\" stroke=\"rgba(255,255,255,0.04)\" stroke-width=\"1\"/>
    <circle cx=\"0\" cy=\"0\" r=\"290\" fill=\"none\" stroke=\"rgba(245,158,11,0.08)\" stroke-width=\"1\"/>

    <!-- Radiating Solar Ticks -->
    <g stroke-linecap=\"round\">
      ${ticks}
    </g>
  </g>

  <!-- Phone Mockup Container (Rotated slightly 3 deg for premium angle) -->
  <g transform=\"translate(915, 315) rotate(3)\">
    <g transform=\"translate(-130, -270)\" filter=\"url(#phoneShadow)\">
      <!-- Outer Bezel -->
      <rect x=\"0\" y=\"0\" width=\"260\" height=\"540\" rx=\"44\" fill=\"url(#bezelGrad)\" stroke=\"rgba(255,255,255,0.14)\" stroke-width=\"1.5\"/>
      <!-- Inner Rim -->
      <rect x=\"8\" y=\"8\" width=\"244\" height=\"524\" rx=\"38\" fill=\"#000000\"/>

      <!-- Clipped Screen Content -->
      <g transform=\"translate(10, 10)\" clip-path=\"url(#screenClip)\">
        <image href=\"${imgSrc}\" x=\"0\" y=\"0\" width=\"240\" height=\"520\" preserveAspectRatio=\"xMidYMid slice\"/>
      </g>

      <!-- Dynamic Island Pill -->
      <rect x=\"92\" y=\"18\" width=\"76\" height=\"20\" rx=\"10\" fill=\"#000000\"/>
      <circle cx=\"152\" cy=\"28\" r=\"4.5\" fill=\"#111827\"/>
    </g>
  </g>

  <!-- ==================== FLOATING INTERACTIVE CHIPS ==================== -->

  <!-- Chip 1: Pledged Status (Top Left of Phone) -->
  <g transform=\"translate(700, 105)\" filter=\"url(#cardShadow)\">
    <rect width=\"170\" height=\"38\" rx=\"19\" fill=\"rgba(9, 10, 15, 0.94)\" stroke=\"#D97706\" stroke-width=\"1.5\"/>
    <!-- Shield Icon -->
    <path d=\"M 26 14 L 32 17 L 38 14 V 23 C 38 27, 32 30, 32 30 C 32 30, 26 27, 26 23 Z\" fill=\"#D97706\" opacity=\"0.2\" stroke=\"#F59E0B\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>
    <path d=\"M 29 22 L 31 24 L 35 19\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>
    <text x=\"44\" y=\"24\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"11\" font-weight=\"800\" fill=\"#FCD34D\" letter-spacing=\"1\">ĐÃ TUYÊN THỆ</text>
  </g>

  <!-- Chip 2: Streak 14 (Top Right of Phone) -->
  <g transform=\"translate(980, 75)\" filter=\"url(#cardShadow)\">
    <rect width=\"165\" height=\"38\" rx=\"19\" fill=\"rgba(9, 10, 15, 0.94)\" stroke=\"#10B981\" stroke-width=\"1.5\" stroke-opacity=\"0.7\"/>
    <circle cx=\"22\" cy=\"19\" r=\"4.5\" fill=\"#10B981\"/>
    <text x=\"34\" y=\"24\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#A7F3D0\">Chuỗi: 14 ngày</text>
  </g>

  <!-- Chip 3: Live Countdown Glass Card (Bottom Center/Right) -->
  <g transform=\"translate(675, 475)\" filter=\"url(#cardShadow)\">
    <rect width=\"235\" height=\"76\" rx=\"18\" fill=\"rgba(26, 31, 44, 0.94)\" stroke=\"#242B3A\" stroke-width=\"1.5\"/>
    <rect x=\"0\" y=\"0\" width=\"5\" height=\"76\" rx=\"2.5\" fill=\"#F59E0B\"/>
    <text x=\"20\" y=\"26\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"10\" font-weight=\"800\" fill=\"#94A3B8\" letter-spacing=\"1.5\">ĐẾM NGƯỢC THỜI GIAN THỰC</text>
    <text x=\"20\" y=\"58\" font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"32\" font-weight=\"800\" fill=\"#F8FAFC\">74 <tspan font-family=\"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif\" font-size=\"13\" font-weight=\"600\" fill=\"#94A3B8\">ngày còn lại · 2026</tspan></text>
  </g>

</svg>`;

// Save SVG
const svgPath = path.join(rootDir, 'public/pledgo/assets/pledgo-og-banner.svg');
fs.writeFileSync(svgPath, svg);
console.log('Saved SVG to:', svgPath);

// Render to PNG 1200x630
const pngPath = path.join(rootDir, 'public/pledgo/assets/pledgo-og-banner.png');
await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile(pngPath);

console.log('Saved PNG to:', pngPath);
