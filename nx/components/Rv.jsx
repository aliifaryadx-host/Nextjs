'use client';
import { useEffect, useRef } from 'react';

/* Animasi muncul saat di-scroll. Ada 3 lapis pengaman supaya teks tidak pernah tetap blank. */
export default function Rv({ d = 0, className = '', children, ...p }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const show = () => el.classList.add('in');
    const chk = () => el.getBoundingClientRect().top < innerHeight * .96 && show();
    let io;
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(([e]) => e.isIntersecting && (show(), io.disconnect()), { rootMargin: '0px 0px -4% 0px' }); io.observe(el); } else show();
    addEventListener('scroll', chk, { passive: true }); addEventListener('resize', chk);
    const t = setTimeout(chk, 400), t2 = setInterval(chk, 1500);
    return () => { io?.disconnect(); removeEventListener('scroll', chk); removeEventListener('resize', chk); clearTimeout(t); clearInterval(t2); };
  }, []);
  return <div ref={r} className={`rv ${className}`} style={{ '--d': `${d}ms` }} {...p}>{children}</div>;
}
