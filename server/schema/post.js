const typeDefs = `#graphql
  type User {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: Date
    updatedAt: Date
  }

  type Comment {
    _id: ID
    content: String
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Like {
    _id: ID
    username: String
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