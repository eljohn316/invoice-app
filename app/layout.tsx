import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import '@/app/globals.css';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Frontend Mentor | Invoice app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
