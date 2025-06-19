import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  enum Status {
    pending
    paid
    draft
  }

  type SenderAddress {
    id: Int!
    street: String
    city: String
    postCode: String
    country: String
  }

  type ClientAddress {
    id: Int!
    street: String
    city: String
    postCode: String
    country: String
  }

  type Item {
    id: Int!
    name: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  type Invoice {
    id: ID!
    createdAt: String
    paymentDue: String
    description: String
    paymentTerms: String
    clientName: String
    clientEmail: String
    status: Status
    total: Float
    senderAddress: SenderAddress
    clientAddress: ClientAddress
    items: [Item]!
  }

  input AddressInput {
    street: String
    city: String
    postCode: String
    country: String
  }

  input ItemInput {
    name: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  input CreateInvoiceInput {
    id: String!
    createdAt: String
    paymentDue: String
    description: String
    paymentTerms: String
    clientName: String
    clientEmail: String
    status: Status
    total: Float
    senderAddress: AddressInput
    clientAddress: AddressInput
    items: [ItemInput]!
  }

  type Query {
    invoices(status: [String]!): [Invoice]!
    invoice(id: ID!): Invoice!
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput): Invoice!
  }
`;
