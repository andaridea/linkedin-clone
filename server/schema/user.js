const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/user")
const Follow = require("../models/follow")

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Token {
    access_token: String
  }

  type Query {
    getUsers: [User]
    getUserById(_id: ID): User
    searchUsers(criteria: searchInput): [User]
  }

  input newUser {
    name: String
    username: String
    email: String
    password: String
  }

  input Login {
    email: String
    password: String
  }

  input searchInput {
    name: String
    username: String
  }

  type Mutation {
    register(newUser: newUser): User
    login(input: Login) : Token
    deleteUser(id: ID): String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.getAll()
      return users
    },

    getUserById: async (_, args, contextValue) => {
      const payload = await contextValue.authentication()
      const { _id } = args
      const user = await User.getUserById(_id)
      if (!user) {
        throw new Error("User not found");
      }

      const following = await Follow.getFollowingForUser(_id);
      const followers = await Follow.getFollowersForUser(_id);
  
      user.following = following;
      user.followers = followers;

      return user
    },

    searchUsers: async (_, args, contextValue) => {
      const payload = await contextValue.authentication()
      const {name, username} = args.criteria

      const users = await User.find({
        $or: [
          {name: {regex: name, $options: 'i'} },
          {username: {regex: username, $options: 'i'} }
        ]
      })
      return users
    }
  },
  Mutation: {
    register: async (_, args) => {
      const { name, username, email, password } = args.newUser
      // validasi required
      if (!username) {
        throw new Error("Username is required")
      }
      if (!email) {
        throw new Error("Email is required")
      }
      if (!password) {
        throw new Error("Password is required")
      }
      //validasi password length
      if (password.length < 5) {
        throw new Error("Password minimal 5 characters!");
      }

      //validasi uniq
      const existingEmail = await User.findByEmail(email)
      if (existingEmail) {
        throw new Error("Email is already registered")
      }

      const existingUsername = await User.findByUsername(username)
      if (existingUsername) {
        throw new Error("Username is already registered")
      }
      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password)
      }
      const result = await User.register(newUser)
      newUser._id = result.insertedId
      return newUser
    },
    login: async (_, args) => {
      const { email, password } = args.input
      const user = await User.findByEmail(email)
      if (!user) {
        throw new Error("Invalid email/password")
      }

      const isPasswordValid = comparePassword(password, user.password)
      if (!isPasswordValid) {
        throw new Error("Invalid email/password")
      }

      const access_token = createToken({
        _id: user._id,
        email: user.email
      })

      return {
        access_token,
        email
      }
    },
    deleteUser: async (_, args) => {
      const { id } = args
      const result = await User.deleteUser(id)
      return result
    }
  }
}

module.exports = { typeDefs, resolvers }