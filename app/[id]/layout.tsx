import { InvoiceDetailsLayout } from '@/app/[id]/_components/invoice-details-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InvoiceDetailsLayout>{children}</InvoiceDetailsLayout>;
}
