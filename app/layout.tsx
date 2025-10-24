import { Geist, Geist_Mono } from "next/font/google";
import SwRegister from "@/app/components/pwa/SwRegister";
import CookieBanner from "@/app/(client-renders)/cookie-banner";
import { Providers } from "@/app/(client-renders)/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="google-adsense-account" content="ca-pub-7936619142942349" />
        <meta name="google-site-verification" content="6Kk7v2LWoOHW8Bi-jxaqGWR3NrrlsvksdAhLUxwRr1k" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7936619142942349" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SwRegister />
        <Providers>
          {children}
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}