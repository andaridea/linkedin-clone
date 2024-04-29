const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.getAll()
            return users
        }
    }
}