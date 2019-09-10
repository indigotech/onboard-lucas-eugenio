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
            mutation: gql(NewUserMutation),
            variables: { data }})
    )
}

const NewUserMutation = `
    mutation NewUser ($data: UserInput!) {
        UserCreate (data: $data) {
            id
        }
    } 
`