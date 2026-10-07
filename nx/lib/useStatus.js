'use client';
import { useEffect, useState } from 'react';
import { TJ as D } from './data';

const getJSON = async u => {
  const c = new AbortController(), t = setTimeout(() => c.abort(), 8000);
  try { const r = await fetch(u, { signal: c.signal, cache: 'no-store' }); return r.ok ? await r.json() : null; }
  catch (e) { return null; } finally { clearTimeout(t); }
};

/* Status real-time: Bedrock + Java via api.mcsrvstat.us, refresh tiap 30 detik */
export function useStatus() {
  const [s, set] = useState({ on: null, pl: null, mx: null });
  useEffect(() => {
    let dead = false;
    const run = async () => {
      const jh = (D.javaHost || D.ip) + (D.javaPort ? ':' + D.javaPort : '');
      const res = (await Promise.all([getJSON(`https://api.mcsrvstat.us/bedrock/3/${D.ip}:${D.port}`), getJSON(`https://api.mcsrvstat.us/3/${jh}`)])).filter(Boolean);
      const live = res.filter(d => d.online).sort((a, b) => (b.players?.online ?? 0) - (a.players?.online ?? 0));
      if (!dead) set({ on: res.length ? live.length > 0 : null, pl: live[0]?.players?.online ?? null, mx: live[0]?.players?.max ?? null });
    };
    const tick = () => { if (!document.hidden) run(); };
    run(); const id = setInterval(tick, 30000); document.addEventListener('visibilitychange', tick);
    return () => { dead = true; clearInterval(id); document.removeEventListener('visibilitychange', tick); };
  }, []);
  return s;
}
