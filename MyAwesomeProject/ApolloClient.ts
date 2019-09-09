import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getToken, localGetToken } from './TokenStorage'
import { Navigation } from 'react-native-navigation';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  let token: string = await getToken()
  if (!token) { token = localGetToken() }
  if (!token) { Navigation.setRoot({root:{component:{name: 'Login'}}})}
  return {
    headers: { authorization: token ? token : '' }
  }
})

export const AuthClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export const LoginClient = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache()
})