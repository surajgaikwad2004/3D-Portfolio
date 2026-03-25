# NEXUS // Portfolio

> A futuristic cyberpunk portfolio website built with Three.js, vanilla JavaScript, and CSS animations.

![Version](https://img.shields.io/badge/version-2.4.1-00f5ff?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-r128-ff00c8?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-ffe600?style=flat-square)

---

## Preview

```
╔══════════════════════════════════════╗
║  SURAJ         ●  SYS_ONLINE     ║
╠══════════════════════════════════════╣
║                                      ║
║        ◈  Suraj Gaikwad ◈           ║
║   Full-Stack Developer · 3D Artist   ║
║                                      ║
╚══════════════════════════════════════╝
```

---

## Features

### 3D Hero Section
- Dual rotating **TorusKnot** meshes rendered via Three.js (WebGL)
- Mouse-reactive camera parallax — the scene follows your cursor
- Ambient floating point cloud (3 000 vertices)
- Transparent / wireframe materials with cyan + magenta color scheme

### Animated Background
- **Particle network canvas** — 120 connected nodes drifting across the full viewport
- Dynamic connection lines drawn between nearby particles
- Radial gradient mesh background with deep-space tones
- SVG noise texture overlay for film-grain feel
- Repeating CRT scanline sweep animation

### Scroll & Parallax Effects
- HUD rings parallax at different speeds on scroll
- `.reveal`, `.reveal-left`, `.reveal-right` classes animate elements in via IntersectionObserver
- Skill bars animate from 0 → target width on scroll entry
- Smooth native scroll behavior (`scroll-behavior: smooth`)

### Interactive Project Cards
- Mouse-position radial glow that follows the cursor inside each card
- Running dashed border animation on hover (CSS background-position trick)
- Card lift + subtle scale transform on hover
- Badge system: AI / 3D / Web categories

### Cursor Effects
- Custom dual-layer cursor: solid dot + lagging ring
- Ring uses lerp smoothing (12% per frame) for fluid trailing
- Cursor color shifts cyan → magenta when hovering links/cards
- Ring expands on interactive elements via CSS `:has()` selector

### Design System
| Token | Value |
|---|---|
| `--cyan` | `#00f5ff` |
| `--magenta` | `#ff00c8` |
| `--yellow` | `#ffe600` |
| `--bg` | `#020408` |
| Display font | Orbitron (900) |
| Mono font | Share Tech Mono |
| Body font | Rajdhani (300 / 600) |

---

## Project Structure

```
portfolio/
├── index.html      # HTML markup — all sections and components
├── style.css       # All styles — variables, keyframes, layout, responsive
├── main.js         # JavaScript — Three.js, particles, cursor, observers
└── README.md       # This file
```

---

## Getting Started

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, Safari 16+)
- No build tools or package manager required — pure vanilla stack

### Run Locally

```bash
# Clone or download the project
git clone https://github.com/yourname/nexus-portfolio.git
cd nexus-portfolio

# Open directly in browser
open index.html

# Or serve with any static server (recommended for best results)
npx serve .
# or
python -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

---

## Dependencies

All loaded via CDN — no installation needed.

| Library | Version | Purpose |
|---|---|---|
| [Three.js](https://threejs.org) | r128 | 3D hero scene (WebGL) |
| [Google Fonts](https://fonts.google.com) | — | Orbitron, Share Tech Mono, Rajdhani |

---

## Sections

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Full-viewport 3D scene with glitch title and CTA buttons |
| 02 | **About** | Bio, animated stats grid, floating avatar, skill bars |
| 03 | **Projects** | 6 interactive project cards with tags and badges |
| 04 | **Stack** | Scrolling tech marquee + icon grid |
| 05 | **Experience** | Vertical timeline with glowing dots |
| 06 | **Contact** | Pulsing glow box with email and social links |

---

## Customisation

### Change Name & Title
In `index.html`, update the hero section:
```html
<div class="glitch" data-text="YOUR NAME">YOUR NAME</div>
```

### Change Color Scheme
In `style.css`, edit the CSS variables at the top:
```css
:root {
  --cyan:    #00f5ff;   /* primary accent */
  --magenta: #ff00c8;   /* secondary accent */
  --yellow:  #ffe600;   /* tertiary accent */
  --bg:      #020408;   /* background */
}
```

### Add / Edit Projects
Copy a `.card` block in `index.html` and update the title, description, tags, and the `background` gradient on `.card-img-bg`.

### Change 3D Object
In `main.js`, swap `TorusKnotGeometry` for any Three.js geometry:
```js
// Examples
new THREE.IcosahedronGeometry(2, 1)
new THREE.OctahedronGeometry(2, 0)
new THREE.SphereGeometry(1.8, 32, 32)
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 105+ | ✅ Full |
| Firefox 110+ | ✅ Full |
| Safari 16+ | ✅ Full |
| Edge 105+ | ✅ Full |

> **Note:** The custom cursor uses CSS `:has()` — on older browsers it gracefully falls back to the default cursor.

---

## Performance Tips

- The Three.js scene is capped at `devicePixelRatio` max 2× to protect mobile GPUs
- Particle count (`N = 120`) can be reduced in `main.js` for slower devices
- The `backdrop-filter: blur()` on cards can be removed on low-end hardware

---

## License

MIT © 2026 Suraj Gaikwad

---

*Built with 🔷 Three.js · Pure CSS · Vanilla JS — no frameworks, no bundlers*
