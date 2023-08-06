'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

const poppins = Poppins({ weight: '400', subsets: ['devanagari'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
