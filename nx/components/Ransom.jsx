/* Judul gaya "ransom note": tiap huruf kotak sendiri */
export default function Ransom({ text, size = 'md', className = '', as: Tag = 'h2', style }) {
  return (
    <Tag className={`ransom ${size} ${className}`} aria-label={text} style={style}>
      {[...text].map((c, i) => <span key={i} style={{ '--i': i }} aria-hidden="true">{c === ' ' ? '\u00A0' : c}</span>)}
    </Tag>
  );
}
