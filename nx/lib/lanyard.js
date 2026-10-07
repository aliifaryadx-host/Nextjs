/* Gantungan kartu nama: tali (verlet) + kartu rigid. Bisa ditarik, mantul, berputar. Tali tidak bisa putus. */
export function initLanyard() {
  const box = document.getElementById('lany'); if (!box) return () => {};
  const cv = document.getElementById('rope'), g = cv.getContext('2d'),
    card = document.getElementById('idcard'), spin = document.getElementById('spin');
  const N = 9, STEP = 1000 / 120, GRAV = .28, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dead = false, raf = 0, kt = 0, W = 0, H = 0, s = 1, cw = 230, ch = 326, P = [], C = [], grab = null, tx = 0, ty = 0, lx = 0, th = 0, w = 0, tgt = 0, run = true, down = null, acc = 0, last = 0;
  const pt = (x, y, m) => P.push({ x, y, px: x, py: y, w: m });
  const link = (a, b, k) => C.push([a, b, Math.hypot(P[a].x - P[b].x, P[a].y - P[b].y), k]);

  function build() {
    W = box.clientWidth; H = box.clientHeight;
    cw = Math.max(170, Math.min(230, W * .62)); ch = cw + 96; s = cw / 230;
    box.style.setProperty('--cw', cw + 'px'); box.style.setProperty('--ch', ch + 'px');
    const d = devicePixelRatio || 1; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    P = []; C = []; th = w = tgt = 0; grab = null;
    const ax = W / 2, L = 120 * s, top = 10 + L + 16 * s;
    for (let i = 0; i <= N; i++) pt(ax, 10 + i * L / N, i ? 1 : 0);
    pt(ax - cw / 2, top, .45); pt(ax + cw / 2, top, .45); pt(ax + cw / 2, top + ch, .45); pt(ax - cw / 2, top + ch, .45);
    for (let i = 0; i < N; i++) link(i, i + 1, .9);
    const a = N + 1, b = N + 2, c = N + 3, e = N + 4;
    [[a, b], [b, c], [c, e], [e, a], [a, c], [b, e]].forEach(([x, y]) => link(x, y, 1));
    link(N, a, 1); link(N, b, 1);
  }

  function sim() {
    for (const p of P) { if (!p.w) continue; const vx = (p.x - p.px) * .996, vy = (p.y - p.py) * .996; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + GRAV * s; }
    for (let it = 0; it < 12; it++) {
      for (const [i, j, d0, k] of C) {
        const a = P[i], b = P[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-3, sum = a.w + b.w; if (!sum) continue;
        const f = (d - d0) / d * k; a.x += dx * f * a.w / sum; a.y += dy * f * a.w / sum; b.x -= dx * f * b.w / sum; b.y -= dy * f * b.w / sum;
      }
      if (grab) { const p = grab.p, ex = tx + grab.ox - p.x, ey = ty + grab.oy - p.y, m = Math.min(1, 40 / (Math.hypot(ex, ey) || 1)); p.x += ex * .35 * m; p.y += ey * .35 * m; }
    }
    for (const p of P) { if (!p.w) continue; if (p.x < 6) p.x = p.px = 6; if (p.x > W - 6) p.x = p.px = W - 6; if (p.y > H - 6) p.y = p.py = H - 6; if (p.y < 4) p.y = p.py = 4; }
    w += (tgt - th) * .03; w *= .95; th += w;
  }

  /* Pembatas & pemulih: tarikan tidak boleh melebihi jangkauan tali, dan kartu tidak boleh terbalik/tersangkut */
  const clampT = () => { const ax = W / 2, ay = 10, dx = tx - ax, dy = ty - ay, d = Math.hypot(dx, dy), R = (136 * s + ch) * .95; if (d > R) { tx = ax + dx * R / d; ty = ay + dy * R / d; } };
  function sane() {
    const a = P[N + 1], b = P[N + 2], e = P[N + 4], r = P[N], mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const cr = (b.x - a.x) * (e.y - a.y) - (b.y - a.y) * (e.x - a.x), up = (r.x - mx) * (a.x - e.x) + (r.y - my) * (a.y - e.y);
    return Number.isFinite(cr) && cr > .5 * cw * ch && up > 0;
  }

  function draw() {
    g.clearRect(0, 0, W, H);
    const a = P[N + 1], b = P[N + 2], c = P[N + 3], e = P[N + 4];
    const cx = (a.x + b.x + c.x + e.x) / 4, cy = (a.y + b.y + c.y + e.y) / 4, ang = Math.atan2(b.y - a.y, b.x - a.x);
    card.style.transform = `translate(${cx}px,${cy}px) rotate(${ang}rad) translate(${-cw / 2}px,${-ch / 2}px)`;
    spin.style.transform = `rotateY(${th}deg)`;
    const pts = P.slice(0, N + 1).map(p => [p.x, p.y]); pts.push([(a.x + b.x) / 2, (a.y + b.y) / 2]);
    g.lineCap = g.lineJoin = 'round';
    const path = () => { g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < pts.length - 1; i++) g.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2); g.lineTo(...pts[pts.length - 1]); };
    path(); g.strokeStyle = '#14281a'; g.lineWidth = 19 * s; g.stroke();
    path(); g.strokeStyle = '#8fd14f'; g.lineWidth = 13 * s; g.stroke();
    path(); g.strokeStyle = 'rgba(255,255,255,.65)'; g.lineWidth = 3 * s; g.setLineDash([7 * s, 11 * s]); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#14281a'; g.beginPath(); g.arc(pts[0][0], pts[0][1], 11 * s, 0, 7); g.fill();
    g.fillStyle = '#fff6ee'; g.beginPath(); g.arc(pts[0][0], pts[0][1], 5 * s, 0, 7); g.fill();
  }

  function loop(t) {
    if (dead) return; raf = requestAnimationFrame(loop);
    const dt = Math.min(t - last, 50); last = t;
    if (!run || document.hidden || !P.length) return;
    acc += dt; while (acc >= STEP) { sim(); acc -= STEP; }
    if (!sane()) { build(); return; }
    draw();
  }

  const kick = v => P.forEach(p => { if (p.w) p.px -= v * (p.w > .5 ? .6 : .3); });
  const flip = () => { tgt += 180; };
  const local = e => { const r = box.getBoundingClientRect(), kx = r.width ? W / r.width : 1, ky = r.height ? H / r.height : 1; return [(e.clientX - r.left) * kx, (e.clientY - r.top) * ky]; };

  box.addEventListener('pointerdown', e => {
    const [x, y] = local(e), onCard = !!e.target.closest('#idcard');
    let best = null, bd = 1e9;
    for (let i = onCard ? N + 1 : 1; i <= (onCard ? N + 4 : N); i++) { const d = Math.hypot(P[i].x - x, P[i].y - y); if (d < bd && (onCard || d < 28)) { bd = d; best = P[i]; } }
    if (!best) return;
    grab = { p: best, ox: best.x - x, oy: best.y - y, card: onCard }; tx = x; ty = y; clampT(); lx = e.clientX;
    down = { t: performance.now(), moved: 0 }; box.setPointerCapture(e.pointerId);
  });
  box.addEventListener('pointermove', e => {
    if (!grab) return; [tx, ty] = local(e); clampT();
    const dx = e.clientX - lx; lx = e.clientX; down.moved += Math.abs(dx) + 1 * (Math.abs(e.movementY) || 0);
    if (grab.card) w += Math.max(-4, Math.min(4, dx * .12));
  });
  const up = () => { if (grab && grab.card) { if (down.moved < 8 && performance.now() - down.t < 400) flip(); else tgt = Math.round((th + w * 6) / 180) * 180; } grab = null; };
  box.addEventListener('pointerup', up); box.addEventListener('pointercancel', () => { grab = null; });
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  document.getElementById('flipBtn').addEventListener('click', flip);
  document.getElementById('shakeBtn').addEventListener('click', () => { kick((Math.random() < .5 ? -1 : 1) * (10 + Math.random() * 6)); w += (Math.random() - .5) * 20; });

  const io = new IntersectionObserver(es => { run = es[0].isIntersecting; }); io.observe(box);
  const ro = new ResizeObserver(() => {
    const nw = box.clientWidth, nh = box.clientHeight; if (!nw || (Math.abs(nw - W) < 1 && Math.abs(nh - H) < 1)) return;
    if (P.length && Math.abs(nw - W) < 40 && Math.abs(nh - H) < 40) {   // perubahan kecil (mis. scrollbar): geser saja, jangan reset tali
      const dx = (nw - W) / 2; P.forEach(p => { p.x += dx; p.px += dx; }); W = nw; H = nh;
      const d = devicePixelRatio || 1; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    } else build();
  }); ro.observe(box);
  build(); raf = requestAnimationFrame(loop);
  if (!reduce) kt = setTimeout(() => kick(11), 700);
  return () => { dead = true; cancelAnimationFrame(raf); clearTimeout(kt); io.disconnect(); ro.disconnect(); };
}
