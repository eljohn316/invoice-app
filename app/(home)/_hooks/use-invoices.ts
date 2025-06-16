import useSWR, { Fetcher } from 'swr';
import { useSearchParams } from 'next/navigation';
import { ClientError, RequestDocument } from 'graphql-request';
import { client } from '@/lib/graphql-client';
import { INVOICES_QUERY } from '@/gql/invoices-query';
import { InvoiceItems } from '@/app/(home)/_types/invoice';

type Invoices = {
  invoices: InvoiceItems;
};

type FetcherArgs = [RequestDocument, Record<PropertyKey, string>];

const fetcher: Fetcher<Invoices, FetcherArgs> = ([query, variables]) => {
  return client.request(query, variables);
};

export function useInvoicesQuery() {
  const searchParams = useSearchParams();
  const status = searchParams.getAll('status');
  const { isLoading, error, data, mutate } = useSWR<Invoices>(
    [INVOICES_QUERY, { status }],
    fetcher
  );

  return {
    isLoading,
    error: error as ClientError,
    data,
    mutate
  };
}
