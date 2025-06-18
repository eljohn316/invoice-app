import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { Decimal } from 'decimal.js';
import { ClientError } from 'graphql-request';

import { INVOICES_QUERY } from '@/gql/invoices-query';
import { CREATE_INVOICE_MUTATION } from '@/gql/invoices-mutation';
import { client } from '@/lib/graphql-client';
import { InvoiceItem, InvoiceItems } from '@/app/(home)/_types/invoice';

type Invoices = {
  invoices: InvoiceItems;
};

type Address = {
  street?: string;
  city?: string;
  postCode?: string;
  country?: string;
};

type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type CreateInvoiceInput = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: 'paid' | 'pending' | 'draft';
  total: number;
  clientAddress: Address;
  senderAddress: Address;
  items: Item[];
};

const createInvoice = async (input: CreateInvoiceInput, invoices: InvoiceItems) => {
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

  const mutate = async (payload: CreateInvoiceInput, close: () => void) => {
    const currentInvoices = data ? data.invoices : [];
    mutateInvoices(() => createInvoice(payload, currentInvoices), {
      optimisticData: () => {
        close();
        return {
          invoices: [
            {
              id: payload.id,
              clientName: payload.clientName,
              status: payload.status,
              paymentDue: new Date(payload.paymentDue),
              total: new Decimal(payload.total)
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
    mutate
  };
}
