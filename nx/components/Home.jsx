'use client';
import { useEffect, useState } from 'react';
import { TJ as D } from '@/lib/data';
import { fx } from '@/lib/fx';
import { useStatus } from '@/lib/useStatus';
import Shell from './Shell';
import Ransom from './Ransom';
import Rv from './Rv';
import Ico from './Ico';
import Lanyard from './Lanyard';

const both = `${D.ip}:${D.port}`;
const SECTIONS = ['home', 'about', 'join', 'features', 'gallery', 'rules', 'faq'];

function Ticker({ words, cls }) {
  const once = words.map((w, i) => <span key={i}>{w}<span>★</span></span>);
  return <div className={`ticker ${cls}`} aria-hidden="true"><div className="band a"><div className="track">{[0, 1, 2, 3, 4, 5, 6, 7].map(n => <span key={n} style={{ padding: 0 }}>{once}</span>)}</div></div></div>;
}

function Typer() {
  const [txt, setTxt] = useState('');
  useEffect(() => {
    let w = 0, i = 0, del = false, t;
    const step = () => {
      const word = D.roles[w]; setTxt(word.slice(0, i)); let ms = del ? 35 : 75;
      if (!del && i === word.length) { del = true; ms = 1400; } else if (del && i === 0) { del = false; w = (w + 1) % D.roles.length; ms = 350; } else i += del ? -1 : 1;
      t = setTimeout(step, ms);
    };
    step(); return () => clearTimeout(t);
  }, []);
  return <span id="typer">{txt}</span>;
}

function Copy({ kind, className, children }) {
  const [ok, setOk] = useState(false);
  const v = { ip: D.ip, port: D.port, both }[kind];
  const done = () => { setOk(true); setTimeout(() => setOk(false), 1800); };
  const go = () => {
    fx.sfx.sel();
    if (navigator.clipboard && isSecureContext) navigator.clipboard.writeText(v).then(done, done);
    else { const t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} t.remove(); done(); }
  };
  return <button className={className} onClick={go}>{children(ok ? '✓ COPIED' : 'COPY')}</button>;
}

export default function Home() {
  const st = useStatus();
  const [started, setStarted] = useState(false), [leaving, setLeaving] = useState(false), [modal, setModal] = useState(null), [tab, setTab] = useState('Bedrock'), [lb, setLb] = useState(null);

  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('tj') || location.hash; } catch (e) {}
    if (seen) { setStarted(true); const t = location.hash && document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 80); }
  }, []);
  useEffect(() => { document.body.className = started ? 'booted' : 'is-intro'; }, [started]);
  useEffect(() => { document.body.style.overflow = modal ? 'hidden' : ''; }, [modal]);

  const start = () => {
    if (started || leaving) return; setLeaving(true);
    fx.sfx.start(); fx.shake(); fx.flash();
    try { sessionStorage.setItem('tj', '1'); document.documentElement.classList.add('seen'); } catch (e) {}
    fx.transition(() => { setStarted(true); scrollTo(0, 0); });
  };
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') { setModal(null); setLb(null); } if (e.key === 'Enter' && !started) start(); };
    const open = e => setModal(e.detail);
    document.addEventListener('keydown', key); addEventListener('tj:open', open);
    return () => { document.removeEventListener('keydown', key); removeEventListener('tj:open', open); };
  });
  useEffect(() => {
    if (!started) return;
    const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(id => { const n = document.getElementById(id); n && spy.observe(n); });
    return () => spy.disconnect();
  }, [started]);

  const open = m => { fx.sfx.sel(); fx.shake(); setModal(m); };
  const statTxt = st.on === null ? 'Server' : st.on ? 'Server Online' : 'Server Offline';
  const ticker = [st.on ? `SERVER ONLINE${st.pl != null ? ` ${st.pl}/${st.mx}` : ''}` : st.on === false ? 'SERVER OFFLINE' : 'JOIN THE ADVENTURE', ...D.ticker.big];
  const stats = [[st.on === null ? '…' : st.on ? 'ON' : 'OFF', 'STATUS'], [st.pl ?? '–', 'PEMAIN ONLINE'], [st.mx ?? '–', 'KAPASITAS'], ['J + B', 'JAVA & BEDROCK'], ['2026', 'SEJAK']];
  const links = [[D.icons.discord, 'D', 'DISCORD', 'Gabung komunitas & event', D.discord], [D.icons.vote, 'V', 'VOTE', 'Dukung server TelorIjo', D.vote], [D.icons.rank, 'R', 'RANK & STORE', 'Info rank & cara beli', D.store]];

  return (
    <>
      {!started && (
        <div id="intro" className={`intro ${leaving ? 'leave' : ''}`}>
          <div className="intro-burst" />
          <div className="intro-in">
            <Ico src="logo.jpg" className="intro-logo" />
            <p className="itag sk">SERVER MINECRAFT INDONESIA</p>
            <Ransom as="h1" size="xl" text="TELORIJO" />
            <button id="start" className="btn btn-w big press" onClick={start} autoFocus>PRESS START</button>
            <p className="hint">Klik atau tekan <kbd>ENTER</kbd> • nyalakan suara biar lebih seru</p>
          </div>
          <Ticker words={D.ticker.intro} cls="small" />
        </div>
      )}

      <Shell home>
        <main>
          <section id="home" className="sec hero">
            <div className="hero-copy">
              <span className="status sk h" style={{ '--d': 0 }}><i className={st.on === false ? 'off' : ''} /><span>{statTxt}</span><b>{st.on && st.pl != null ? ` ${st.pl}/${st.mx}` : ''}</b></span>
              <Ransom size="lg" text="TELORIJO" className="h" style={{ '--d': 1 }} />
              <p className="typer-line h sk" style={{ '--d': 2 }}>Main <Typer /><span className="caret" /></p>
              <p className="desc h" style={{ '--d': 3 }}>Server Minecraft modern untuk pemain yang suka kreatif, tantangan, dan komunitas. Bangun, jelajahi, dan taklukkan dunia unik bareng teman.</p>
              <div className="row h" style={{ '--d': 4 }}>
                <button className="btn btn-r big press" onClick={() => open('playModal')}>▶ MAIN SEKARANG</button>
                <a className="btn btn-w big press" href={D.discord} target="_blank" rel="noopener noreferrer"><Ico src={D.icons.discord} />DISCORD</a>
                <button className="btn btn-k big press" onClick={() => open('rulesModal')}>RULES</button>
              </div>
              <Copy kind="both" className="ipchip h press">{l => <><b>IP</b><code>{both}</code><span className="cl">{l}</span></>}</Copy>
              <div className="row h" style={{ '--d': 6 }}>{['JAVA', 'BEDROCK', 'CRACKED', 'PREMIUM'].map(x => <span key={x} className="px">{x}</span>)}</div>
            </div>
            {started && <Lanyard />}
          </section>

          <Ticker words={ticker} cls="big" />
          <section className="sec" id="stats"><div className="stats">{stats.map(([v, l]) => <Rv key={l}><div className="stat"><b>{v}</b><small>{l}</small></div></Rv>)}</div></section>

          <section id="about" className="sec split">
            <Rv><div className="polaroid tilt">
              <figure className="frame sq"><img src="/assets/about.jpg" alt="Tentang TelorIjo" loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/hero.jpg'; }} /></figure>
              <span className="pn">SINCE 2026</span><p className="pl">telorijo.web.id</p>
            </div></Rv>
            <Rv d={120} className="info">
              <span className="sub sk">TENTANG SERVER</span>
              <h3>Selamat datang di <mark className="mb">TelorIjo</mark>, server Survival Multiplayer (SMP) dengan komunitas <mark className="mr">seru, suportif &amp; sehat</mark>.</h3>
              <p>Mau jadi petualang santai, builder kompetitif, atau sekadar cari teman baru, TelorIjo punya tempat yang ramah untuk main Minecraft.</p>
              <div className="chips"><span className="chip sk">FRIENDLY COMMUNITY</span><span className="chip r sk">FAIR PLAY</span><span className="chip sk">CUSTOM FEATURES</span></div>
            </Rv>
          </section>

          <section id="join" className="sec">
            <Rv className="sh"><Ransom text="CARA JOIN" /><span className="sub sk">3 LANGKAH • CRACKED &amp; PREMIUM</span></Rv>
            <div className="split">
              <Rv className="ipbox">
                <div className="ipr"><small>SERVER IP</small><code>{D.ip}</code><Copy kind="ip" className="btn btn-w sm press">{l => <span className="cl">{l}</span>}</Copy></div>
                <div className="ipr"><small>PORT</small><code>{D.port}</code><Copy kind="port" className="btn btn-w sm press">{l => <span className="cl">{l}</span>}</Copy></div>
                <Copy kind="both" className="btn btn-r big press">{l => <span className="cl">{l === 'COPY' ? 'COPY IP:PORT' : l}</span>}</Copy>
                <a className="btn btn-k big press" href={`minecraft://?addExternalServer=TelorIjo|${both}`}>DIRECT JOIN (BEDROCK)</a>
              </Rv>
              <Rv d={120} className="tabs">
                <div className="tb">{Object.keys(D.steps).map(k => <button key={k} className={tab === k ? 'on' : ''} onClick={() => { fx.sfx.sel(); setTab(k); }}>{k.toUpperCase()}</button>)}</div>
                {Object.entries(D.steps).map(([k, s]) => <ol key={k} className={tab === k ? 'on' : ''}>{s.map((x, i) => <li key={i}>{x}</li>)}</ol>)}
              </Rv>
            </div>
          </section>

          <section id="features" className="sec">
            <Rv className="sh"><Ransom text="FITUR" /><span className="sub sk">YANG BIKIN BETAH MAIN</span></Rv>
            <div className="grid">{D.features.map((f, i) => <Rv key={f.title} d={(i % 3) * 100}><div className="card tilt"><div className="card-in"><div className="ico"><Ico src={f.icon} f={f.title[0]} className="" /></div><h3>{f.title}</h3><p>{f.desc}</p></div></div></Rv>)}</div>
          </section>

          <section id="gallery" className="sec">
            <Rv className="sh"><Ransom text="GALERI" /><span className="sub sk">POTRET DUNIA TELORIJO</span></Rv>
            <div className="gal">{D.gallery.map((g, i) => <Rv key={g} d={(i % 3) * 100}><figure className="frame tilt" style={{ '--r': [-1.5, 1, -.5][i % 3] + 'deg' }} data-slot={`assets/${g}`} onClick={e => !e.currentTarget.classList.contains('no-img') && (fx.sfx.sel(), setLb(`/assets/${g}`))}><img src={`/assets/${g}`} alt={`Screenshot ${i + 1}`} loading="lazy" onError={e => e.currentTarget.parentNode.classList.add('no-img')} /></figure></Rv>)}</div>
          </section>

          <section id="rules" className="sec">
            <Rv className="sh"><Ransom text="RULES" /><span className="sub sk">ATURAN MAIN • BACA DULU</span></Rv>
            <div className="grid">{D.rules.map(([r, p], i) => <Rv key={i} d={(i % 3) * 100}><div className="card tilt"><div className="card-in"><span className="rn">#{String(i + 1).padStart(2, '0')}</span><p style={{ fontSize: '.9rem', color: '#fff', fontWeight: 600 }}>{r}</p><span className="pen">{p}</span></div></div></Rv>)}</div>
          </section>

          <section id="faq" className="sec narrow">
            <Rv className="sh"><Ransom text="FAQ" /><span className="sub sk">PERTANYAAN UMUM</span></Rv>
            <div>{D.faqs.map(([q, a], i) => <details key={i} name="faq" className="fq"><summary onClick={() => fx.sfx.hover()}><span className="n">{String(i + 1).padStart(2, '0')}</span><span className="t">{q}</span><span className="p">+</span></summary><p>{a}</p></details>)}</div>
            <Rv className="sh mt-14"><Ransom text="GABUNG" /><span className="sub sk">KOMUNITAS &amp; LINK PENTING</span></Rv>
            <div className="chs">{links.map(([img, i, k, t, u], n) => <Rv key={k} d={n * 80}><a className="ch press" href={u} {...(/^http/.test(u) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span className="i"><Ico src={img} f={i} className="" /></span><span className="t"><b>{k}</b><small>{t}</small></span><span className="go">BUKA ►</span></a></Rv>)}</div>
          </section>
        </main>
      </Shell>

      {modal === 'playModal' && (
        <div className="mod" onClick={e => e.target === e.currentTarget && setModal(null)}><div className="panel">
          <button className="x btn btn-k sm" aria-label="Tutup" onClick={() => setModal(null)}>✕</button>
          <h3>Join TelorIjo</h3><p>Salin alamat ini lalu tambahkan di menu Servers Minecraft.</p>
          <div className="ipr"><small>IP</small><code>{D.ip}</code><Copy kind="ip" className="btn btn-k sm press">{l => <span className="cl">{l}</span>}</Copy></div>
          <div className="ipr"><small>PORT</small><code>{D.port}</code><Copy kind="port" className="btn btn-k sm press">{l => <span className="cl">{l}</span>}</Copy></div>
          <Copy kind="both" className="btn btn-r big press">{l => <span className="cl">{l === 'COPY' ? 'COPY IP:PORT' : l}</span>}</Copy>
        </div></div>
      )}
      {modal === 'rulesModal' && (
        <div className="mod" onClick={e => e.target === e.currentTarget && setModal(null)}><div className="panel lgp">
          <button className="x btn btn-k sm" aria-label="Tutup" onClick={() => setModal(null)}>✕</button>
          <h3>Server Rules</h3><p>Patuhi aturan ini supaya semua nyaman main.</p>
          <div>{D.rules.map(([r, p], i) => <div className="ru" key={i} style={{ '--d': `${150 + i * 55}ms` }}><b>#{i + 1}</b><div><p>{r}</p><small>Penalty: {p}</small></div></div>)}</div>
        </div></div>
      )}
      {lb && <div className="lb" onClick={() => setLb(null)}><img src={lb} alt="" /></div>}
    </>
  );
}
