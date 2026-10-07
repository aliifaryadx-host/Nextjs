import './globals.css';

export const metadata = {
  metadataBase: new URL('https://telorijo.web.id'),
  title: { default: 'TelorIjo Server - Minecraft Indonesia', template: '%s | TelorIjo' },
  description: 'Server Minecraft Bedrock & Java TelorIjo! Join sekarang dan main survival seru bareng!',
  icons: { icon: '/favicon.ico' },
  openGraph: { title: 'TelorIjo Server - Minecraft Indonesia', description: 'Server Minecraft Bedrock & Java TelorIjo! Join sekarang dan main survival seru bareng!', url: 'https://telorijo.web.id', images: ['/og-image.png'], locale: 'id_ID', type: 'website' },
  twitter: { card: 'summary_large_image' }
};
export const viewport = { themeColor: '#8fd14f', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'var h=document.documentElement;h.classList.add("js");try{if(sessionStorage.getItem("tj")||location.hash)h.classList.add("seen")}catch(e){}' }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Teko:wght@500;600;700&family=Montserrat:wght@500;700;900&family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
