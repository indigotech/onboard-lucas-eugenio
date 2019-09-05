import { Client } from "../ApolloClient"
import { gql, FetchResult } from 'apollo-boost'
import { resolve } from "url";

export interface LoginInput {
    email: string
    password: string
    remmemberMe?: boolean
}

export function clientLogin(data: LoginInput) {
    return (
        Client.mutate<Promise<FetchResult<string>>, { data: LoginInput }>({
            mutation: gql(LoginMutation),
            variables: { data }})
    )
}

const LoginMutation = `
    mutation LoginMutation($data: LoginInput!) {
        Login (data: $data) {
            token
        }
    }`