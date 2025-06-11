import { Invoice } from '@/generated/prisma';

export type InvoiceItem = Pick<Invoice, 'id' | 'clientName' | 'paymentDue' | 'status' | 'total'>;

export type InvoiceItems = InvoiceItem[];
