const { ObjectId } = require("mongodb")
const {database} = require("../config/mongodb")

class User {
    static collection () {
        return database.collection("users")
    }

    static async getAll () {
        const users = await this.collection().find().toArray()
        return users
    }

    static async addUser(newUser) {
        const users = this.collection()
        const result = await users.insertOne(newUser)
        return result
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