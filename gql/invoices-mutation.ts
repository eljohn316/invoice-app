import { gql } from 'graphql-request';

export const CREATE_INVOICE_MUTATION = gql`
  mutation Mutation($input: CreateInvoiceInput) {
    createInvoice(input: $input) {
      id
      paymentDue
      clientName
      total
      status
    }
  }
`;
