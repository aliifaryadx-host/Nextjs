'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TJ as D } from '@/lib/data';
import { fx } from '@/lib/fx';
import Ico from './Ico';

const NAV = [['home', 'Home'], ['about', 'About'], ['join', 'Cara Join'], ['features', 'Fitur'], ['gallery', 'Galeri'], ['rules', 'Rules'], ['faq', 'FAQ']];

export default function Shell({ home = false, children }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false), [sfxOn, setSfxOn] = useState(true), [time, setTime] = useState(''), [stars, setStars] = useState([]), [top, setTop] = useState(false);

  useEffect(() => {
    if (!home) document.body.className = 'booted';
    setStars(Array.from({ length: 14 }, (_, i) => ({ c: '■✦◆★'[i % 4], l: Math.random() * 100, s: 14 + Math.random() * 30, du: 14 + Math.random() * 18, de: -Math.random() * 30 })));
    const clock = () => { const n = new Date(); setTime(String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0')); };
    clock(); const ci = setInterval(clock, 1000);

    const down = e => { const b = e.target.closest?.('.press'); if (b) { fx.burst(e.clientX, e.clientY); fx.restart(b, 'pressed', 400); } };
    const click = e => {
      const a = e.target.closest?.('a[href]'); if (!a) return;
      const h = a.getAttribute('href');
      if (a.target === '_blank' || !h.startsWith('/') || e.metaKey || e.ctrlKey) return;
      e.preventDefault(); fx.sfx.sel(); setMenu(false);
      const [path, hash] = h.split('#');
      if (hash !== undefined && (path === '' || path === location.pathname)) fx.transition(() => { document.getElementById(hash)?.scrollIntoView(); history.replaceState(null, '', '#' + hash); });
      else fx.transition(() => router.push(h));
    };
    const over = e => { const t = e.target.closest?.('button,.btn,.nav a'); if (t && !t.contains(e.relatedTarget) && t.id !== 'start') fx.sfx.hover(); };
    const move = e => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target.closest?.('.tilt');
      document.querySelectorAll('.tilt').forEach(x => { if (x !== el) { x.style.setProperty('--rx', '0deg'); x.style.setProperty('--ry', '0deg'); } });
      if (!el) return; const r = el.getBoundingClientRect();
      el.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 16).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5) * 16).toFixed(2) + 'deg');
    };
    const scroll = () => { setTop(scrollY > 600); document.getElementById('prog')?.style.setProperty('--p', scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)); };
    document.addEventListener('pointerdown', down); document.addEventListener('click', click); document.addEventListener('mouseover', over); document.addEventListener('pointermove', move); addEventListener('scroll', scroll, { passive: true });
    return () => { clearInterval(ci); document.removeEventListener('pointerdown', down); document.removeEventListener('click', click); document.removeEventListener('mouseover', over); document.removeEventListener('pointermove', move); removeEventListener('scroll', scroll); };
  }, [home, router]);

  return (
    <>
      <div className="bg" /><div id="stars" aria-hidden="true">{stars.map((s, i) => <i key={i} style={{ left: s.l + '%', fontSize: s.s, animationDuration: s.du + 's', animationDelay: s.de + 's' }}>{s.c}</i>)}</div><div className="bgv" /><div className="prog" id="prog" />
      <div id="flash" className="flash" /><div id="wipe" className="wipe"><i /><i /><i /></div><div id="fx" className="fx" />
      <div id="app" className="app flex min-h-dvh flex-col">
        <header className="hdr">
          <a href="/#home" className="tag sk"><Ico src="logo.jpg" /><span>TELORIJO</span></a>
          <nav className={`nav ${menu ? 'open' : ''}`} id="menu" aria-label="Menu">{NAV.map(([i, t]) => <a key={i} href={`/#${i}`} data-nav={i}>{t}</a>)}</nav>
          <div className="hr">
            {home ? <button className="btn btn-r sm press" onClick={() => { fx.sfx.sel(); fx.shake(); dispatchEvent(new CustomEvent('tj:open', { detail: 'playModal' })); }}>MAIN</button> : <a className="btn btn-r sm press" href="/#join">MAIN</a>}
            <button className="btn btn-k sm" aria-pressed={sfxOn} title="Efek suara" onClick={() => { const v = !sfxOn; setSfxOn(v); fx.setSfx(v); v && fx.sfx.sel(); }}>{sfxOn ? 'SFX ON' : 'SFX OFF'}</button>
            <button className="btn btn-k sm burger" aria-label="Menu" onClick={() => { fx.sfx.hover(); setMenu(m => !m); }}>☰</button>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        {home && <div className="grass" aria-hidden="true" />}
        <footer className="foot">
          <div className="fb"><Ico src="logo.jpg" /><b>Telorijo.web.id</b> • © 2026</div>
          <div className="fl">
            <a href="/vote"><Ico src={D.icons.vote} />Vote</a><a href="/store"><Ico src={D.icons.rank} />Rank</a>
            <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
            <a href={D.discord} target="_blank" rel="noopener noreferrer"><Ico src={D.icons.discord} />Discord</a>
          </div>
          <div className="keys">{home && <span><kbd>ESC</kbd> TUTUP</span>}<span id="clock">{time}</span></div>
        </footer>
      </div>
      <button className={`btn btn-k totop ${top ? 'show' : ''}`} aria-label="Ke atas" onClick={() => { fx.sfx.sel(); scrollTo({ top: 0, behavior: 'smooth' }); }}>▲</button>
    </>
  );
}
