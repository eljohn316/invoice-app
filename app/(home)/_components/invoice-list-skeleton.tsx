import { InvoiceListItemSkeleton } from './invoice-list-item';

export function InvoiceListSkeleton() {
  return (
    <div className="space-y-4">
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
    </div>
  );
}
