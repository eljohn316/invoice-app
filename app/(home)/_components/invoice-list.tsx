import Image from 'next/image';
import { Text } from '@/components/text';
import { InvoiceListItem } from '@/app/(home)/_components/invoice-list-item';
import type { InvoiceItems } from '@/app/(home)/_types/invoice';

interface InvoiceListProps {
  invoices: InvoiceItems;
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  if (invoices.length === 0)
    return (
      <div className="space-y-[2.625rem]">
        <Image
          src="/illustration-empty.svg"
          alt="No invoices"
          height={200}
          width={200}
          className="mx-auto h-40 w-auto lg:h-52"
        />
        <div className="space-y-[1.4375rem] text-center">
          <h3 className="text-2xl font-bold -tracking-[0.75px] text-[#0C0E16] dark:text-white">
            There is nothing here
          </h3>
          <Text className="mx-auto max-w-48">
            Create an invoice by clicking the <span className="font-bold">New</span> button and get
            started
          </Text>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}
