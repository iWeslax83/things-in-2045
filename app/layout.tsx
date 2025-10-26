import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react"; // React import eklendi

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ev Anahtarı 2045 - Geleceğin Güvenlik Deneyimi",
  description: "Biyometrik kimlik doğrulama, çip tabanlı erişim sistemleri ve yapay zeka ile ev güvenliğinde yeni bir çağ başlıyor. 2045'te ev güvenliğinin nasıl olacağını keşfedin.",
  keywords: "ev anahtarı, biyometrik, çip, güvenlik, yapay zeka, gelecek, teknoloji, erişim sistemi",
  authors: [{ name: "Ev Anahtarı 2045" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}