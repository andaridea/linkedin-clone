const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class Post {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        const posts = Post.collection().aggregate([
            {
                $lookup:
                {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind:
                {
                    path: "$author"
                }
            },
            {
                $project:
                {
                    "author.password": 0
                }
            },
            {
                $sort:
                {
                    createdAt: -1
                }

            }
        ]).toArray()
        return posts
    }

    static async getPostById(_id) {
        const posts = [
            {
                $match: { _id: new ObjectId(_id) }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind:
                {
                    path: "$author"
                }
            },
            {
                $project:
                {
                    "author.password": 0
                }
            },
        ]

        const result = await Post.collection().aggregate(posts).toArray()
        return result
    }

    static async addPost(newPost, payload) {
        const posts = this.collection()
        const { content, tags, imgUrl } = newPost
        const data = await posts.insertOne({
            content,
            imgUrl,
            tags,
            likes: [],
            comments: [],
            authorId: payload._id,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result = await posts.findOne({
            _id: data.insertedId
        })
        return result
    }

    static async addComment(newComment, payload) {
        const posts = this.collection()
        const { _id, content } = newComment

        const result = await posts.updateOne(
            { _id: new ObjectId(String(_id)) },
            {
                $push: {
                    comments: {
                        username: payload.username,
                        content: content,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            }
        )
        if (result.modifiedCount === 1) {
            const updatedPost = await posts.findOne({ _id: new ObjectId(String(_id)) });
            return updatedPost;
        }
    }

    static async likePost(newLike, payload) {
        const posts = this.collection()
        const { _id } = newLike

        const result = await posts.updateOne(
            { _id: new ObjectId(String(_id)) },
            {
                $push: {
                    likes: {
                        username: payload.username,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            }
        )
        if (result.modifiedCount === 1) {
            const updatedPost = await posts.findOne({ _id: new ObjectId(String(_id)) });
            return updatedPost;
        }
    }

    static async deletePost(id) {
        const posts = this.collection()
        const result = await posts.deleteOne({ _id: new ObjectId(String(id)) })
        if (result.deletedCount === 1) {
            return "Successfully deleted post"
        } else {
            throw new Error(
                "No document match the query!"
            )
        }
    }
}

module.exports = Post