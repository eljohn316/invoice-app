import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/text';
import { cn, formatDate } from '@/lib/utils';
import { Invoice } from '@/app/[id]/_types/invoice';

function TextBold({ className, children }: { className?: string; children: React.ReactNode }) {
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

interface InvoiceDetailsBody {
  invoice: Invoice;
}

export function InvoiceDetailsBody({ invoice }: InvoiceDetailsBody) {
  return (
    <Card className="p-6 md:p-8 lg:p-12">
      <div className="space-y-[1.875rem] md:flex md:items-center md:justify-between md:space-y-0">
        <div className="space-y-2">
          <TextBold>
            <span className="text-[#7E88C3]">#</span>
            {invoice.id}
          </TextBold>
          <Text>{invoice.description}</Text>
        </div>
        <div className="space-y-1">
          <Text>{invoice.senderAddress.street}</Text>
          <Text>{invoice.senderAddress.city}</Text>
          <Text>{invoice.senderAddress.postCode}</Text>
          <Text>{invoice.senderAddress.country}</Text>
        </div>
      </div>
      <div className="mt-[1.875rem] grid grid-cols-2 gap-8 md:mt-5 md:grid-cols-3 md:gap-x-4">
        <div className="space-y-[1.875rem]">
          <div className="space-y-[0.8125rem]">
            <Text>Invoice Date</Text>
            <TextBold>{formatDate(invoice.createdAt)}</TextBold>
          </div>
          <div className="space-y-[0.8125rem]">
            <Text>Payment Due</Text>
            <TextBold>{formatDate(invoice.paymentDue)}</TextBold>
          </div>
        </div>
        <div className="space-y-[0.8125rem]">
          <Text>Bill To</Text>
          <div className="space-y-2.5">
            <TextBold>{invoice.clientName}</TextBold>
            <div className="space-y-1">
              <Text>{invoice.clientAddress.street}</Text>
              <Text>{invoice.clientAddress.city}</Text>
              <Text>{invoice.clientAddress.postCode}</Text>
              <Text>{invoice.clientAddress.country}</Text>
            </div>
          </div>
        </div>
        <div className="space-y-[0.8125rem]">
          <Text>Sent to</Text>
          <TextBold>{invoice.clientEmail}</TextBold>
        </div>
      </div>
      <div className="mt-12 overflow-hidden rounded-md lg:mt-11">
        <div className="space-y-6 bg-[#F9FAFE] p-6 md:hidden dark:bg-[#252945]">
          {invoice.items.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="space-y-2">
                <TextBold>{item.name}</TextBold>
                <TextBold className="text-[#7E88C3] dark:text-[#888EB0]">
                  {item.quantity} x &pound; {item.price.toFixed(2)}
                </TextBold>
              </div>
              <TextBold>&pound; {(item.quantity * +item.price).toFixed(2)}</TextBold>
            </div>
          ))}
        </div>
        <div className="hidden bg-[#F9FAFE] p-8 md:block dark:bg-[#252945]">
          <div className="gap-x-4 md:grid md:grid-cols-[3fr_repeat(3,minmax(0,_1fr))]">
            <Text>Item Name</Text>
            <Text className="justify-self-center">QTY.</Text>
            <Text className="justify-self-end">Price</Text>
            <Text className="justify-self-end">Total</Text>
          </div>
          <div className="mt-8 gap-x-4 gap-y-8 md:grid md:grid-cols-[3fr_repeat(3,minmax(0,_1fr))]">
            {invoice.items.map((item) => (
              <React.Fragment key={item.name}>
                <TextBold>{item.name}</TextBold>
                <TextBold className="justify-self-center text-[#7E88C3]">{item.quantity}</TextBold>
                <TextBold className="justify-self-end text-[#7E88C3]">
                  &pound; {item.price.toFixed(2)}
                </TextBold>
                <TextBold className="justify-self-end">&pound; {item.total.toFixed(2)}</TextBold>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between bg-[#373B53] px-6 py-8 md:p-8 dark:bg-[#0C0E16]">
          <Text className="text-white">Amount Due</Text>
          {invoice.total && (
            <TextBold className="text-2xl leading-8 -tracking-[0.5px] text-white">
              &pound; {invoice.total.toFixed(2)}
            </TextBold>
          )}
        </div>
      </div>
    </Card>
  );
}

export function InvoiceDetailsBodySkeleton() {
  return (
    <Card className="px-6 py-20 md:px-8 lg:px-12">
      <div role="status" className="flex justify-center">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-[#7C5DFA] text-gray-300 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </Card>
  );
}
