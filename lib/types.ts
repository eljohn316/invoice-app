type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type Item = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Status = 'paid' | 'draft' | 'pending';

export type InvoiceItem = {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: Status;
};

export type InvoiceDetails = {
  id: string;
  description: string;
  createdAt: string;
  paymentDue: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: Status;
  total: number;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
};

export type CreateInvoiceArgs = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: Status;
  senderAddress: Address;
  clientAddress: Address;
  items: Omit<Item, 'id'>[];
  total: number;
};

export type UpdateInvoiceArgs = {
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: Status;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
};
