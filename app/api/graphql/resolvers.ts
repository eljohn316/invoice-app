import { DateResolver } from 'graphql-scalars';
import { GraphQLError } from 'graphql';
import { db } from '@/lib/db';

type Status = 'pending' | 'paid' | 'draft';

type CreateInvoiceInput = {
  id: string;
  clientName: string;
  clientEmail: string;
  createdAt: Date;
  paymentDue: Date;
  paymentTerms: string;
  description: string;
  total: number;
  clientAddress: { street: string; city: string; country: string; postCode: string };
  senderAddress: { street: string; city: string; country: string; postCode: string };
  status: 'paid' | 'draft' | 'pending';
  items: { name: string; quantity: number; price: number; total: number }[];
};

export const resolvers = {
  Date: DateResolver,
  Query: {
    invoices: async (_: undefined, args: { status: Status[] }) => {
      const status: Status[] =
        args.status.length === 0 ? ['pending', 'paid', 'draft'] : args.status;

      return await db.invoice.findMany({
        where: {
          status: { in: status }
        },
        include: {
          clientAddress: true,
          senderAddress: true,
          items: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    },
    invoice: async (_: undefined, args: { id: string }) => {
      const invoice = await db.invoice.findUnique({
        where: { id: args.id },
        include: {
          clientAddress: true,
          senderAddress: true,
          items: true
        }
      });

      if (!invoice) throw new GraphQLError('Invoice not found', { extensions: { code: 404 } });

      return invoice;
    }
  },
  Mutation: {
    createInvoice: async (_: undefined, { input }: { input: CreateInvoiceInput }) => {
      const newInvoice = await db.invoice.create({
        data: {
          id: input.id,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          createdAt: input.createdAt,
          paymentDue: input.paymentDue,
          paymentTerms: +input.paymentTerms,
          description: input.description,
          status: input.status,
          total: input.total,
          clientAddress: {
            create: {
              street: input.clientAddress.street,
              city: input.clientAddress.city,
              country: input.clientAddress.country,
              postCode: input.clientAddress.postCode
            }
          },
          senderAddress: {
            create: {
              street: input.senderAddress.street,
              city: input.senderAddress.city,
              country: input.senderAddress.country,
              postCode: input.senderAddress.postCode
            }
          },
          items: {
            create: input.items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              total: item.total
            }))
          }
        },
        include: {
          clientAddress: true,
          senderAddress: true,
          items: true
        }
      });
      return newInvoice;
    }
  }
};
