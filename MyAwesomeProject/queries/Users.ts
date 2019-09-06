import { Client } from '../ApolloClient'
import { usersPerPage } from '../components/UserList'
import gql from 'graphql-tag'
import { ApolloQueryResult } from 'apollo-boost'

interface Users {
    nodes: [{
        id: number
        name: string
        email: string
    }]
    pageInfo: {
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
}

export function getUsersPromise(offset: number): Promise<ApolloQueryResult<Users>> {
    return (
        Client.query({
            query: gql(UsersQuery),
            variables: {offset: offset, limit: usersPerPage}
        })
    )
}

const UsersQuery = `
    query GetUsers ($offset: Int, $limit: Int) {
        Users (offset: $offset, limit: $limit){
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
    }  
`