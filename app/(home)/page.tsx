import { InvoiceList } from '@/app/(home)/_components/invoice-list';
import { InvoiceListHeader } from '@/app/(home)/_components/invoice-list-header';
import { InvoicesProvider } from '@/app/(home)/_components/invoices-provider';

export default function Home() {
  return (
    <InvoicesProvider>
      <InvoiceListHeader />
      <InvoiceList />
    </InvoicesProvider>
  );
}
