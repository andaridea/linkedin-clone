const { ObjectId } = require("mongodb");
const Follow = require("../models/follow")

const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    followingDetail: FollowingDetail
    followerDetail: FollowerDetail
  }

  type FollowingDetail {
    _id: ID
    name: String
    email: String
    username: String
  }

  type FollowerDetail {
    _id: ID
    name: String
    email: String
    username: String
  }

  type Query {
    getFollows: [Follow]
    getFollowById(_id: ID): [Follow]
  }

  input newFollow {
    followingId: ID
  }

  type Mutation {
    addFollow(newFollow: newFollow): Follow
    deleteFollow(id: ID): String
  }
`;

const resolvers = {
  Query: {
    getFollows: async () => {
      const follows = await Follow.getFollows()
      return follows
    },
    getFollowById: async (_, args, contectValue) => {
      const payload = await contectValue.authentication()
      const { _id } = args
      const follows = await Follow.getFollowById(_id)
      return follows
    }
  },
  Mutation: {
    addFollow: async (_, args, contectValue) => {
      const payload = await contectValue.authentication()
      const followerId = payload._id
      let { followingId } = args.newFollow
      followingId = new ObjectId(followingId)
      const newFollow = {
        followerId,
        followingId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const follows = await Follow.addFollow(newFollow)
      return follows;
    },
    deleteFollow: async (_, args) => {
      const { id } = args
      const result = await Follow.deleteFollow(id)
      return result
    }
  }
}

module.exports = { typeDefs, resolvers }