import { DateResolver } from 'graphql-scalars';
import { GraphQLError } from 'graphql';
import { db } from '@/lib/db';
import { CreateInvoiceArgs, UpdateInvoiceArgs } from '@/lib/types';

type Status = 'pending' | 'paid' | 'draft';

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
    createInvoice: async (_: undefined, { input }: { input: CreateInvoiceArgs }) => {
      const newInvoice = await db.invoice.create({
        data: {
          id: input.id,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          createdAt: input.createdAt,
          paymentDue: input.paymentDue,
          paymentTerms: input.paymentTerms,
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
    },
    updateInvoice: async (
      _: undefined,
      { id, input }: { id: string; input: UpdateInvoiceArgs }
    ) => {
      const newInvoice = await db.invoice.update({
        where: {
          id
        },
        data: {
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          createdAt: input.createdAt,
          paymentDue: input.paymentDue,
          paymentTerms: input.paymentTerms,
          description: input.description,
          status: input.status,
          total: input.total,
          clientAddress: {
            update: {
              street: input.clientAddress.street,
              city: input.clientAddress.city,
              country: input.clientAddress.country,
              postCode: input.clientAddress.postCode
            }
          },
          senderAddress: {
            update: {
              street: input.senderAddress.street,
              city: input.senderAddress.city,
              country: input.senderAddress.country,
              postCode: input.senderAddress.postCode
            }
          },
          items: {
            update: input.items.map(({ id, name, price, quantity, total }) => ({
              data: { name, price, quantity, total },
              where: { id: +id }
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
