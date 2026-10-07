import Shell from '@/components/Shell';
import PageHead from '@/components/PageHead';
import Ico from '@/components/Ico';
import { TJ as D } from '@/lib/data';
export const metadata = { title: 'Vote' };
export default function Page() {
  const v = D.voteSites || [];
  return (
    <Shell><main className="sec narrow"><PageHead t="VOTE" s="DUKUNG SERVER • AMBIL HADIAH" icon="vote" />
      <div className="pgs">
        <div className="info"><h3>Cara vote</h3><ol className="steps"><li>Pilih salah satu situs vote di bawah.</li><li>Masukkan username Minecraft kamu (Java atau Bedrock).</li><li>Selesaikan vote, lalu cek info hadiah di Discord.</li></ol></div>
        {v.length ? <div className="chs">{v.map(([n, u]) => <a key={u} className="ch press" href={u} target="_blank" rel="noopener noreferrer"><span className="i"><Ico src={D.icons.vote} f="V" className="" /></span><span className="t"><b>{n}</b><small>{u}</small></span><span className="go">VOTE ►</span></a>)}</div>
          : <div className="empty"><b>Link vote belum dipasang</b><p>Staff belum menambahkan situs vote. Pantau pengumuman di Discord atau tanya langsung ke staff.</p><a className="btn btn-r big press" href={D.discord} target="_blank" rel="noopener noreferrer"><Ico src={D.icons.discord} />TANYA DI DISCORD</a></div>}
      </div></main></Shell>
  );
}
