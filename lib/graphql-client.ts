import { GraphQLClient } from 'graphql-request';

const endpoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/graphql'
    : 'https://invoice-app-fem.vercel.app/api/graphql';

export const client = new GraphQLClient(endpoint);
