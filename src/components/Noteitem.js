import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import Badge from './Badge';

export default function Noteitem(props) {
    const { note, updateNote } = props;
    const { deleteNote } = useContext(NoteContext); 

    return (
        <div className='col-md-3 my-3 mx-3'> 
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <Badge tag={note.tag}/>
                    <div className="d-flex">
                        <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
