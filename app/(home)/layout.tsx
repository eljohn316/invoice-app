import { Suspense } from 'react';
import { InvoicesProvider } from '@/app/(home)/_components/invoices-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <InvoicesProvider>
      <Suspense>{children}</Suspense>
    </InvoicesProvider>
  );
}
