import Ransom from './Ransom';
import Ico from './Ico';
import { TJ as D } from '@/lib/data';

export default function PageHead({ t, s, icon }) {
  return (
    <div className="sh">
      {icon && <Ico src={D.icons[icon]} className="pgico" />}
      <Ransom text={t} /><span className="sub sk">{s}</span>
    </div>
  );
}
