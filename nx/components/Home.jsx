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
  const once = words.map((w, i) => (
    <span key={i} className="inline-flex items-center gap-2">
      <span>{w}</span>
      <span className="text-yellow-400">★</span>
    </span>
  ));
  return (
    <div className={`ticker overflow-hidden whitespace-nowrap select-none ${cls}`} aria-hidden="true">
      <div className="band a inline-block">
        <div className="track flex items-center gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
            <span key={n} style={{ padding: 0 }} className="flex items-center gap-4">
              {once}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Typer() {
  const [txt, setTxt] = useState('');
  useEffect(() => {
    let w = 0, i = 0, del = false, t;
    const step = () => {
      const word = D.roles[w];
      setTxt(word.slice(0, i));
      let ms = del ? 35 : 75;
      if (!del && i === word.length) {
        del = true;
        ms = 1400;
      } else if (del && i === 0) {
        del = false;
        w = (w + 1) % D.roles.length;
        ms = 350;
      } else {
        i += del ? -1 : 1;
      }
      t = setTimeout(step, ms);
    };
    step();
    return () => clearTimeout(t);
  }, []);
  return <span id="typer" className="inline-block min-w-[2ch] break-words">{txt}</span>;
}

function Copy({ kind, className, children }) {
  const [ok, setOk] = useState(false);
  const v = { ip: D.ip, port: D.port, both }[kind];
  const done = () => { setOk(true); setTimeout(() => setOk(false), 1800); };
  const go = () => {
    fx.sfx.sel();
    if (navigator.clipboard && isSecureContext) {
      navigator.clipboard.writeText(v).then(done, done);
    } else {
      const t = document.createElement('textarea');
      t.value = v;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); } catch (e) {}
      t.remove();
      done();
    }
  };
  return (
    <button className={`${className} touch-manipulation max-w-full overflow-hidden`} onClick={go}>
      {children(ok ? '✓ COPIED' : 'COPY')}
    </button>
  );
}

export default function Home() {
  const st = useStatus();
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState('Bedrock');
  const [lb, setLb] = useState(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('tj') || location.hash; } catch (e) {}
    if (seen) {
      setStarted(true);
      const t = location.hash && document.getElementById(location.hash.slice(1));
      if (t) setTimeout(() => t.scrollIntoView(), 80);
    }
  }, []);

  useEffect(() => { document.body.className = started ? 'booted' : 'is-intro'; }, [started]);
  useEffect(() => { document.body.style.overflow = modal ? 'hidden' : ''; }, [modal]);

  const start = () => {
    if (started || leaving) return;
    setLeaving(true);
    fx.sfx.start();
    fx.shake();
    fx.flash();
    try { sessionStorage.setItem('tj', '1'); document.documentElement.classList.add('seen'); } catch (e) {}
    fx.transition(() => { setStarted(true); scrollTo(0, 0); });
  };

  useEffect(() => {
    const key = e => {
      if (e.key === 'Escape') { setModal(null); setLb(null); }
      if (e.key === 'Enter' && !started) start();
    };
    const open = e => setModal(e.detail);
    document.addEventListener('keydown', key);
    addEventListener('tj:open', open);
    return () => { document.removeEventListener('keydown', key); removeEventListener('tj:open', open); };
  });

  useEffect(() => {
    if (!started) return;
    const spy = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === e.target.id))),
      { rootMargin: '-45% 0px -50% 0px' }
    );
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
        <div id="intro" className={`intro ${leaving ? 'leave' : ''} px-4 text-center`}>
          <div className="intro-burst" />
          <div className="intro-in max-w-lg mx-auto flex flex-col items-center justify-center">
            <Ico src="logo.jpg" className="intro-logo w-24 h-24 sm:w-32 sm:h-32 object-contain mb-4" />
            <p className="itag sk text-xs sm:text-sm font-semibold tracking-wider mb-2">SERVER MINECRAFT INDONESIA</p>
            <Ransom as="h1" size="xl" text="TELORIJO" className="max-w-full break-words" />
            <button id="start" className="btn btn-w big press mt-6 w-full sm:w-auto text-base sm:text-lg px-8 py-3" onClick={start} autoFocus>
              PRESS START
            </button>
            <p className="hint text-xs sm:text-sm mt-4 opacity-80">Klik atau tekan <kbd className="px-1.5 py-0.5 border rounded">ENTER</kbd> • nyalakan suara biar lebih seru</p>
          </div>
          <Ticker words={D.ticker.intro} cls="small mt-8" />
        </div>
      )}

      <Shell home>
        <main className="w-full overflow-x-hidden">
          {/* HERO SECTION */}
          <section id="home" className="sec hero min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="hero-copy max-w-4xl mx-auto w-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="status sk h inline-flex items-center gap-2 mb-3 text-xs sm:text-sm" style={{ '--d': 0 }}>
                <i className={st.on === false ? 'off' : ''} />
                <span>{statTxt}</span>
                <b>{st.on && st.pl != null ? ` ${st.pl}/${st.mx}` : ''}</b>
              </span>
              
              <div className="w-full overflow-hidden mb-4">
                <Ransom size="lg" text="TELORIJO" className="h max-w-full break-words leading-tight" style={{ '--d': 1 }} />
              </div>

              <p className="typer-line h sk text-lg sm:text-2xl font-bold mb-4 flex flex-wrap items-center justify-center sm:justify-start gap-1" style={{ '--d': 2 }}>
                <span>Main </span>
                <Typer />
                <span className="caret inline-block w-2 h-6 bg-current animate-pulse ml-1" />
              </p>

              <p className="desc h text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6 opacity-90" style={{ '--d': 3 }}>
                Server Minecraft modern untuk pemain yang suka kreatif, tantangan, dan komunitas. Bangun, jelajahi, dan taklukkan dunia unik bareng teman.
              </p>

              {/* ACTION BUTTONS */}
              <div className="row h flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center sm:justify-start gap-3 w-full mb-6" style={{ '--d': 4 }}>
                <button className="btn btn-r big press w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-bold" onClick={() => open('playModal')}>
                  ▶ MAIN SEKARANG
                </button>
                <a className="btn btn-w big press w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-bold flex items-center justify-center gap-2" href={D.discord} target="_blank" rel="noopener noreferrer">
                  <Ico src={D.icons.discord} className="w-5 h-5" />DISCORD
                </a>
                <button className="btn btn-k big press w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-bold" onClick={() => open('rulesModal')}>
                  RULES
                </button>
              </div>

              {/* IP CHIP */}
              <Copy kind="both" className="ipchip h press w-full max-w-md p-3 rounded-lg flex items-center justify-between gap-2 text-xs sm:text-sm mb-6" style={{ '--d': 5 }}>
                {l => (
                  <>
                    <b className="shrink-0 font-extrabold">IP</b>
                    <code className="truncate font-mono">{both}</code>
                    <span className="cl shrink-0 font-bold px-2 py-1 rounded">{l}</span>
                  </>
                )}
              </Copy>

              <div className="row h flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full text-xs" style={{ '--d': 6 }}>
                {['JAVA', 'BEDROCK', 'CRACKED', 'PREMIUM'].map(x => (
                  <span key={x} className="px px-3 py-1 rounded bg-black/30 font-semibold tracking-wider">{x}</span>
                ))}
              </div>
            </div>
            {started && <Lanyard />}
          </section>

          <Ticker words={ticker} cls="big my-6" />

          {/* STATS SECTION */}
          <section className="sec px-4 py-8" id="stats">
            <div className="stats grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {stats.map(([v, l]) => (
                <Rv key={l}>
                  <div className="stat p-4 text-center rounded-lg border border-white/10 bg-black/20">
                    <b className="text-xl sm:text-3xl block font-black mb-1">{v}</b>
                    <small className="text-xs uppercase tracking-wider opacity-75">{l}</small>
                  </div>
                </Rv>
              ))}
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="sec split px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Rv>
              <div className="polaroid tilt max-w-sm mx-auto w-full p-4 bg-white text-black shadow-xl rounded-sm">
                <figure className="frame sq aspect-square overflow-hidden mb-3 bg-gray-200">
                  <img 
                    src="/assets/about.jpg" 
                    alt="Tentang TelorIjo" 
                    loading="lazy" 
                    className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/hero.jpg'; }} 
                  />
                </figure>
                <div className="flex justify-between items-center text-xs font-bold tracking-wider">
                  <span className="pn">SINCE 2026</span>
                  <p className="pl opacity-70">telorijo.web.id</p>
                </div>
              </div>
            </Rv>

            <Rv d={120} className="info text-center md:text-left">
              <span className="sub sk text-xs font-bold tracking-widest uppercase block mb-2">TENTANG SERVER</span>
              <h3 className="text-lg sm:text-2xl font-bold leading-snug mb-4">
                Selamat datang di <mark className="mb px-1 rounded">TelorIjo</mark>, server Survival Multiplayer (SMP) dengan komunitas <mark className="mr px-1 rounded">seru, suportif &amp; sehat</mark>.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed opacity-90 mb-6">
                Mau jadi petualang santai, builder kompetitif, atau sekadar cari teman baru, TelorIjo punya tempat yang ramah untuk main Minecraft.
              </p>
              <div className="chips flex flex-wrap justify-center md:justify-start gap-2 text-xs font-bold">
                <span className="chip sk px-3 py-1.5 rounded-full border">FRIENDLY COMMUNITY</span>
                <span className="chip r sk px-3 py-1.5 rounded-full border">FAIR PLAY</span>
                <span className="chip sk px-3 py-1.5 rounded-full border">CUSTOM FEATURES</span>
              </div>
            </Rv>
          </section>

          {/* JOIN SECTION */}
          <section id="join" className="sec px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
            <Rv className="sh text-center mb-8">
              <Ransom text="CARA JOIN" className="max-w-full break-words" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">3 LANGKAH • CRACKED &amp; PREMIUM</span>
            </Rv>
            <div className="split grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Rv className="ipbox flex flex-col gap-4 p-6 rounded-xl bg-black/40 border border-white/10">
                <div className="ipr flex items-center justify-between gap-2 p-3 rounded bg-black/30">
                  <small className="font-bold text-xs shrink-0">SERVER IP</small>
                  <code className="text-sm font-mono truncate">{D.ip}</code>
                  <Copy kind="ip" className="btn btn-w sm press px-3 py-1 text-xs shrink-0">{l => <span className="cl">{l}</span>}</Copy>
                </div>
                <div className="ipr flex items-center justify-between gap-2 p-3 rounded bg-black/30">
                  <small className="font-bold text-xs shrink-0">PORT</small>
                  <code className="text-sm font-mono truncate">{D.port}</code>
                  <Copy kind="port" className="btn btn-w sm press px-3 py-1 text-xs shrink-0">{l => <span className="cl">{l}</span>}</Copy>
                </div>
                <Copy kind="both" className="btn btn-r big press w-full py-3 text-sm font-bold mt-2">{l => <span className="cl">{l === 'COPY' ? 'COPY IP:PORT' : l}</span>}</Copy>
                <a className="btn btn-k big press w-full py-3 text-sm font-bold text-center block" href={`minecraft://?addExternalServer=TelorIjo|${both}`}>
                  DIRECT JOIN (BEDROCK)
                </a>
              </Rv>

              <Rv d={120} className="tabs bg-black/30 p-6 rounded-xl border border-white/10">
                <div className="tb flex border-b border-white/10 mb-4 overflow-x-auto">
                  {Object.keys(D.steps).map(k => (
                    <button 
                      key={k} 
                      className={`px-4 py-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${tab === k ? 'on border-b-2 border-green-500 text-green-400' : 'opacity-60'}`} 
                      onClick={() => { fx.sfx.sel(); setTab(k); }}
                    >
                      {k.toUpperCase()}
                    </button>
                  ))}
                </div>
                {Object.entries(D.steps).map(([k, s]) => (
                  <ol key={k} className={`space-y-3 list-decimal list-inside text-sm leading-relaxed ${tab === k ? 'block' : 'hidden'}`}>
                    {s.map((x, i) => (
                      <li key={i} className="pl-1">{x}</li>
                    ))}
                  </ol>
                ))}
              </Rv>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section id="features" className="sec px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
            <Rv className="sh text-center mb-10">
              <Ransom text="FITUR" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">YANG BIKIN BETAH MAIN</span>
            </Rv>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {D.features.map((f, i) => (
                <Rv key={f.title} d={(i % 3) * 100}>
                  <div className="card tilt h-full p-6 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                    <div className="card-in">
                      <div className="ico mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
                        <Ico src={f.icon} f={f.title[0]} className="w-8 h-8 object-contain" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </Rv>
              ))}
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section id="gallery" className="sec px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
            <Rv className="sh text-center mb-10">
              <Ransom text="GALERI" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">POTRET DUNIA TELORIJO</span>
            </Rv>
            <div className="gal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {D.gallery.map((g, i) => (
                <Rv key={g} d={(i % 3) * 100}>
                  <figure 
                    className="frame tilt aspect-video overflow-hidden rounded-lg bg-black/40 border border-white/10 cursor-pointer hover:scale-[1.02] transition-transform" 
                    style={{ '--r': [-1.5, 1, -.5][i % 3] + 'deg' }} 
                    data-slot={`assets/${g}`} 
                    onClick={e => !e.currentTarget.classList.contains('no-img') && (fx.sfx.sel(), setLb(`/assets/${g}`))}
                  >
                    <img 
                      src={`/assets/${g}`} 
                      alt={`Screenshot ${i + 1}`} 
                      loading="lazy" 
                      className="w-full h-full object-cover"
                      onError={e => e.currentTarget.parentNode.classList.add('no-img')} 
                    />
                  </figure>
                </Rv>
              ))}
            </div>
          </section>

          {/* RULES SECTION */}
          <section id="rules" className="sec px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
            <Rv className="sh text-center mb-10">
              <Ransom text="RULES" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">ATURAN MAIN • BACA DULU</span>
            </Rv>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {D.rules.map(([r, p], i) => (
                <Rv key={i} d={(i % 3) * 100}>
                  <div className="card tilt h-full p-6 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                    <div className="card-in">
                      <span className="rn text-xs font-mono font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 inline-block mb-3">
                        #{String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm font-semibold text-white leading-relaxed mb-3">{r}</p>
                      <span className="pen text-xs block text-red-400/90 font-medium">Hukuman: {p}</span>
                    </div>
                  </div>
                </Rv>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="sec narrow px-4 sm:px-6 py-12 max-w-3xl mx-auto">
            <Rv className="sh text-center mb-10">
              <Ransom text="FAQ" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">PERTANYAAN UMUM</span>
            </Rv>
            <div className="space-y-4">
              {D.faqs.map(([q, a], i) => (
                <details key={i} name="faq" className="fq group p-4 rounded-xl bg-black/30 border border-white/10 transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base" onClick={() => fx.sfx.hover()}>
                    <span className="n font-mono text-xs opacity-50 mr-3">#{String(i + 1).padStart(2, '0')}</span>
                    <span className="t flex-1 pr-2">{q}</span>
                    <span className="p text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm leading-relaxed opacity-80">{a}</p>
                </details>
              ))}
            </div>

            <Rv className="sh text-center mt-16 mb-8">
              <Ransom text="GABUNG" />
              <span className="sub sk block text-xs font-bold tracking-widest mt-2">KOMUNITAS &amp; LINK PENTING</span>
            </Rv>
            <div className="chs flex flex-col gap-3">
              {links.map(([img, i, k, t, u], n) => (
                <Rv key={k} d={n * 80}>
                  <a 
                    className="ch press p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-white/30 transition-all" 
                    href={u} 
                    {...(/^http/.test(u) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="i shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                      <Ico src={img} f={i} className="w-6 h-6 object-contain" />
                    </span>
                    <span className="t flex-1 min-w-0">
                      <b className="block text-sm sm:text-base font-bold truncate">{k}</b>
                      <small className="text-xs opacity-75 truncate block">{t}</small>
                    </span>
                    <span className="go text-xs font-bold shrink-0 text-green-400">BUKA ►</span>
                  </a>
                </Rv>
              ))}
            </div>
          </section>
        </main>
      </Shell>

      {/* MODAL PLAY */}
      {modal === 'playModal' && (
        <div className="mod fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="panel max-w-md w-full bg-slate-900 border border-white/20 p-6 rounded-2xl relative shadow-2xl">
            <button className="x absolute top-4 right-4 btn btn-k sm px-2.5 py-1 text-xs" aria-label="Tutup" onClick={() => setModal(null)}>✕</button>
            <h3 className="text-xl font-bold mb-2">Join TelorIjo</h3>
            <p className="text-xs opacity-75 mb-6">Salin alamat ini lalu tambahkan di menu Servers Minecraft.</p>
            <div className="space-y-3 mb-6">
              <div className="ipr flex items-center justify-between gap-2 p-3 rounded bg-black/40 border border-white/10">
                <small className="font-bold text-xs shrink-0">IP</small>
                <code className="text-sm font-mono truncate">{D.ip}</code>
                <Copy kind="ip" className="btn btn-k sm press px-3 py-1 text-xs">{l => <span className="cl">{l}</span>}</Copy>
              </div>
              <div className="ipr flex items-center justify-between gap-2 p-3 rounded bg-black/40 border border-white/10">
                <small className="font-bold text-xs shrink-0">PORT</small>
                <code className="text-sm font-mono truncate">{D.port}</code>
                <Copy kind="port" className="btn btn-k sm press px-3 py-1 text-xs">{l => <span className="cl">{l}</span>}</Copy>
              </div>
            </div>
            <Copy kind="both" className="btn btn-r big press w-full py-3 text-sm font-bold">{l => <span className="cl">{l === 'COPY' ? 'COPY IP:PORT' : l}</span>}</Copy>
          </div>
        </div>
      )}

      {/* MODAL RULES */}
      {modal === 'rulesModal' && (
        <div className="mod fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="panel lgp max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-slate-900 border border-white/20 p-6 rounded-2xl relative shadow-2xl">
            <button className="x absolute top-4 right-4 btn btn-k sm px-2.5 py-1 text-xs sticky z-10" aria-label="Tutup" onClick={() => setModal(null)}>✕</button>
            <h3 className="text-xl font-bold mb-1">Server Rules</h3>
            <p className="text-xs opacity-75 mb-6">Patuhi aturan ini supaya semua nyaman main.</p>
            <div className="space-y-4">
              {D.rules.map(([r, p], i) => (
                <div className="ru p-4 rounded-xl bg-black/40 border border-white/10 flex gap-3 items-start" key={i} style={{ '--d': `${150 + i * 55}ms` }}>
                  <b className="text-xs font-mono font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 shrink-0">#{i + 1}</b>
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-white mb-1 leading-snug">{r}</p>
                    <small className="text-red-400/90 block">Penalty: {p}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lb && (
        <div className="lb fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLb(null)}>
          <img src={lb} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </>
  );
}
