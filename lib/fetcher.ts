import { client } from '@/lib/graphql-client';
import { RequestDocument } from 'graphql-request';

type FetcherArgs = [RequestDocument, Record<PropertyKey, string>];

export const fetcher = ([query, variables]: FetcherArgs) => client.request(query, variables);
