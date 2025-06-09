import { PrismaClient } from '@/generated/prisma';

const invoice = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'paid',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom'
  },
  clientAddress: {
    street: '106 Kendell Street',
    city: 'Sharrington',
    postCode: 'NR24 5WQ',
    country: 'United Kingdom'
  },
  items: [
    {
      name: 'Brand Guidelines',
      quantity: 1,
      price: 1800.9,
      total: 1800.9
    }
  ],
  total: 1800.9
};

const prisma = new PrismaClient();

async function main() {
  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        id: invoice.id,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        createdAt: new Date(invoice.createdAt),
        paymentDue: new Date(invoice.paymentDue),
        paymentTerms: invoice.paymentTerms,
        description: invoice.description,
        total: invoice.total,
        clientAddress: {
          create: {
            street: '106 Kendell Street',
            city: 'Sharrington',
            country: 'NR24 5WQ',
            postCode: 'United Kingdom'
          }
        },
        senderAddress: {
          create: {
            street: '19 Union Terrace',
            city: 'London',
            country: 'United Kingdom',
            postCode: 'E1 3EZ'
          }
        },
        status: 'paid',
        items: {
          create: [
            {
              name: 'Brand Guidelines',
              quantity: 1,
              price: 1800.9,
              total: 1800.9
            }
          ]
        }
      }
    });

    console.log(`Invoice successfully created`, newInvoice.id);
  } catch (error) {
    console.log(error);
  }
}

main();
