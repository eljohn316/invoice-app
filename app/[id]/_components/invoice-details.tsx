'use client';

import { useInvoiceDetails } from '@/app/[id]/_hooks/use-invoice-details';
import {
  InvoiceDetailsBody,
  InvoiceDetailsBodySkeleton
} from '@/app/[id]/_components/invoice-details-body';
import {
  InvoiceDetailsHeader,
  InvoiceDetailsHeaderSkeleton
} from '@/app/[id]/_components/invoice-details-header';

export function InvoiceDetails() {
  const { isLoading, error, data } = useInvoiceDetails();

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
