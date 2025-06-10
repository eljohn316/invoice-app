import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

type Status = 'paid' | 'pending' | 'draft';

const invoiceStatusVariants = cva(
  'inline-flex w-auto justify-center items-center gap-x-2 rounded-md px-[1.875rem] py-3.5 text-[0.9375rem] leading-none font-bold -tracking-[0.25px]',
  {
    variants: {
      status: {
        paid: 'bg-[#33D69F]/5 text-[#33D69F]',
        pending: 'bg-[#FF8F00]/5 text-[#FF8F00]',
        draft:
          'bg-[#373B53]/5 text-[#373B53] dark:bg-[#DFE3FA]/5 dark:text-[#DFE3FA]'
      }
    }
  }
);

function Indicator({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        status === 'pending' && 'bg-[#FF8F00]',
        status === 'paid' && 'bg-[#33D69F]',
        status === 'draft' && 'bg-[#373B53] dark:bg-[#DFE3FA]',
        'size-2 flex-none rounded-full'
      )}
    />
  );
}

interface InvoiceStatusProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof invoiceStatusVariants> {}

export function InvoiceStatus({
  status,
  className,
  ...props
}: InvoiceStatusProps) {
  return (
    <span
      className={cn(invoiceStatusVariants({ status, className }))}
      {...props}>
      <Indicator status={status!} />
      {status === 'draft' && 'Draft'}
      {status === 'pending' && 'Pending'}
      {status === 'paid' && 'Paid'}
    </span>
  );
}
