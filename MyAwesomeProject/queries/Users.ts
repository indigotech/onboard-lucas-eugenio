import { Client } from '../ApolloClient'
import gql from 'graphql-tag';

export function getUsersPromise() {
    return (
        Client.query({
            query: gql(UsersQuery)
        })
    )
}

const UsersQuery = `
    query GetUsers {
        Users {
            nodes {
                name
                email
            } 
        }
    }  
`