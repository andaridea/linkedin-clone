require("dotenv").config()
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone')
const { verifyToken } = require("../helpers/jwt")
const User = require("../models/user")
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("../schema/user")
const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("../schema/post")
const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("../schema/follow")
const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});


startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({ req, res }) => {
    // console.log("masuk ke context")
    // console.log(req.headers.authorization, "<<<<<<<")
    return {
      authentication: async () => {
        if (!req.headers.authorization) {
          throw new Error("Invalid Token")
        }
        // console.log(req.headers.authorization, "<<<<<<<<")
        const [type, token] = req.headers.authorization.split(" ")
        if (type !== "Bearer") {
          throw new Error("Invalid Token")
        }
        const payload = verifyToken(token)
        // console.log(payload, "<<<<<<<<<")
        const user = await User.getUserById(payload._id)
        return user
      }
    }
  }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
})