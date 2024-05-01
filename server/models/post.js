const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class Post {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        const posts = await this.collection().find().sort({ createdAt: -1 }).toArray()
        return posts
    }

    static async getPostById(_id) {
        const posts = this.collection()
        const result = await posts.findOne({
            _id: new ObjectId(String(_id))
        })
        return result
    }

    static async searchUsers(query) {
        const users = this.collection()
        const regexQuery = new RegExp(query, 'i')
        const searchResult = await users.find({
            $or: [{name: regexQuery}, {username: regexQuery}]
        }).toArray()
        return searchResult
    }

    static async addPost(newPost) {
        const posts = this.collection()
        const data = await posts.insertOne({
            ...newPost,
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result = await posts.findOne({
            _id: data.insertedId
        })
        return result
    }

    static async addComment(newComment) {
        const posts = this.collection()
        const { _id, username, content } = newComment

        const result = await posts.updateOne(
            { _id: new ObjectId(String(_id)) },
            {
                $push: {
                    comments: {
                        username: username,
                        content: content,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            }
        )
        if (result.modifiedCount === 1) {
            const updatedPost = await posts.findOne({ _id: new ObjectId(String(_id)) });
            return updatedPost;
        }
    }

    static async likePost (newLike) {
        const posts = this.collection()
        const { _id, username } = newLike

        const result = await posts.updateOne(
            { _id: new ObjectId(String(_id)) },
            {
                $push: {
                    likes: {
                        username: username,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            }
        )
         if (result.modifiedCount === 1) {
            const updatedPost = await posts.findOne({ _id: new ObjectId(String(_id)) });
            return updatedPost;
        }
    }

    static async deletePost(id) {
        const posts = this.collection()
        const result = await posts.deleteOne({ _id: new ObjectId(String(id)) })
        if (result.deletedCount === 1) {
            return "Successfully deleted post"
        } else {
            throw new Error(
                "No document match the query!"
            )
        }
    }
}

module.exports = Post