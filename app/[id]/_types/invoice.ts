import { Prisma } from '@/generated/prisma';

export type Invoice = Prisma.InvoiceGetPayload<{
  omit: {
    clientAddressId: true;
    senderAddressId: true;
  };
  include: {
    clientAddress: { omit: { id: true } };
    senderAddress: { omit: { id: true } };
    items: { omit: { id: true; invoiceId: true } };
  };
}>;
