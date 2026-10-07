/* DATA: edit isi web di sini saja. Gambar taruh di public/assets/ */
export const TJ = {
  ip: "play.telorijo.web.id", port: "5073", discord: "https://discord.gg/tpAW393N7",

  // Halaman fitur (file di folder utama)
  vote: "/vote", store: "/store",
  voteSites: [],            // contoh: [["Nama Situs", "https://link-vote"]]
  saweria: "",              // opsional: link Saweria admin, tombolnya muncul di halaman Store
  liveChannel: "#info-live",
  javaHost: "", javaPort: "", // opsional: kosong = pakai ip di atas (Java tanpa port, SRV otomatis)
  icons: { discord: "discord.png", vote: "vote.png", rank: "rank.png" },

  roles: ["SURVIVAL SMP", "FISHING & FARMING", "CUSTOM ENCHANTS", "CLAIM LAND"],

  ticker: {
    intro: ["PRESS START", "TELORIJO", "JAVA & BEDROCK", "SURVIVAL SMP"],
    big: ["Survival SMP", "Fishing", "Farming", "Custom Enchants", "Spawners", "Claim Land", "Rank & Privilege"]
  },

  features: [
    { title: "Fishing", icon: "fishing.png", desc: "Lempar kailmu dan dapatkan lebih dari sekadar ikan: buka hadiah, naik tier kustom, dan kuasai seni memancing." },
    { title: "Farming", icon: "farming.png", desc: "Bertani dengan mekanik unik, buka tanaman langka, dan tingkatkan skill sampai panenmu melimpah." },
    { title: "Custom Enchants", icon: "enchant.gif", desc: "Bawa gear-mu melampaui vanilla dengan enchant kustom untuk bertarung dan menjelajah." },
    { title: "Spawners", icon: "spawners.png", desc: "Bangun mob farm kustom, kumpulkan resource dengan efisien, dan rintis jalanmu menuju kaya." },
    { title: "Claim Land", icon: "claim.png", desc: "Amankan area bangunanmu. Kapasitas claim bertambah lewat rank dan klaim token harian." },
    { title: "Home, Warp & Vault", icon: "warp.png", desc: "Simpan lokasi dengan /sethome, buat Player Warp sendiri, dan simpan barang di Player Vault." }
  ],

  steps: {
    Bedrock: ["Buka Minecraft Bedrock, pilih Play lalu tab Servers.", "Tekan Add Server dan isi nama bebas.", "Isi alamat dan port di atas, simpan, lalu tekan Join."],
    Java: ["Buka Minecraft Java Edition, pilih Multiplayer.", "Klik Add Server dan isi nama bebas.", "Isi Server Address dengan ip:port, klik Done, lalu Join."]
  },

  gallery: ["shot-1.png", "shot-2.png", "shot-3.png", "shot-4.png", "shot-5.png", "shot-6.png"],

  faqs: [
    ["Bagaimana cara join TelorIjo?", "Buka Minecraft Bedrock atau Java, masuk ke Multiplayer/Servers, lalu tambahkan server dengan IP dan port yang ada di halaman ini."],
    ["Apakah perlu mod?", "Tidak perlu. Cukup Minecraft vanilla."],
    ["TelorIjo cracked atau premium?", "Keduanya didukung, jadi semua orang bebas bergabung."],
    ["Apakah ada server Discord?", "Ada! Gabung untuk kenalan dengan pemain lain, dapat info update, dan ikut event."],
    ["Mode apa saja yang tersedia?", "Survival SMP, Custom Dungeons, dan event musiman. Fitur lain akan segera hadir."],
    ["Bagaimana cara mendapatkan rank?", "Pemain baru otomatis mendapat rank Member gratis. Rank di atasnya hanya bisa dibeli lewat Saweria saat Admin sedang live streaming. Detailnya ada di halaman Store."],
    ["Bisakah beli rank lewat website ini?", "Tidak. Website hanya menampilkan info. Pembelian dan upgrade hanya dilayani lewat Saweria saat Admin live, dan donasi di luar jam live tidak diproses."]
  ],

  rules: [
    ["Dilarang griefing atau mencuri dari pemain lain.", "Ban permanen"],
    ["Dilarang hack, cheat, atau memakai keuntungan yang tidak adil.", "Ban permanen"],
    ["Hormati semua pemain dan staff. Tanpa toxic, pelecehan, atau diskriminasi.", "Ban sementara (1-7 hari) atau permanen"],
    ["Dilarang spam atau promosi server lain.", "Peringatan, lalu ban sementara"],
    ["Gunakan bahasa Inggris di chat agar semua pemain bisa saling memahami.", "Peringatan"],
    ["Jangan memanfaatkan bug atau glitch. Segera laporkan ke staff.", "Ban sementara"],
    ["Membangun dekat spawn atau area terproteksi harus izin staff.", "Peringatan dan pembongkaran"]
  ],

  // Data rank (dari info resmi). Kosongkan "daily" jika tidak ada.
  ranks: [
    { n: "MEMBER", p: "GRATIS", claim: "Bawaan server", home: 3, pw: 1, pv: "0", perks: ["Rank default pemain baru"] },
    { n: "RANGER", p: "8K", claim: "+5.000", home: 4, pw: 1, pv: "0", perks: ["Prefix [Ranger]", "/hat", "/kit ranger (harian)"] },
    { n: "CAPTAIN", p: "20K", claim: "+7.500", home: 5, pw: 2, pv: "2 hal", perks: ["Prefix [Captain]", "/hat", "/vault", "/kit captain (harian)"] },
    { n: "VIP", p: "50K", claim: "+10.000", daily: "+500", home: 6, pw: 3, pv: "4 hal", perks: ["Prefix [VIP]", "/kit vip (harian)", "/back", "/top", "/near", "/hat", "/craft", "/workbench", "Channel VIP"] },
    { n: "OVERLORD", p: "100K", claim: "+20.000", daily: "+750", home: 8, pw: 4, pv: "6 hal", perks: ["Prefix [Overlord]", "/kit overlord (harian)", "/back", "/top", "/near", "/hat", "/craft", "/enderchest", "Channel VIP"] },
    { n: "WARLORD", p: "150K", claim: "+30.000", daily: "+1.000", home: 10, pw: 5, pv: "8 hal", perks: ["Prefix [Warlord]", "/kit warlord (harian)", "Semua command Overlord", "/anvil", "/stonecutter", "/smithingtable", "Channel VIP"] },
    { n: "MONARCH", p: "250K", claim: "+50.000", daily: "+1.500", home: 12, pw: 6, pv: "10 hal", perks: ["Prefix [Monarch]", "/kit monarch (harian)", "Semua command Warlord", "/nick", "/feed (cooldown)", "/heal (cooldown)", "Channel VIP"] },
    { n: "ASCENDANT", p: "500K", claim: "+100.000", daily: "+2.000", home: 15, pw: 8, pv: "15 hal", perks: ["Prefix rainbow animasi ||Ascendant||", "/kit ascendant (harian, Diamond gear instan)", "/fly khusus di Nether", "Semua command Member sampai Monarch", "Channel VIP"] }
  ]
};

export const LEGAL = {
  privacy: ['PRIVACY', 'KEBIJAKAN PRIVASI', [
    ['Data yang dikumpulkan', 'Web ini tidak memakai akun, cookie pelacak, atau analitik. Penyimpanan sesi hanya dipakai untuk melewati layar intro setelah kamu menekan Press Start.'],
    ['Layanan pihak ketiga', 'Google Fonts (font), api.mcsrvstat.us (status server), dan Discord (komunitas). Masing-masing punya kebijakan privasinya sendiri.'],
    ['Kontak', 'Pertanyaan soal data bisa disampaikan lewat Discord TelorIjo.']]],
  terms: ['TERMS', 'SYARAT & KETENTUAN', [
    ['Aturan main', 'Dengan bermain di TelorIjo kamu setuju mengikuti Rules server. Pelanggaran dikenai hukuman sesuai daftar di halaman Rules.'],
    ['Pembelian', 'Rank selain Member hanya dilayani lewat Saweria saat Admin sedang live streaming. Donasi di luar jam live tidak diproses. Pembelian tidak bisa dilakukan lewat website.'],
    ['Perubahan', 'Fitur, aturan, dan layanan dapat berubah. Pengumuman resmi disampaikan lewat Discord dan web ini.'],
    ['Akun & perilaku', 'Kamu bertanggung jawab atas akunmu. Staff dapat membatasi akses pemain yang merusak pengalaman bermain orang lain.']]]
};
