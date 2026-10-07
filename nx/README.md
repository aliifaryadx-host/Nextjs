# TelorIjo — Versi 2 (Next.js 14 + Tailwind CSS)

Tampilan & fitur sama dengan versi 1, dibangun ulang dengan App Router. Tailwind dipakai untuk utility;
tema game (merah/hijau, miring, bayangan keras) tetap di `app/globals.css`.

## Struktur
```
app/
  layout.jsx  globals.css  page.jsx          <- beranda
  vote/page.jsx  store/page.jsx  privacy/page.jsx  terms/page.jsx
components/  Home  Shell  Lanyard  Rv  Ransom  Ico  PageHead
lib/         data.js (EDIT ISI WEB DI SINI)  useStatus.js (status server live)  fx.js  lanyard.js
public/
  assets/    <- semua gambar (discord.png, vote.png, rank.png, logo.jpg, hero.jpg, about.jpg, shot-1..6.png, fishing.png, farming.png, enchant.gif, spawners.png, claim.png, warp.png)
  favicon.ico  og-image.png                   <- taruh file milikmu di sini
```

## Jalankan
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy
Push ke GitHub → Vercel → Add New Project → import repo. Framework terdeteksi otomatis (Next.js), tanpa setting tambahan.

## Catatan
- Status server real-time: Bedrock `ip:port` + Java via `api.mcsrvstat.us`, refresh 30 detik (`lib/useStatus.js`). Port Java beda? Isi `javaPort` di `lib/data.js`.
- Halaman & menu Staff/Streamer sudah dihapus.
- Gambar yang belum ada tidak membuat layout kosong: ikon diganti huruf, foto diganti `logo.jpg`/`hero.jpg`.
