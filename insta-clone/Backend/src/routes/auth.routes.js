const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middleware/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description used for creating new users
 */
authRouter.post("/register", authController.registerController);

/**
 * @route POST /api/auth/login
 * @description used for login
 */
authRouter.post("/login", authController.loginController);

/**
 * @route /api/auth/get-me
 * @description used get all data from loged in user
 * @access private
 */
authRouter.get("/getme", identifyUser, authController.getMeController);

module.exports = authRouter;
