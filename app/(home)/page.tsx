'use client';

import { Suspense } from 'react';
import { InvoiceList } from '@/app/(home)/_components/invoice-list';
import { InvoiceListHeader } from '@/app/(home)/_components/invoice-list-header';

export default function Home() {
  return (
    <Suspense>
      <div className="space-y-8 md:space-y-[3.4375rem] lg:space-y-16">
        <InvoiceListHeader />
        <InvoiceList />
      </div>
    </Suspense>
  );
}
