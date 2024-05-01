const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class Post {
    static collection () {
        return database.collection("posts")
    }

    static async getAll () {
        const posts = await this.collection().find().sort({ createdAt: -1 }).toArray()
        return posts
    }

    static async getPostById (_id) {
        const posts = this.collection()
        const result = await posts.findOne({
            _id: new ObjectId(String(_id))
        })
        return result
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
        const result = await Post.posts.findOne({
            _id: data.insertedId
        })
        return result
    }


    static async deletePost(id) {
        const posts = this.collection()
        const result = await posts.deleteOne({ _id: new ObjectId(String(id)) })
        if (result.deletedCount === 1){
            return "Successfully deleted post"
        } else {
            throw new Error (
                "No document match the query!"
            )
        }
    }
}

module.exports = Post