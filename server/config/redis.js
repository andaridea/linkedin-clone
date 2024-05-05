const Redis = require("ioredis")
const redis = new Redis ({
    port: 19617,
    host: "redis-19617.c1.asia-northeast1-1.gce.redns.redis-cloud.com",
    password: process.env.REDIS_PASSWORD
})
module.exports = redis