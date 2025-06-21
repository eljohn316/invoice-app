import * as React from 'react';
import { ArrowRightIcon } from '@/components/icons';
import { Text } from '@/components/text';
import { InvoiceStatus } from '@/components/invoice-status';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatDate } from '@/lib/utils';
import { InvoiceItem } from '@/lib/types';

function TextBold({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Text
      className={cn(
        'text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] dark:text-white',
        className
      )}>
      {children}
    </Text>
  );
}

export function InvoiceListItem({ invoice }: { invoice: InvoiceItem }) {
  return (
    <Card className="p-6 md:py-[1.875rem] lg:px-8">
      <div className="space-y-6 md:hidden">
        <div className="flex items-center justify-between">
          <TextBold>
            <span className="text-[#7E88C3]">#</span>
            {invoice.id}
          </TextBold>
          <Text>{invoice.clientName === '' ? '------' : invoice.clientName}</Text>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-[0.5625rem]">
            <Text>{invoice.paymentDue ? `Due ${formatDate(invoice.paymentDue)}` : '-----'}</Text>
            <TextBold>&pound; {invoice.total.toFixed(2)}</TextBold>
          </div>
          <InvoiceStatus status={invoice.status} />
        </div>
      </div>
      <div className="hidden items-center md:flex">
        <TextBold className="max-w-16 flex-auto">
          <span className="text-[#7E88C3]">#</span>
          {invoice.id}
        </TextBold>
        <Text className="ml-7 max-w-24 flex-auto">
          {invoice.paymentDue ? `Due ${formatDate(invoice.paymentDue)}` : '-----'}
        </Text>
        <Text className="ml-12 flex-1">
          {invoice.clientName === '' ? '------' : invoice.clientName}
        </Text>
        <TextBold className="shrink-0">&pound; {invoice.total.toFixed(2)}</TextBold>
        <InvoiceStatus status={invoice.status} className="ml-10 max-w-[6.5rem] flex-none" />
        <div className="ml-5 flex-none">
          <span className="sr-only">View invoice</span>
          <ArrowRightIcon aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}

export function InvoiceListItemSkeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <Card className={cn('p-6 md:py-[1.875rem] lg:px-8', className)} {...props}>
      <div className="space-y-6 md:hidden">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-full max-w-16 flex-none" />
          <Skeleton className="h-3.5 w-full max-w-20 flex-none" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-auto space-y-[0.5625rem]">
            <Skeleton className="h-3.5 w-full max-w-24" />
            <Skeleton className="h-3.5 w-full max-w-20" />
          </div>
          <Skeleton className="h-8 w-full max-w-[6.5rem]" />
        </div>
      </div>
      <div className="hidden gap-x-8 md:flex">
        <Skeleton className="h-3.5 w-1/6" />
        <Skeleton className="h-3.5 w-2/6" />
        <Skeleton className="h-3.5 w-2/6" />
        <Skeleton className="h-3.5 w-2/6" />
        <Skeleton className="h-3.5 w-1/6" />
        <div className="flex-auto">
          <ArrowRightIcon />
        </div>
      </div>
    </Card>
  );
}
