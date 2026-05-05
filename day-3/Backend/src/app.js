const express = require("express")
const app = express()
const noteModel = require("./Models/note.model")
const cors = require("cors")

app.use(express.json())
app.use(cors())

/**
 * POST /api/notes
 * to create new note in DB
 */
app.post("/api/notes", async (req, res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        Message: "note created successfully",
        note
    })
})

/**
 * GET /api/notes
 * it fetch all the notes data from mongo DB
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
 * it delete the note by providing id
 */
app.delete("/api/notes/:id", async (req, res)=>{
     const id = req.params.id
     await noteModel.findByIdAndDelete(id)

     res.status(200).json({
        message: "note deleted successfully",
     })
})

/**
 * PATCH /api/notes/:id
 * it use to update title or description or both by giving id
 */
app.patch("/api/notes/:id", async (req, res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app