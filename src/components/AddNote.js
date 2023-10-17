import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import { useState } from 'react';

const AddNote = () => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAdding = () => {
        addNote(note.title, note.description, note.tag)
        setNote({ id: "", title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })   //syntax can be understood using the react developer tools (component) in browser, try to remove "...notes and see what happens in the note object in developer tools"
    }
    return (
        <div className="container my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label text-start"><h2>Title</h2></label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Add your title here" value={note.title} autoFocus />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label text-start"><h2>Description</h2><span>(Atleast 5 characters)</span></label>
                <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange} placeholder="Add your note here" value={note.description}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label text-start"><h4>Tag</h4></label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="Specify the tag" value={note.tag} />
            </div>
            <button disabled={!note.title ||
                !note.description || note.title.trim().length < 5 || note.description.trim().length < 5} type="submit" className="btn btn-primary" onClick={handleAdding}>Add Note</button>
        </div>
    )
}

export default AddNote
