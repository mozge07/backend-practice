const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description use to follow user
 * @access Private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

module.exports = userRouter;
