import * as React from 'react';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, PlusIcon } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterDropdown } from '@/app/(home)/_components/filter-dropdown';

interface InvoiceListHeaderProps {
  numInvoices: number;
}

export function InvoiceListHeader({ numInvoices }: InvoiceListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[0.1875rem]">
        <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] md:text-4xl md:leading-[33px] md:tracking-[-1.13px] dark:text-white">
          Invoices
        </h4>
        <Text>
          {numInvoices} {numInvoices === 1 ? 'invoice' : 'invoices'}
        </Text>
      </div>
      <div className="flex items-center gap-x-[1.125rem] md:gap-x-10">
        <FilterDropdown />
        <Button type="button" className="gap-x-2 py-1.5 pr-4 pl-1.5 md:gap-x-4 md:py-2 md:pl-2">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-[#7C5DFA]">
            <PlusIcon aria-hidden="true" />
          </span>
          <span className="md:hidden">New</span>
          <span className="hidden md:block">New Invoice</span>
        </Button>
      </div>
    </div>
  );
}

export function InvoiceListHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[0.1875rem]">
        <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] md:text-4xl md:leading-[33px] md:tracking-[-1.13px] dark:text-white">
          Invoices
        </h4>
        <Skeleton className="h-2.5 max-w-16" />
      </div>
      <div className="flex items-center gap-x-[1.125rem] md:gap-x-10">
        <button className="inline-flex cursor-pointer items-center gap-x-3 text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] outline-none md:gap-x-3.5 dark:text-white data-[state=open]:[&_svg]:rotate-180">
          <span className="md:hidden">Filter</span>
          <span className="hidden md:block">Filter by status</span>
          <ArrowDownIcon className="text-[#7C5DFA]" aria-hidden="true" />
        </button>
        <Button type="button" className="gap-x-2 py-1.5 pr-4 pl-1.5 md:gap-x-4 md:py-2 md:pl-2">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-[#7C5DFA]">
            <PlusIcon aria-hidden="true" />
          </span>
          <span className="md:hidden">New</span>
          <span className="hidden md:block">New Invoice</span>
        </Button>
      </div>
    </div>
  );
}
