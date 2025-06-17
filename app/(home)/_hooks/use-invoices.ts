import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { ClientError } from 'graphql-request';
import { INVOICES_QUERY } from '@/gql/invoices-query';
import { InvoiceItems } from '@/app/(home)/_types/invoice';

type Invoices = {
  invoices: InvoiceItems;
};

export function useInvoicesQuery() {
  const searchParams = useSearchParams();
  const status = searchParams.getAll('status');
  const { isLoading, error, data } = useSWR<Invoices>([INVOICES_QUERY, { status }]);

  return {
    isLoading,
    error: error as ClientError,
    data
  };
}
