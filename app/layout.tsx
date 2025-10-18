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
  title: "Eğitim 2045 - Geleceğin Öğrenme Deneyimi",
  description: "Yapay zeka, sanal gerçeklik ve kişiselleştirilmiş öğrenme ile eğitimde yeni bir çağ başlıyor. 2045'te eğitimin nasıl olacağını keşfedin.",
  keywords: "eğitim, yapay zeka, sanal gerçeklik, gelecek, öğrenme, teknoloji",
  authors: [{ name: "Eğitim 2045" }],
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