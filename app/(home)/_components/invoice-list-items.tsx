'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components/text';
import {
  InvoiceListItem,
  InvoiceListItemSkeleton
} from '@/app/(home)/_components/invoice-list-item';
import { useInvoices } from '@/components/invoice-list-provider';

export function InvoiceListItems() {
  const { isLoading, error, data } = useInvoices();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
        <InvoiceListItemSkeleton />
      </div>
    );
  }

  if (error || typeof data === 'undefined')
    return (
      <div className="text-center">
        <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
          An error occured while fetching the data
        </h4>
      </div>
    );

  if (data.invoices.length === 0)
    return (
      <div className="space-y-[2.625rem]">
        <Image
          src="/illustration-empty.svg"
          alt="No invoices"
          height={200}
          width={200}
          className="mx-auto h-40 w-auto lg:h-52"
        />
        <div className="space-y-[1.4375rem] text-center">
          <h3 className="text-2xl font-bold -tracking-[0.75px] text-[#0C0E16] dark:text-white">
            There is nothing here
          </h3>
          <Text className="mx-auto max-w-48">
            Create an invoice by clicking the <span className="font-bold">New</span> button and get
            started
          </Text>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      {data.invoices.map((invoice) => (
        <Link
          key={invoice.id}
          href={`/${invoice.id}`}
          className="block rounded-lg hover:ring hover:ring-[#7C5DFA]">
          <InvoiceListItem invoice={invoice} />
        </Link>
      ))}
    </div>
  );
}
