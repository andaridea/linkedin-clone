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

  input newComment {
    _id: ID
    content: String
  }

  input newLike {
    _id: ID
    username: String
  }

  type Mutation {
    addPost(newPost: newPost): Post
    addComment(newComment: newComment): Comment
    likepost(newLike: newLike): Like
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
            const {content, tags, imgUrl, authorId} = args.newPost
            if (!content) {
              throw new Error("Content cannot be empty!")
            }
            const newPost = {content, tags, imgUrl, authorId}
            
            const data = await Post.addPost(newPost)
            const result = await Post.getPostById(data.insertedId)
            return result
        },
        addComment: async (_, args) => {
          const {content, _id} = args.newComment
          const newComment = {content, _id}

          const result = await Post.newComment(newComment)

          return result
        },
        likePost: async (_, args) => {
          const {_id, username} = args.newLike
          const newLike = {_id, username}

          const result = await Post.likePost(newLike)

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