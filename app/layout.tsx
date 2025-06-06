import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';

import '@/app/globals.css';

import { cn } from '@/lib/utils';
import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-svh flex-col bg-[#F8F8FB] antialiased lg:flex-row dark:bg-[#141625]',
          leagueSpartan.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navigation />
          <div className="relative flex-1 px-6 py-8 md:px-12 md:py-[3.75rem] lg:mx-auto lg:max-w-[45.625rem] lg:px-4 lg:py-[4.875rem]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
