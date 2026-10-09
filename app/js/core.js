// Frame clock, tweens, springs and small math helpers.
// Everything is driven by performance.now() + requestAnimationFrame so the
// whole show can be captured deterministically with a virtual clock.

const tasks = new Set();
let last = performance.now();
let running = false;

export const now = () => performance.now();

export function onFrame(fn) {
  tasks.add(fn);
  return () => tasks.delete(fn);
}

function loop() {
  const t = performance.now();
  const dt = Math.min(0.05, Math.max(0, (t - last) / 1000));
  last = t;
  for (const fn of [...tasks]) fn(dt, t);
  requestAnimationFrame(loop);
}

export function startClock() {
  if (running) return;
  running = true;
  last = performance.now();
  requestAnimationFrame(loop);
}

export function wait(ms) {
  return new Promise((resolve) => {
    const end = performance.now() + ms;
    const off = onFrame((dt, t) => {
      if (t >= end) { off(); resolve(); }
    });
  });
}

export function tween(duration, fn, ease = easeOutCubic) {
  return new Promise((resolve) => {
    const t0 = performance.now();
    fn(ease(0), 0);
    const off = onFrame((dt, t) => {
      const k = duration <= 0 ? 1 : Math.min(1, (t - t0) / duration);
      fn(ease(k), k);
      if (k >= 1) { off(); resolve(); }
    });
  });
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, k) => a + (b - a) * k;
export const invLerp = (a, b, v) => clamp((v - a) / (b - a));
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (list) => list[Math.floor(Math.random() * list.length)];
export const chance = (p) => Math.random() < p;

export const easeLinear = (k) => k;
export const easeOutCubic = (k) => 1 - (1 - k) ** 3;
export const easeInCubic = (k) => k * k * k;
export const easeInOutCubic = (k) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);
export const easeOutQuint = (k) => 1 - (1 - k) ** 5;
export const easeInQuad = (k) => k * k;
export const easeOutQuad = (k) => 1 - (1 - k) * (1 - k);
export const easeOutBack = (k, s = 1.9) => 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2;
export const easeInBack = (k, s = 1.7) => (s + 1) * k * k * k - s * k * k;
export const easeOutElastic = (k) => (k === 0 || k === 1 ? k : 2 ** (-10 * k) * Math.sin((k * 10 - 0.75) * (2 * Math.PI / 3)) + 1);

// Critically-damped-ish spring used for squash, ears and small offsets.
export class Spring {
  constructor(value = 0, stiffness = 320, damping = 16) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }
  kick(v) { this.velocity += v; }
  step(dt) {
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const a = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
    return this.value;
  }
}

export function quadPoint(a, c, b, t) {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
}

let _centerFrame = 0;
const _centerCache = new WeakMap();

export function advanceFrame() {
  _centerFrame++;
}

export function centerOf(el) {
  if (!el || typeof el.getBoundingClientRect !== 'function') return { x: 0, y: 0, w: 0, h: 0 };
  const cached = _centerCache.get(el);
  if (cached && cached.f === _centerFrame) return cached.val;
  const r = el.getBoundingClientRect();
  const val = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  _centerCache.set(el, { f: _centerFrame, val });
  return val;
}

export const params = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');

// Adaptive resolution calculation (Pixel Budgeting)
export function getAdaptiveDPR(maxPixels = 1920 * 1080) {
  const rawDpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  const w = typeof window !== 'undefined' ? (window.innerWidth || 1920) : 1920;
  const h = typeof window !== 'undefined' ? (window.innerHeight || 1080) : 1080;
  let dpr = Math.min(rawDpr, 1.35);
  const currentPixels = (w * dpr) * (h * dpr);
  if (currentPixels > maxPixels && w * h > 0) {
    dpr = Math.sqrt(maxPixels / (w * h));
  }
  return Math.max(0.75, dpr);
}

// Hardware tier detection (software rendering / weak CPU)
export function detectHardwareTier() {
  let isSoftware = false;
  if (typeof document !== 'undefined') {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl) {
        const dbg = gl.getExtension('WEBGL_debug_renderer_info');
        if (dbg) {
          const r = (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
          isSoftware = /swiftshader|llvmpipe|software|mesa dri|microsoft basic|gallium/i.test(r);
        }
      } else {
        isSoftware = true;
      }
    } catch (_) {
      isSoftware = true;
    }
  }
  const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 2) : 4;
  const mem = typeof navigator !== 'undefined' ? (navigator.deviceMemory || 4) : 4;
  return (isSoftware || (cores <= 2 && mem <= 2)) ? 'low' : 'high';
}
