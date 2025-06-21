'use client';

import * as React from 'react';
import { ClientError } from 'graphql-request';
import { CreateInvoiceArgs, InvoiceItem } from '@/lib/types';
import { useInvoicesQuery } from '@/app/(home)/_hooks/use-invoices';
import { KeyedMutator } from 'swr';

type Context = {
  isLoading: boolean;
  error: ClientError;
  data: { invoices: InvoiceItem[] } | undefined;
  mutate: (payload: CreateInvoiceArgs, close: () => void) => Promise<void>;
  revalidateInvoices: KeyedMutator<{
    invoices: InvoiceItem[];
  }>;
};

const InvoicesContext = React.createContext<Context | null>(null);

export function InvoiceListProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, error, data, mutate, revalidateInvoices } = useInvoicesQuery();

  return (
    <InvoicesContext.Provider value={{ isLoading, error, data, mutate, revalidateInvoices }}>
      {children}
    </InvoicesContext.Provider>
  );
}

export function useInvoices() {
  const context = React.use(InvoicesContext);
  if (!context) throw new Error('useInvoices must be used within <InvoicesProvider/> component');
  return context;
}
