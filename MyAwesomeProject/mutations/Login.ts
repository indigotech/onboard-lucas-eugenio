import { Client } from "../ApolloClient";
import { gql } from 'apollo-boost'

export interface LoginInput {
    email: string
    password: string
    remmemberMe?: boolean
}

export function clientLogin(data: LoginInput) {
    return (
        Client.mutate({
            mutation: gql(LoginMutation),
            variables: {LoginInput: data}})
    )
}
const LoginMutation = `
    mutation LoginMutation ($LoginInput: LoginInput!) {
        Login (data: $LoginInput) {
            token
        }
    }`

