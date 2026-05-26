const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/** to follow user */
async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isUerExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isUerExist) {
    return res.status(404).json({
      message: "there is no user with username ",
    });
  }

  const isAlreadyFollowed = await followModel.findOne({
    followee: followeeUsername,

    follower: followerUsername,
  });

  if (isAlreadyFollowed) {
    return res.status(400).json({
      message: `you are already following ${followeeUsername}`,

      follow: isAlreadyFollowed,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now Following ${followeeUsername}`,
    follow: followRecord,
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

module.exports = {
  followUserController,
  unfollowUserController,
};
