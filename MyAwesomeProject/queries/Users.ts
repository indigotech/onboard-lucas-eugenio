import { Client } from '../ApolloClient'
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

export function getUsersPromise(offset: number, limit: number): Promise<ApolloQueryResult<Users>> {
    return (
        Client.query({
            query: gql(UsersQuery),
            variables: {offset: offset, limit: limit}
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