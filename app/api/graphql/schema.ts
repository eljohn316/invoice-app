import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

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
    createdAt: DateTime
    paymentDue: DateTime
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
    id: ID
    name: String!
    quantity: Int!
    price: Float!
    total: Float!
  }

  input CreateInvoiceInput {
    id: String!
    createdAt: DateTime
    paymentDue: DateTime
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

  input UpdateInvoiceInput {
    createdAt: DateTime
    paymentDue: DateTime
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
    updateInvoice(id: ID!, input: UpdateInvoiceInput): Invoice!
    deleteInvoice(id: ID!): Invoice!
  }
`;
