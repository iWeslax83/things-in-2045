import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NODE_ENV === 'production' ? '/education-2045' : '';

export const metadata: Metadata = {
  title: "Eğitim 2045 - Geleceğin Öğrenme Deneyimi",
  description: "Yapay zeka, sanal gerçeklik ve kişiselleştirilmiş öğrenme ile eğitimde yeni bir çağ başlıyor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}