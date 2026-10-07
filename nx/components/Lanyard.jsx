'use client';
import { useEffect } from 'react';
import { TJ as D } from '@/lib/data';
import { initLanyard } from '@/lib/lanyard';

export default function Lanyard() {
  useEffect(() => initLanyard(), []);
  return (
    <div className="lwrap h" style={{ '--d': 3 }}>
      <div className="lany" id="lany">
        <canvas id="rope" />
        <div className="idcard" id="idcard" tabIndex={0} role="button" aria-label="Kartu nama TelorIjo. Tarik untuk menggoyang, tekan Enter untuk membalik">
          <i className="clip" />
          <div className="spin" id="spin">
            <div className="face front"><i className="slot" />
              <figure className="photo"><img src="/assets/hero.jpg" alt="Maskot TelorIjo" draggable="false" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/logo.jpg'; }} /></figure>
              <div className="meta"><b>TELORIJO</b><small>SERVER MINECRAFT • JAVA &amp; BEDROCK</small></div><div className="bar" />
            </div>
            <div className="face back"><i className="slot" />
              <b className="bt">SERVER INFO</b>
              <div className="kv"><small>IP</small><code>{D.ip}</code></div>
              <div className="kv"><small>PORT</small><code>{D.port}</code></div>
              <div className="kv"><small>EDISI</small><span>Java &amp; Bedrock</span></div>
              <div className="bar" /><p className="bn">Klik kartu untuk membalik</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lctl"><button className="btn btn-r sm press" id="flipBtn">BALIK KARTU</button><button className="btn btn-w sm press" id="shakeBtn">GOYANG</button></div>
      <span className="lhint">TARIK TALI / KARTU</span>
    </div>
  );
}
