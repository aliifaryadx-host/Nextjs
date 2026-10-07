import Shell from '@/components/Shell';
import PageHead from '@/components/PageHead';
import Ico from '@/components/Ico';
import { TJ as D } from '@/lib/data';
export const metadata = { title: 'Store' };
const ROWS = [['Harga', 'p'], ['Claim Land', 'claim'], ['Daily Claim Blocks', 'daily'], ['Set Home', 'home'], ['Player Warp', 'pw'], ['Player Vault', 'pv']];
export default function Page() {
  const R = D.ranks;
  return (
    <Shell><main className="sec narrow"><PageHead t="STORE" s="RANK & PRIVILEGE" icon="rank" />
      <div className="pgs">
        <div className="info"><h3>Cara beli &amp; upgrade rank</h3>
          <ol className="steps"><li>Pemain baru otomatis mendapat rank <b>Member</b> secara <b>gratis</b>.</li><li>Pembelian atau upgrade rank <b>hanya lewat Saweria saat Admin sedang live streaming</b>.</li><li>Pantau jadwal live di channel <b>{D.liveChannel}</b> atau pengumuman Discord.</li><li>Donasi di luar jam live tidak diproses untuk menghindari kekeliruan data.</li></ol>
          <div className="row"><a className="btn btn-r big press" href={D.discord} target="_blank" rel="noopener noreferrer"><Ico src={D.icons.discord} />CEK INFO LIVE</a>{D.saweria && <a className="btn btn-k big press" href={D.saweria} target="_blank" rel="noopener noreferrer">SAWERIA</a>}</div>
          <p><small>Pembelian tidak bisa dilakukan lewat website ini.</small></p></div>
        <div className="grid">{R.map((r, i) => (
          <div key={r.n} className={`card rank ${i === R.length - 1 ? 'top' : ''}`}><div className="card-in">
            <div className="rh"><b>{r.n}</b><span className="price">{r.p}</span></div>
            <ul className="rs"><li><small>CLAIM LAND</small><b>{r.claim}</b></li><li><small>SET HOME</small><b>{r.home}</b></li><li><small>PLAYER WARP</small><b>{r.pw}</b></li><li><small>PLAYER VAULT</small><b>{r.pv}</b></li>{r.daily && <li style={{ gridColumn: '1/-1' }}><small>DAILY REWARD</small><b>{r.daily} claim blocks</b></li>}</ul>
            <div className="chips">{r.perks.map(x => <span key={x} className="chip">{x}</span>)}</div>
          </div></div>))}</div>
        <div className="cmpw"><table className="cmp"><thead><tr><th />{R.map(r => <th key={r.n}>{r.n}</th>)}</tr></thead><tbody>{ROWS.map(([l, k]) => <tr key={k}><th>{l}</th>{R.map(r => <td key={r.n}>{r[k] ?? '-'}</td>)}</tr>)}</tbody></table></div>
        <div className="info"><h3>Akses channel VIP</h3><p>Rank VIP hingga Ascendant otomatis mendapat akses text channel khusus VIP di Discord dan channel chat privat di dalam game untuk dagang, diskusi, atau sekadar kumpul bareng para donatur.</p></div>
      </div></main></Shell>
  );
}
