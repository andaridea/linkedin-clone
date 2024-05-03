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

  static async getFollowsById(_id) {
    const aggr = await this.collection().aggregate([
      { $match: { followerId: _id } },
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          "userDetails.name": 1,
          "userDetails.username": 1,
          "userDetails.email": 1,
          "userDetails.password": 1,
          "userDetails.createdAt": 1,
          "userDetails.updatedAt": 1
        }
      }
    ]).toArray()

    return aggr
  }

  static async getFollowersForUser(_id) {
    const follows = this.collection();
    const followers = await follows.aggregate([
      {
        $match: { followingId: new ObjectId(_id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $unwind: "$followers",
      },
      {
        $project: {
          _id: "$followers._id",
          name: "$followers.name",
          username: "$followers.username",
          email: "$followers.email",
        },
      },
    ]).toArray();
    return followers;
  }

  static async getFollowingForUser(_id) {
    const follows = this.collection();
    const following = await follows.aggregate([
      {
        $match: { followerId: new ObjectId(_id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $unwind: "$following",
      },
      {
        $project: {
          _id: "$following._id",
          name: "$following.name",
          username: "$following.username",
          email: "$following.email",
        },
      },
    ]).toArray();
    return following;
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
