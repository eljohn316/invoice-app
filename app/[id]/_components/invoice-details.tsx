'use client';

import { useState } from 'react';
import { useInvoiceDetails } from '@/app/[id]/_hooks/use-invoice-details';
import {
  InvoiceDetailsBody,
  InvoiceDetailsBodySkeleton
} from '@/app/[id]/_components/invoice-details-body';
import {
  InvoiceDetailsHeader,
  InvoiceDetailsHeaderSkeleton
} from '@/app/[id]/_components/invoice-details-header';
import { UpdateInvoiceForm } from '@/components/invoice-form';
import { InvoiceDeleteModal } from './invoice-delete-modal';

export function InvoiceDetails() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { isLoading, error, data, mutate } = useInvoiceDetails();

  async function handleMarkAsPaid() {
    if (!data) return;

    const paymentTerms = data.invoice.paymentTerms;
    const items = data.invoice.items.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
      total: price * quantity
    }));
    const total = items.reduce((acc, curr) => acc + curr.total, 0);

    await mutate(data.invoice.id, {
      clientName: data.invoice.clientName,
      clientEmail: data.invoice.clientEmail,
      description: data.invoice.description,
      clientAddress: data.invoice.clientAddress,
      senderAddress: data.invoice.senderAddress,
      createdAt: data.invoice.createdAt,
      paymentDue: data.invoice.paymentDue,
      status: 'paid',
      items,
      paymentTerms,
      total
    });
  }

  if (isLoading)
    return (
      <>
        <InvoiceDetailsHeaderSkeleton />
        <InvoiceDetailsBodySkeleton />
      </>
    );

  if (error || typeof data === 'undefined') {
    const errorMessage = error.response.errors?.at(0)?.message;

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
      <UpdateInvoiceForm open={showEdit} onOpenChange={setShowEdit} invoice={data.invoice} />
      <InvoiceDeleteModal
        open={showDelete}
        onOpenChange={setShowDelete}
        invoiceId={data.invoice.id}
      />
      <InvoiceDetailsHeader
        status={data.invoice.status}
        onMarkasPaid={handleMarkAsPaid}
        onEdit={() => setShowEdit(true)}
        onDelete={() => setShowDelete(true)}
      />
      <InvoiceDetailsBody invoice={data.invoice} />
    </>
  );
}
