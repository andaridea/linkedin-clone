const Follow = require ("../models/follow")

const typeDefs = `#graphql
  type User {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Query {
    getFollows: [User]
  }

  input newFollow {
    followingId: ID
  }

  type Mutation {
    addFollow(newFollow: newFollow): [User]
    deleteFollow(id: ID): String
  }
`;

const resolvers = {
    Query: {
        getFollows: async () => {
            const follows = await Follow.getFollows()
            return follows
        }
    },
    Mutation: {
        addFollow: async (_, args, contectValue) => {
            const payload = await contectValue.authentication()
            const followerId = payload._id
            const {followingId} = args.newFollow
            const newFollow = {followingId, followerId}   
    
            await Follow.addFollow(newFollow)
            const follows = await Follow.getFollowsById(followerId);
            return follows;
        },
        deleteFollow: async (_, args) => {
            const { id } = args
            const result = await Follow.deleteFollow(id)
            return result
          }
    }
}

module.exports = {typeDefs, resolvers}