'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/graphql-client';
import { DELETE_INVOICE_MUTATION } from '@/gql/invoices-mutation';
import { useInvoices } from '@/components/invoice-list-provider';

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
  const router = useRouter();
  const { revalidateInvoices } = useInvoices();

  async function handleDelete() {
    setIsDeleting(true);
    await client.request(DELETE_INVOICE_MUTATION, {
      deleteInvoiceId: invoiceId
    });
    await revalidateInvoices();
    router.replace('/');
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
