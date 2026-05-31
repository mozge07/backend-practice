const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @description use to follow user
 * @access Private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followRequestController,
);

/**
 * @route POST /api/users/unfollow/:username
 * @description use to unfollow user
 * @access Private
 */
userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);

module.exports = userRouter;
