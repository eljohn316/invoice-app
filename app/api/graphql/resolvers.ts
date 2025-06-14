import { DateResolver } from 'graphql-scalars';
import { GraphQLError } from 'graphql';
import { db } from '@/lib/db';

type Status = 'pending' | 'paid' | 'draft';

export const resolvers = {
  Date: DateResolver,
  Query: {
    invoices: async (_: null, args: { status: Status[] }) => {
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
    invoice: async (_: null, args: { id: string }) => {
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
  }
};
