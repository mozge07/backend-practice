const express = require("express")
const noteModel = require("./Models/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))


/**
 * POST /api/notes
 * use to create new note in DB
 */
app.post("/api/notes", async (req, res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

/**
 * GET /api/notes
 * use to fetch data from note in DB
 */
app.get("/api/notes", async (req, res)=>{

    const note = await noteModel.find()

    res.status(200).json({
        message: "note fetched successfully",
        note
    })
})

/**
 * DELETE /api/notes/:id
 * used to delete the note provided through id
 */
app.delete("/api/notes/:id", async (req, res)=>{
    const id = req.params.id
    
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted successfully"
    })
})

/**
 * PATCH /api/notes/:id
 * use to update a single or more entity present in note through id
 */
app.patch("/api/notes/:id",async (req, res)=>{
    const {description} = req.body

    const id = req.params.id

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})

/**
 * "*name" handle every other api call other than these 4 above and give res
 */
app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname,"..","/Public/index.html"))
})




module.exports = app