import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { ClientError } from 'graphql-request';
import { INVOICE_QUERY } from '@/gql/invoices-query';

export function useInvoiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useSWR([INVOICE_QUERY, { invoiceId: id }], {
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
