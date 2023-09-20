const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { validationResult, body } = require('express-validator');


// * ROUTE 1: get all notes using: GET"/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})

// * ROUTE 2: Add a new Note using: POST"/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;   // * destructuring concept

        // ! if there are errors return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({                                 //? it returns promise
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})

// * ROUTE 3: Update an existing Note using: PUT"/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {      //* put is used to update some data
    const { title, description, tag } = req.body;
    try {
        // Create a new Note 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // * find the note which is to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }


})

// * ROUTE 4: Deleting an existing Note using: DEL"/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {   
    try {
        // * find the note which is to deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // * Allow deletion ony if user owns this note
        if (note.user.toString() != req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }


})


module.exports = router