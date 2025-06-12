import gql from 'graphql-tag';

export const InvoicesQuery = gql`
  query Invoices($status: [String]!) {
    invoices(status: $status) {
      id
      paymentDue
      clientName
      total
      status
    }
  }
`;
