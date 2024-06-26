const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class User {
    static collection () {
        return database.collection("users")
    }

    static async getAll () {
        const users = await this.collection().find().toArray()
        return users
    }

    static async getUserById (_id) {
        const users = this.collection()
        const result = await users.findOne({
            _id: new ObjectId(String(_id))
        })
        return result
    }

    static async register(newUser) {
        const users = this.collection()
        const result = await users.insertOne(newUser)
        return result
    }

    static async findByEmail (email) {
        const users = this.collection()
        const result = await users.findOne({
            email
        })
        return result
    }

    static async findByUsername (username) {
        const users = this.collection()
        const result = await users.findOne({
            username
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

    static async deleteUser(id) {
        const users = this.collection()
        const result = await users.deleteOne({ _id: new ObjectId(String(id)) })
        if (result.deletedCount === 1){
            return "Successfully deleted user"
        } else {
            throw new Error (
                "No document match the query!"
            )
        }
    }
}
module.exports = User