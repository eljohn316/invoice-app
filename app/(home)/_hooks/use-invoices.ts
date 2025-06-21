import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { ClientError } from 'graphql-request';

import { INVOICES_QUERY } from '@/gql/invoices-query';
import { CREATE_INVOICE_MUTATION } from '@/gql/invoices-mutation';
import { client } from '@/lib/graphql-client';
import { CreateInvoiceArgs, InvoiceItem } from '@/lib/types';

type Invoices = {
  invoices: InvoiceItem[];
};

const createInvoice = async (input: CreateInvoiceArgs, invoices: InvoiceItem[]) => {
  const { createInvoice } = await client.request<{ createInvoice: InvoiceItem }>(
    CREATE_INVOICE_MUTATION,
    { input }
  );
  return {
    invoices: [createInvoice, ...invoices]
  };
};

export function useInvoicesQuery() {
  const searchParams = useSearchParams();
  const status = searchParams.getAll('status');
  const {
    isLoading,
    error,
    data,
    mutate: mutateInvoices
  } = useSWR<Invoices>([INVOICES_QUERY, { status }]);

  const mutate = async (payload: CreateInvoiceArgs, close: () => void) => {
    const currentInvoices = data ? data.invoices : [];
    mutateInvoices(() => createInvoice(payload, currentInvoices), {
      optimisticData: () => {
        close();
        return {
          invoices: [
            {
              id: payload.id,
              clientName: payload.clientName,
              paymentDue: payload.paymentDue,
              status: payload.status,
              total: payload.total
            },
            ...currentInvoices
          ]
        };
      },
      rollbackOnError: true,
      revalidate: false
    });
  };

  return {
    isLoading,
    error: error as ClientError,
    data,
    mutate,
    revalidateInvoices: mutateInvoices
  };
}
