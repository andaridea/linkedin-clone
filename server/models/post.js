const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class Post {
    static collection () {
        return database.collection("posts")
    }

    static async getAll () {
        const posts = await this.collection().find().toArray()
        return posts
    }

    static async addPost(newPost) {
        const posts = this.collection()
        const result = await posts.insertOne(newPost)
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