import gql from 'graphql-tag';

export const INVOICES_QUERY = gql`
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

export const INVOICE_QUERY = gql`
  query Invoice($invoiceId: ID!) {
    invoice(id: $invoiceId) {
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
