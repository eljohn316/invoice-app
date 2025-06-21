'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

export function InvoiceDeleteModal({
  open,
  onOpenChange,
  invoiceId,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
}) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  // const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // router.replace('/');
    // setIsDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="light" disabled={isDeleting} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="danger" disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
