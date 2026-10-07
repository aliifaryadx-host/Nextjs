import Shell from '@/components/Shell';
import PageHead from '@/components/PageHead';
import { LEGAL } from '@/lib/data';
export const metadata = { title: 'Terms' };
export default function Page() {
  const [t, s, secs] = LEGAL.terms;
  return <Shell><main className="sec narrow"><PageHead t={t} s={s} /><div className="info legal">{secs.map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}</div></main></Shell>;
}
