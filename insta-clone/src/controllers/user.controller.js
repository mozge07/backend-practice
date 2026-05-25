const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

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

module.exports = {
  followUserController,
};
