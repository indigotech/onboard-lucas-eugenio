import { Client } from "../ApolloClient"
import { gql, FetchResult } from 'apollo-boost'

export interface LoginInput {
	email: string
	password: string
	rememberMe?: boolean
}

export function UserLogin(data: LoginInput) {
	return (
		Client.mutate<Promise<FetchResult<string>>, { data: LoginInput }>({
			mutation: LoginMutation,
			variables: { data }})
	)
}

const LoginMutation = gql`
	mutation LoginMutation($data: LoginInput!) {
		Login (data: $data) {
			token
		}
	}`