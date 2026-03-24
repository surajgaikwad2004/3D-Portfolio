/* ═══════════════════════════════════════════════════════════════
   NEXUS PORTFOLIO — main.js
   Requires: Three.js (loaded in index.html via CDN)
═══════════════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

/* ── PARTICLE / NETWORK CANVAS ──────────────────────────────── */
(function () {
  const c   = document.getElementById('particle-canvas');
  const ctx = c.getContext('2d');
  let W, H;
  const N = 120;
  const particles = [];

  function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.reset = function () {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = (Math.random() - 0.5) * 0.4;
      this.r     = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.color = Math.random() < 0.7 ? '0,245,255' : '255,0,200';
    };
    this.reset();
  }

  for (let i = 0; i < N; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    // Connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,255,${(1 - d / 120) * 0.12})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── HERO — THREE.JS 3D SCENE ───────────────────────────────── */
(function () {
  const canvas   = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Outer cyan wireframe torus knot
  const geo  = new THREE.TorusKnotGeometry(1.8, 0.5, 200, 32, 2, 3);
  const mat  = new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.25 });
  const knot = new THREE.Mesh(geo, mat);
  scene.add(knot);

  // Inner magenta wireframe torus knot (different winding)
  const mat2  = new THREE.MeshBasicMaterial({ color: 0xff00c8, wireframe: true, transparent: true, opacity: 0.12 });
  const knot2 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.3, 120, 20, 3, 2), mat2);
  scene.add(knot2);

  // Ambient point cloud
  const pGeo      = new THREE.BufferGeometry();
  const positions = new Float32Array(3000);
  for (let i = 0; i < 3000; i++) positions[i] = (Math.random() - 0.5) * 30;
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.04, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(pGeo, pMat));

  // Mouse parallax tracking
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX =  (e.clientX / innerWidth  - 0.5) * 2;
    mouseY = -(e.clientY / innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    knot.rotation.x  =  t * 0.4;
    knot.rotation.y  =  t * 0.6;
    knot2.rotation.x = -t * 0.3;
    knot2.rotation.y =  t * 0.8;
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (mouseY * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();

/* ── INTERSECTION OBSERVER — SCROLL REVEALS ─────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => obs.observe(el));

/* ── INTERSECTION OBSERVER — SKILL BARS ─────────────────────── */
const skillItems = document.querySelectorAll('.skill-item');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); skillObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
skillItems.forEach(el => skillObs.observe(el));

/* ── CARD — MOUSE RADIAL GLOW ───────────────────────────────── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100) + '%';
    const y = ((e.clientY - r.top)  / r.height * 100) + '%';
    card.querySelector('.card-glow').style.setProperty('--mx', x);
    card.querySelector('.card-glow').style.setProperty('--my', y);
  });
});

/* ── PARALLAX — HUD RINGS ON SCROLL ─────────────────────────── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hud-ring').forEach((ring, i) => {
    ring.style.transform = `translate(-50%, calc(-50% + ${y * (i * 0.05 + 0.02)}px))`;
  });
});
