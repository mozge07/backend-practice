const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

/**
 * POST /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email })

    if(isUserExist){
        return res.status(409)
        .json({
            message: "user is already exist with this email"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("token", token)

    res.status(201)
    .json({
        message: "user created successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", async (req, res)=>{

    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

/**
 * POST /api/auth/log-in
 */
authRouter.post("/log-in", async (req, res)=>{
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn:"1h"})

    res.json({
        message: "user loged in"
    })

})





module.exports = authRouter