'use client';

import useSWR, { Fetcher } from 'swr';
import { request, RequestDocument, gql } from 'graphql-request';

import { InvoiceList } from '@/app/(home)/_components/invoice-list';
import { InvoiceListSkeleton } from '@/app/(home)/_components/invoice-list-skeleton';
import type { InvoiceItems } from '@/app/(home)/_types/invoice';

type Invoices = { invoices: InvoiceItems };

const fetcher: Fetcher<Invoices, string> = (query: RequestDocument) =>
  request('http://localhost:3000/api/graphql', query);

export default function Home() {
  const { isLoading, error, data } = useSWR(
    gql`
      query Invoices {
        invoices {
          id
          clientName
          paymentDue
          total
          status
        }
      }
    `,
    fetcher
  );

  if (isLoading) return <InvoiceListSkeleton />;

  if (error || typeof data === 'undefined')
    return (
      <div className="text-center">
        <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
          An error occured while fetching the data
        </h4>
      </div>
    );

  return <InvoiceList invoices={data.invoices} />;
}
