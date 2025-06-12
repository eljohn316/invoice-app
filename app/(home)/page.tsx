'use client';

import useSWR, { Fetcher } from 'swr';
import { RequestDocument } from 'graphql-request';

import { InvoiceList } from '@/app/(home)/_components/invoice-list';
import { InvoiceListSkeleton } from '@/app/(home)/_components/invoice-list-skeleton';
import {
  InvoiceListHeader,
  InvoiceListHeaderSkeleton
} from '@/app/(home)/_components/invoice-list-header';
import type { InvoiceItems } from '@/app/(home)/_types/invoice';
import { useStatusParams } from '@/app/(home)/_hooks/use-status-params';

import { client } from '@/lib/graphql-client';
import { InvoicesQuery } from '@/gql/invoices-query';

type Invoices = { invoices: InvoiceItems };

const fetcher: Fetcher<Invoices, [RequestDocument, Record<string, PropertyKey>]> = ([
  query,
  variables
]: [RequestDocument, Record<string, PropertyKey>]) => client.request(query, variables);

export default function Home() {
  const status = useStatusParams();
  const { isLoading, error, data } = useSWR<Invoices>([InvoicesQuery, { status }], fetcher);

  if (isLoading)
    return (
      <>
        <InvoiceListHeaderSkeleton />
        <InvoiceListSkeleton />
      </>
    );

  if (error || typeof data === 'undefined')
    return (
      <>
        <InvoiceListHeader numInvoices={0} />
        <div className="text-center">
          <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
            An error occured while fetching the data
          </h4>
        </div>
      </>
    );

  return (
    <>
      <InvoiceListHeader numInvoices={data.invoices.length} />
      <InvoiceList invoices={data.invoices} />
    </>
  );
}
