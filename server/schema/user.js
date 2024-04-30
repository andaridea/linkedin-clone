const User = require("../models/user")

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

  input newUser {
    name: String
    username: String
    email: String
    password: String
  }

  type Mutation {
    addUser(newUser: newUser): User
    deleteUser(id: ID): String
  }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.getAll()
            return users
        }
    },
    Mutation: {
      addUser: async (_, args) => {
        const {name, username, email, password} = args.newUser
        const newUser = {name, username, email, password}

        const result = await User.addUser(newUser)
        newUser._id = result.insertedId 
        return newUser
      },
      deleteUser: async (_, args) => {
        const { id } = args
        const result = await User.deleteUser(id)
        return result
      }
    }
}

module.exports = {typeDefs, resolvers}