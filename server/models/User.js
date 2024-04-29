const {database} = require("../config/mongodb")

class User {
    static collection () {
        return database.collection("users")
    }

    static async getAll () {
        const users = await this.collection().find().toArray()
        return users
    }

    static async addBook(newUser) {
        const users = this.collection()
        const result = await users.insertOne(newUser)
        return result
    }
}
module.exports = User