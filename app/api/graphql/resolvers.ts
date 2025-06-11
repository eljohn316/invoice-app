import { db } from '@/lib/db';

type Status = 'pending' | 'paid' | 'draft';

export const resolvers = {
  Query: {
    invoices: async (_: null, args: { status?: Status }) => {
      return await db.invoice.findMany({
        where: {
          status: args.status
        },
        include: {
          clientAddress: true,
          senderAddress: true,
          items: true
        }
      });
    }
  }
};
