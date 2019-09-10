import { Client } from "../ApolloClient"
import { gql, FetchResult } from 'apollo-boost'

export interface UserInput {
  name: string
  email: string
  password: string
  cpf: string
  birthDate: string
  role: string
}

export function RegisterNewUser(data: UserInput) {
  return (
    Client.mutate<Promise<FetchResult<string>>, { data: UserInput }>({
      mutation: NewUserMutation,
      variables: { data }})
  )
}

const NewUserMutation = gql`
  mutation NewUser ($data: UserInput!) {
    UserCreate (data: $data) {
      id
    }
  }`