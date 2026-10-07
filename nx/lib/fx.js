/* SFX sintetis + efek visual (hanya jalan di browser) */
let sfxOn = true, ctx, busy = false;
const $ = s => document.querySelector(s);
const tone = (t, a, b, d, v, dl = 0) => {
  if (!sfxOn || typeof window === 'undefined') return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain(), s = ctx.currentTime + dl;
    o.type = t; o.frequency.setValueAtTime(a, s); o.frequency.exponentialRampToValueAtTime(b, s + d);
    g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(.001, s + d);
    o.connect(g); g.connect(ctx.destination); o.start(s); o.stop(s + d);
  } catch (e) {}
};
const restart = (el, c, ms) => { if (!el) return; el.classList.remove(c); void el.offsetWidth; el.classList.add(c); setTimeout(() => el.classList.remove(c), ms); };
const colors = ['#2e8b2e', '#fff', '#ffc94d', '#f7a5ab', '#9be15a'];
export const fx = {
  setSfx: v => { sfxOn = v; }, isSfx: () => sfxOn, restart,
  sfx: {
    hover: () => tone('triangle', 440, 880, .05, .06),
    sel: () => { tone('sine', 150, 30, .25, .3); tone('sawtooth', 800, 200, .15, .15); },
    wh: () => tone('sawtooth', 120, 1400, .35, .06),
    start: () => { tone('sine', 120, 25, .5, .4); [330, 495, 660].forEach((f, i) => tone('square', f, f, .1, .07, i * .08)); }
  },
  shake: () => restart($('#app'), 'shake', 420),
  flash: () => restart($('#flash'), 'go', 250),
  burst(x, y) {
    const box = $('#fx'); if (!box) return;
    const r = document.createElement('div'); r.className = 'ring'; r.style.left = x + 'px'; r.style.top = y + 'px'; box.appendChild(r); setTimeout(() => r.remove(), 600);
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * 6.28, d = 60 + Math.random() * 110, p = document.createElement('b'); p.className = 'shard';
      p.style.cssText = `--x:${x}px;--y:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--r:${Math.random() * 720 - 360}deg;--s:${10 + Math.random() * 22}px;--c:${colors[i % 5]}`;
      box.appendChild(p); setTimeout(() => p.remove(), 700);
    }
  },
  transition(fn) {
    if (busy) return; busy = true; fx.sfx.wh();
    restart($('#wipe'), 'run', 1020); setTimeout(fn, 560); setTimeout(() => { busy = false; }, 1020);
  },
  isBusy: () => busy
};
