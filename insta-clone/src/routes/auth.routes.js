const express = require("express");
const authController = require("../controllers/auth.controller")


const authRouter = express.Router();


/**
 * POST /api/auth/register
 * used for creating new users
 */
authRouter.post("/register", authController.registerController)

/**
 * POST /api/auth/login
 * used for login
 */
authRouter.post("/login", authController.loginController)







module.exports = authRouter