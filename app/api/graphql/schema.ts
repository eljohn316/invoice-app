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
    createdAt: Date!
    paymentDue: Date
    description: String
    paymentTerms: Int
    clientName: String
    clientEmail: String
    status: Status
    total: Float
    senderAddress: SenderAddress
    clientAddress: ClientAddress
    items: [Item]!
  }

  type Query {
    invoices(status: [String]!): [Invoice]!
    invoice(id: ID!): Invoice!
  }
`;
