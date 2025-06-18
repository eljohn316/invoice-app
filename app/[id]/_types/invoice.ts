import { Prisma } from '@/generated/prisma';

export type Invoice = Prisma.InvoiceGetPayload<{
  include: {
    clientAddress: { omit: { id: true } };
    senderAddress: { omit: { id: true } };
    items: { omit: { id: true; invoiceId: true } };
  };
}>;
