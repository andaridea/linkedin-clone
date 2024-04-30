const typeDefs = `#graphql
  type User {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Query {
   
  }

  type Mutation {
   
  }
`;

const resolvers = {
    Query: {
        
    },
    Mutation: {
      
    }
}

module.exports = {typeDefs, resolvers}