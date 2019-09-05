export const LoginMutation = `
mutation LoginMutation
($email: String!, $password: String!) {
    Login (data: {
        email: $email,
        password: $password
    }) 
    {token}
}`