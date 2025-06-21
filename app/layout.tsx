import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';

import '@/app/globals.css';

import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { SWRProvider } from '@/components/swr-provider';
import { cn } from '@/lib/utils';
import { InvoiceListProvider } from '@/components/invoice-list-provider';
import { Suspense } from 'react';

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
          'flex min-h-svh flex-col overflow-y-scroll bg-[#F8F8FB] antialiased lg:flex-row dark:bg-[#141625]',
          leagueSpartan.variable
        )}>
        <Suspense>
          <SWRProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <InvoiceListProvider>
                <Navigation />
                <div className="relative flex-1 px-6 py-8 md:px-12 md:py-[3.75rem] lg:mx-auto lg:max-w-[45.625rem] lg:px-4 lg:py-[4.875rem]">
                  {children}
                </div>
              </InvoiceListProvider>
            </ThemeProvider>
          </SWRProvider>
        </Suspense>
      </body>
    </html>
  );
}
