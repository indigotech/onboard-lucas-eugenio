import { Client } from '../ApolloClient'
import { usersPerPage } from '../components/UserList'
import gql from 'graphql-tag';

export function getUsersPromise(offset: number) {
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