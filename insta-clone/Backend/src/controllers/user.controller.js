const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followRequestController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (followerUsername == followeeUsername) {
    return res.status(400).json({
      message: "you cannot follow yourself",
    });
  }

  const isAlreadyRequested = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyRequested) {
    return res.status(400).json({
      message: `you have already ${isAlreadyRequested.status}`,
    });
  }

  const request = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: "follow request send",
    request,
  });
}

/** to unfollow user */

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserfollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserfollowing) {
    return res.status(200).json({
      message: `you are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserfollowing._id);

  res.status(201).json({
    message: `you have unfollowed ${followeeUsername}`,
  });
}

async function acceptFollowRequestController(req, res) {}

module.exports = {
  followRequestController,
  unfollowUserController,
};
