import { InvoiceListProvider } from '@/app/(home)/_components/invoice-list-provider';
import { InvoiceListItems } from '@/app/(home)/_components/invoice-list-items';
import { InvoiceListHeader } from '@/app/(home)/_components/invoice-list-header';

export default function Home() {
  return (
    <InvoiceListProvider>
      <InvoiceListHeader />
      <InvoiceListItems />
    </InvoiceListProvider>
  );
}
