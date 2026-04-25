/**
 * server create karna
 * server ko config karna
 */

const express = require("express");
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res)=>{
    notes.push(req.body)
    res.status(201).json({
        message : "note created succesfully"
    })
    
})

app.get("/notes", (req, res)=>{
    res.status(201).json({
        notes : notes
    })
})

app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]
    res.status(200).send("note deleted")
})

app.patch("/notes/:index", (req, res)=>{
    notes[req.params.index].content = req.body.content
    res.status(200).send("updated successfull")
})

module.exports = app;