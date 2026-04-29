const express = require("express")

const app = express()
const noteModel = require("./models/notes.model")
app.use(express.json())

/**
 * POST /notes
 * req.body = {title, description}
 */
app.post("/notes", async (req, res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
         title, description
    })

    res.status(201).json({
        message : "note created successfully",
        note
    })
})

module.exports = app;