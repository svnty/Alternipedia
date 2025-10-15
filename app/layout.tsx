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
        {/* PWA: web manifest and theme color */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SwRegister />
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}