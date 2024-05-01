const {hashSync, compareSync} = require ('bcryptjs')

module.exports = {
    hashPassword : (password) => hashSync(password),
    comparePassword : (passwordInput, passwordDB) => {
        return compareSync (passwordInput, passwordDB) 
        }

}