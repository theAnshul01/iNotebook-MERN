import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import { useState } from 'react';

const AddNote = () => {
    const {addNote} = useContext(NoteContext); 
    const [note, setNote] = useState({title:"", description:"", tag:"default"})
    
    const handleAdding = ()=>{
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})   //syntax can be understood using the react developer tools (component) in browser, try to remove "...notes and see what happens in the note object in developer tools"
    }
    return (
        <div className="container my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label text-start"><h2>Title</h2></label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Add your title here" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label text-start"><h2>Add your note</h2></label>
                <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange} placeholder="Add your note here"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleAdding}>Add Note</button>
        </div>
    )
}

export default AddNote
