const {database} = require("../config/mongodb")

class User {
    static collection () {
        return database.collection("users")
    }

    
}