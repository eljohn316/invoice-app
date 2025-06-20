'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/icons';

export function InvoiceDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="invoice-details" className="space-y-8">
      <Link
        href="/"
        className="inline-flex cursor-pointer items-center gap-x-6 text-[15px] font-bold -tracking-[0.25px] text-[#0C0E16] dark:text-white">
        <ArrowLeftIcon />
        <span>Go Back</span>
      </Link>
      <div className="space-y-4 md:space-y-6">{children}</div>
    </div>
  );
}
