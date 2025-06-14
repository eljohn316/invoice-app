'use client';

import * as React from 'react';
import { ClientError } from 'graphql-request';
import { InvoiceItems } from '@/app/(home)/_types/invoice';
import { useInvoicesQuery } from '@/app/(home)/_hooks/use-invoices';

type Context = {
  isLoading: boolean;
  error: ClientError;
  data: { invoices: InvoiceItems } | undefined;
};

const InvoicesContext = React.createContext<Context | null>(null);

export function InvoicesProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, error, data } = useInvoicesQuery();

  return (
    <InvoicesContext.Provider value={{ isLoading, error, data }}>
      {children}
    </InvoicesContext.Provider>
  );
}

export function useInvoices() {
  const context = React.use(InvoicesContext);
  if (!context) throw new Error('useInvoices must be used within <InvoicesProvider/> component');
  return context;
}
