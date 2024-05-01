const Post = require ("../models/post")

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    _id: ID
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Like {
    _id: ID
    username: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getPosts: [Post]
    getPostById(_id: ID): Post
  }

  input newPost {
    content: String
    tags: [String]
    imgUrl: String
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
        },
        getPostById: async (_, args) => {
          const { _id } = args
          const posts = await Post.getPostById(_id)
          return posts
        }
    },
    Mutation: {
        addPost: async (_, args) => {
            const {content, tags, imgUrl} = args.newPost
            const newPost = {content, tags, imgUrl}
    
            const data = await Post.addPost(newPost)
            const result = await Post.getPostById(data.insertedId)
            return result
        },
        deletePost: async (_, args) => {
            const { id } = args
            const result = await Post.deletePost(id)
            return result
          }
    }
}

module.exports = {typeDefs, resolvers}