import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const { Notes, getNotes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "Default" })

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()      //? used to click the launch modal button programmaticaly
        setNote({id:currentNote._id, etitle : currentNote.title , edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleUpdate = () => {
        console.log("updating the note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })   //syntax can be understood using the react developer tools (component) in browser, try to remove "...notes and see what happens in the note object in developer tools"
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch Modal Window
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editing Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label text-start"><h2>Title</h2></label>
                                <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label text-start"><h2>Edit your note</h2></label>
                                <textarea className="form-control" id="edescription" name='edescription' rows="3" onChange={onChange} value={note.edescription}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label text-start"><h4>Tag</h4></label>
                                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={!note.etitle ||
                                !note.edescription || note.etitle.trim().length <5 || note.edescription.trim().length<5 } type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                {Notes.length === 0 && <div className='container'>No notes to display</div>}
                {Notes.map((Notes) => {
                    return <Noteitem key={Notes._id} updateNote={updateNote} note={Notes} />
                })}
            </div>
        </>
    )
}

export default Notes
