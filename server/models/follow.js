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

  static async getFollowById(_id) {
    const follow = [
      {
        $match: {  $or: [{ followerId: new ObjectId(_id) }, { followingId: new ObjectId(_id) }] }
      },

      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "followingDetail"
        }
      },

      {
        $unwind: {
            path: "$followingDetail"
        }
      },

      {
        $project: {
            "followingDetail.password": 0
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "followerDetail"
        }
      },

      {
        $unwind: {
            path: "$followerDetail"
        }
      },

      {
        $project: {
            "followerDetail.password": 0
        }
      },

    ]

    const data = await Follow.collection().aggregate(follow).toArray()
    // console.log(data, "<<<<<<<<<< data di models") dapet data
    
   return data
  }


  static async addFollow(newFollow) {
    const follows = this.collection()
    const data = await follows.insertOne(newFollow)

    const result = await follows.findOne({
      _id: data.insertedId
    })
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
