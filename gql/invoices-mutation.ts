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

export const UPDATE_INVOICE_MUTATION = gql`
  mutation Mutation($updateInvoiceId: ID!, $input: UpdateInvoiceInput) {
    updateInvoice(id: $updateInvoiceId, input: $input) {
      id
      createdAt
      paymentDue
      description
      paymentTerms
      clientName
      clientEmail
      status
      total
      senderAddress {
        street
        city
        postCode
        country
      }
      clientAddress {
        street
        city
        postCode
        country
      }
      items {
        id
        name
        quantity
        price
        total
      }
    }
  }
`;
