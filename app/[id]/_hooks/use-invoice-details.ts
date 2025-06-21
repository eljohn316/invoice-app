import useSWR, { KeyedMutator } from 'swr';
import { useParams } from 'next/navigation';
import { ClientError } from 'graphql-request';
import { INVOICE_QUERY } from '@/gql/invoices-query';
import { InvoiceDetails, InvoiceItem, UpdateInvoiceArgs } from '@/lib/types';
import { client } from '@/lib/graphql-client';
import { UPDATE_INVOICE_MUTATION } from '@/gql/invoices-mutation';
import { useInvoices } from '@/components/invoice-list-provider';

const updateInvoice = async (
  updateInvoiceId: string,
  input: UpdateInvoiceArgs,
  revalidator: KeyedMutator<{
    invoices: InvoiceItem[];
  }>
) => {
  const { updateInvoice } = await client.request<{ updateInvoice: InvoiceDetails }>(
    UPDATE_INVOICE_MUTATION,
    { updateInvoiceId, input }
  );
  await revalidator();
  return {
    invoice: updateInvoice
  };
};

export function useInvoiceDetails() {
  const { revalidateInvoices } = useInvoices();
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    error,
    data,
    mutate: mutateInvoice
  } = useSWR<{ invoice: InvoiceDetails }>([INVOICE_QUERY, { invoiceId: id }], {
    onErrorRetry: (err, _, __, revalidate, { retryCount }) => {
      if ((err as ClientError).response.errors?.at(0)?.extensions?.code === 404) return;
      if (retryCount >= 10) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    }
  });

  const mutate = async (id: string, payload: UpdateInvoiceArgs, close?: () => void) => {
    mutateInvoice(async () => updateInvoice(id, payload, revalidateInvoices), {
      optimisticData: () => {
        if (typeof close !== 'undefined') {
          close();
        }
        return {
          invoice: {
            id,
            clientAddress: payload.clientAddress,
            clientName: payload.clientName,
            clientEmail: payload.clientEmail,
            createdAt: payload.createdAt,
            description: payload.description,
            items: payload.items,
            paymentDue: payload.paymentDue,
            paymentTerms: payload.paymentTerms,
            senderAddress: payload.senderAddress,
            status: payload.status,
            total: payload.total
          }
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
