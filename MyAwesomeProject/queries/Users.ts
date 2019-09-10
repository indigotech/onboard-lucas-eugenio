import { AuthClient } from '../ApolloClient'
import gql from 'graphql-tag'
import { ApolloQueryResult } from 'apollo-boost'

interface Users {
  nodes: UserPresenter[]
  pageInfo: PageInfo
}

export interface UserPresenter {
	id: number
	name: string
	email: string
}

interface PageInfo {
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export function getUsers(offset: number, limit: number): Promise<ApolloQueryResult<Users>> {
	return (
		AuthClient.query({
			query: UsersQuery,
			variables: {offset: offset, limit: limit}
		})
	)
}

const UsersQuery = gql`
	query GetUsers ($offset: Int, $limit: Int) {
		Users (offset: $offset, limit: $limit) {
			nodes {
					id
					name
					email
			}
			pageInfo {
					hasNextPage
					hasPreviousPage
				}
		}
	}`