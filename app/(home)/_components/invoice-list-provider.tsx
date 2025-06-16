'use client';

import * as React from 'react';
import { ClientError } from 'graphql-request';
import { InvoiceItems } from '@/app/(home)/_types/invoice';
import { useInvoicesQuery } from '@/app/(home)/_hooks/use-invoices';
import { KeyedMutator } from 'swr';

type Context = {
  isLoading: boolean;
  error: ClientError;
  data: { invoices: InvoiceItems } | undefined;
  mutate: KeyedMutator<{ invoices: InvoiceItems }>;
};

const InvoicesContext = React.createContext<Context | null>(null);

export function InvoiceListProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, error, data, mutate } = useInvoicesQuery();

  return (
    <InvoicesContext.Provider value={{ isLoading, error, data, mutate }}>
      {children}
    </InvoicesContext.Provider>
  );
}

export function useInvoices() {
  const context = React.use(InvoicesContext);
  if (!context) throw new Error('useInvoices must be used within <InvoicesProvider/> component');
  return context;
}
