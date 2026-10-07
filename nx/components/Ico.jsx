'use client';
import { useState } from 'react';

/* Gambar dari /public/assets. Kalau file belum ada, tampilkan teks cadangan (tidak pernah blank). */
export default function Ico({ src, f = '', className = 'bi' }) {
  const [bad, setBad] = useState(false);
  return bad ? f : <img className={className} src={`/assets/${src}`} alt="" onError={() => setBad(true)} />;
}
