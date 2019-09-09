import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getToken } from './TokenStorage'

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  const token: string|null = await getToken()
  return {
    headers: { authorization: token ? token : '' }
  }
});

export const Client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});