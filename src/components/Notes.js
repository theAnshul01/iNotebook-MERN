import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const { Notes, } = useContext(NoteContext);   //! setNotes to be inserted
    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            {Notes.map((Notes) => {
                return <Noteitem key={Notes._id} note={Notes}/>
            })}
        </div>
    )
}

export default Notes