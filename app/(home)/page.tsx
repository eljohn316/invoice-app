import { InvoiceListItems } from '@/app/(home)/_components/invoice-list-items';
import { InvoiceListHeader } from '@/app/(home)/_components/invoice-list-header';

export default function Home() {
  return (
    <>
      <InvoiceListHeader />
      <InvoiceListItems />
    </>
  );
}
