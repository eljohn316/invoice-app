'use client';

import useSWR, { Fetcher } from 'swr';
import { useParams } from 'next/navigation';
import { RequestDocument, ClientError } from 'graphql-request';
import { client } from '@/lib/graphql-client';
import { InvoiceQuery } from '@/gql/invoices-query';

import { Invoice } from '@/app/[id]/_types/invoice';
import {
  InvoiceDetailsHeader,
  InvoiceDetailsHeaderSkeleton
} from '@/app/[id]/_components/invoice-details-header';
import {
  InvoiceDetailsBody,
  InvoiceDetailsBodySkeleton
} from '@/app/[id]/_components/invoice-details-body';

const fetcher: Fetcher<{ invoice: Invoice }, [RequestDocument, Record<string, PropertyKey>]> = ([
  query,
  variables
]) => client.request(query, variables);

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useSWR([InvoiceQuery, { invoiceId: id }], fetcher, {
    onErrorRetry: (err, _, __, revalidate, { retryCount }) => {
      if ((err as ClientError).response.errors?.at(0)?.extensions?.code === 404) return;

      if (retryCount >= 10) return;

      setTimeout(() => revalidate({ retryCount }), 5000);
    }
  });

  if (isLoading) {
    return (
      <>
        <InvoiceDetailsHeaderSkeleton />
        <InvoiceDetailsBodySkeleton />
      </>
    );
  }

  if (error || typeof data === 'undefined') {
    const errorMessage = (error as ClientError).response.errors?.at(0)?.message;

    return (
      <div className="py-20 text-center">
        <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
          {errorMessage ? errorMessage : 'An error occured while fetching the data'}
        </h4>
      </div>
    );
  }

  return (
    <>
      <InvoiceDetailsHeader
        status={data.invoice.status}
        onMarkasPaid={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <InvoiceDetailsBody invoice={data.invoice} />
    </>
  );
}
