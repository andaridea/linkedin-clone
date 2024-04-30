const Post = require ("../models/post")

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
    getPosts: [Post]
  }

  input newPost {
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
  }

  type Mutation {
    addPost(newPost: newPost): Post
    deletePost(id: ID): String
  }
`;

const resolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.getAll()
            return posts
        }
    },
    Mutation: {
        addPost: async (_, args) => {
            const {content, tags, imgUrl, authorId} = args.newPost
            const newPost = {content, tags, imgUrl, authorId}
    
            const result = await Post.addPost(newPost)
            newPost._id = result.insertedId 
            return newPost
        },
        deletePost: async (_, args) => {
            const { id } = args
            const result = await Post.deletePost(id)
            return result
          }
    }
}

module.exports = {typeDefs, resolvers}