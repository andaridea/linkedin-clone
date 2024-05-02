const {sign, verify} = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createToken = (payload) => {
    return sign(payload, secret);
}

const verifyToken = (token) => {
    // console.log(token) ini bisa keluar tokennya
    // console.log(secret) ini juga bisa keluar secretnya
    return verify(token, secret)
}



module.exports = { createToken, verifyToken };
