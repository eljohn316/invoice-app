import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/api/graphql';

export const client = new GraphQLClient(endpoint);
