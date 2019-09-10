import { AuthClient } from '../ApolloClient'
import gql from 'graphql-tag'
import { ApolloQueryResult } from 'apollo-boost'

export interface UserType {
	id: number
	name: string
  email: string
  cpf: string
  birthDate: string
  role: string
}


export function getUser(id: number): Promise<ApolloQueryResult<UserType>> {
	return (
		AuthClient.query({
			query: UsersQuery,
			variables: { id }
		})
	)
}

const UsersQuery = gql`
	query User($id: Int!) {
    User(id: $id) {
      id
      name
      cpf
      birthDate
      email
      role
    }
  }`