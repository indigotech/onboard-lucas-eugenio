import ApolloClient, { gql, FetchResult } from 'apollo-boost'

export const Client = new ApolloClient({uri: 'https://tq-template-server-sample.herokuapp.com/graphql'})