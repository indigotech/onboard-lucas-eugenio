import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getTokenOnMemory, getTokenLocal } from './TokenStorage'
import { goToLogin } from './Screens'

const httpLink = createHttpLink({ uri: 'https://tq-template-server-sample.herokuapp.com/graphql' })

const authLink = setContext(async (_, { headers }) => {
  const token: string = (await getTokenOnMemory()) || getTokenLocal();
  if (!token) { goToLogin() }
  return {
    headers: { authorization: token ? token : '' }
  }
})

export const AuthClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export const Client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache()
})