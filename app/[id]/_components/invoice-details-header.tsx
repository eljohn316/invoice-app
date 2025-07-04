import { Portal } from '@radix-ui/react-portal';
import { InvoiceStatus } from '@/components/invoice-status';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/text';
import { Status } from '@/lib/types';

interface InvoiceDetailsHeaderProps {
  status: Status;
  onEdit: () => void;
  onDelete: () => void;
  onMarkasPaid: () => void;
}

export function InvoiceDetailsHeader({
  status,
  onEdit,
  onDelete,
  onMarkasPaid
}: InvoiceDetailsHeaderProps) {
  return (
    <Card className="flex items-center justify-between px-6 py-9 md:justify-start md:px-8 md:py-6">
      <Text>Status</Text>
      <InvoiceStatus status={status} className="md:ml-5" />
      <div className="hidden md:ml-auto md:flex md:gap-x-2">
        <Button variant="light" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {status !== 'paid' && (
          <Button variant="primary" onClick={onMarkasPaid}>
            Mark as Paid
          </Button>
        )}
      </div>
      <Portal
        container={document.getElementById('invoice-details')}
        className="-mx-6 -my-8 mt-14 flex justify-center gap-x-2 bg-white px-6 py-[1.375rem] md:hidden dark:bg-[#1E2139]">
        <Button
          variant="light"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            onEdit();
          }}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {status !== 'paid' && (
          <Button variant="primary" onClick={onMarkasPaid}>
            Mark as Paid
          </Button>
        )}
      </Portal>
    </Card>
  );
}

export function InvoiceDetailsHeaderSkeleton() {
  return (
    <Card className="flex items-center justify-between px-6 py-9 md:justify-start md:px-8 md:py-6">
      <Text>Status</Text>
      <Skeleton className="h-8 w-full max-w-24 flex-auto md:ml-5" />
      <Skeleton className="hidden h-10 w-full max-w-40 flex-auto md:ml-auto md:block" />
    </Card>
  );
}
