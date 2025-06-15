import useSWR, { Fetcher } from 'swr';
import { useParams } from 'next/navigation';
import { ClientError, RequestDocument } from 'graphql-request';
import { client } from '@/lib/graphql-client';
import { INVOICE_QUERY } from '@/gql/invoices-query';
import { Invoice } from '@/app/[id]/_types/invoice';

type InvoiceDetails = {
  invoice: Invoice;
};

type FetcherArgs = [RequestDocument, Record<string, PropertyKey>];

const fetcher: Fetcher<InvoiceDetails, FetcherArgs> = ([query, variables]) =>
  client.request(query, variables);

export function useInvoiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useSWR([INVOICE_QUERY, { invoiceId: id }], fetcher, {
    onErrorRetry: (err, _, __, revalidate, { retryCount }) => {
      if ((err as ClientError).response.errors?.at(0)?.extensions?.code === 404) return;

      if (retryCount >= 10) return;

      setTimeout(() => revalidate({ retryCount }), 5000);
    }
  });

  return {
    isLoading,
    error: error as ClientError,
    data
  };
}
