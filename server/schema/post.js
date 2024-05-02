const Post = require ("../models/post")
const User = require("../models/user")

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
    author: Author
  }

  type Author {
    _id: ID
    username: String
    name: String
    email: String
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
    getPostById(_id: ID): [Post]
  }

  input newPost {
    content: String
    tags: [String]
    imgUrl: String
  }

  input newComment {
    _id: ID
    content: String
    username: String
  }

  input newLike {
    _id: ID
    username: String
  }

  type Mutation {
    addPost(newPost: newPost): Post
    addComment(newComment: newComment): Comment
    likePost(newLike: newLike): Like
    deletePost(id: ID): String
  }
`;

const resolvers = {
    Query: {
        getPosts: async (_, args, contextValue) => {
            const payload = await contextValue.authentication()
            const posts = await Post.getAll()
            return posts
        },
        getPostById: async (_, args, contextValue) => {
          const payload = await contextValue.authentication()
          const { _id } = args
          const posts = await Post.getPostById(_id)
          return posts
        }
    },
    Mutation: {
        addPost: async (_, args, contextValue) => {
            const payload = await contextValue.authentication()
            const {content, tags, imgUrl} = args.newPost
            if (!content) {
              throw new Error("Content cannot be empty!")
            }
            const newPost = {
              content, 
              tags, 
              imgUrl,
              }
            
            const data = await Post.addPost(newPost, payload)
            return data
        },
        addComment: async (_, args, contextValue) => {
          const payload = await contextValue.authentication()
          const {content, username} = args.newComment

          if (!content) {
            throw new Error ("Content cannot be empty")
          }

          if (!username) {
            throw new Error ("You must login first")
          }
          const newComment = {content, username}

          const result = await Post.addComment(newComment, payload)

          return result
        },
        likePost: async (_, args) => {
          const payload = await contextValue.authentication()
          const {_id, username} = args.newLike

          if (!username) {
            throw new Error ("You must login first")
          }
          const newLike = {_id, username}

          const result = await Post.likePost(newLike, payload)

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