const Follow = require ("../models/follow")

const typeDefs = `#graphql
  type User {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getFollows: [Follow]
  }

  input newFollow {
    followingId: ID
    followerId: ID
  }

  type Mutation {
    addFollow(newFollow: newFollow): Follow
    deleteFollow(id: ID): String
  }
`;

const resolvers = {
    Query: {
        getFollows: async () => {
            const follows = await Follow.getAll()
            return follows
        }
    },
    Mutation: {
        addFollow: async (_, args) => {
            const {followingId, followerId} = args.newFollow
            const newFollow = {followingId, followerId}
    
            const result = await Follow.addFollow(newFollow)
            newFollow._id = result.insertedId 
            return newFollow
        },
        deleteFollow: async (_, args) => {
            const { id } = args
            const result = await Follow.deleteFollow(id)
            return result
          }
    }
}

module.exports = {typeDefs, resolvers}