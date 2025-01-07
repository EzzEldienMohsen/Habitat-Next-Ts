import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/headerAndFooter/Header';
import Footer from '@/components/headerAndFooter/Footer';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Habitat Next Ts',
  description:
    'this is a version from the habitat project that uses NextJs and Typescript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full box-border`}
      >
        <Header />
        {children}
        <ToastContainer position="top-center" autoClose={2000} />
        <Footer />
      </body>
    </html>
  );
}
