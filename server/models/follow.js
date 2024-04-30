const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class Follow {
    static collection() {
        return database.collection("follows")
    }

    static async getAll() {
        const follows = await this.collection().find().toArray()
        return follows
    }

    static async addFollow(newFollow) {
        const follows = this.collection()
        const result = await follows.insertOne(newFollow)
        return result
    }

    static async deleteFollow(id) {
        const follows = this.collection()
        const result = await follows.deleteOne({ _id: new ObjectId(String(id)) })
        if (result.deletedCount === 1) {
            return "Successfully deleted follow"
        } else {
            throw new Error("No document match the query!")
        }
    }
}

module.exports = Follow
