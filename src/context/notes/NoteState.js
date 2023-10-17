import { useState } from "react";
import { NoteContext } from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [Notes, setNotes] = useState(notesInitial);

    // Fetch all notes
    const getNotes = async()=>{
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNzJkNjNlM2VlYjg4NmMwODk4ZTgzIn0sImlhdCI6MTY5NDk2OTE4N30.Vr_dgvxfhkRgyrt7QNOKG21VaMK73vS6xM9h-1JLqLc"
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }
    // Add a note
    const addNote = async (title, description, tag) => {
        // * API Call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNzJkNjNlM2VlYjg4NmMwODk4ZTgzIn0sImlhdCI6MTY5NDk2OTE4N30.Vr_dgvxfhkRgyrt7QNOKG21VaMK73vS6xM9h-1JLqLc"
            },
            body: JSON.stringify({title, description, tag}),
        });
        console.log(response)
        // logic to add a note on client side
        console.log("adding a new note")
        const note = {
            "_id": "650733d53b6c54d07e2d2b76",
            "user": "65072d63e3eeb886c0898e83",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        };
        setNotes(Notes.concat(note))
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        //* API Call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNzJkNjNlM2VlYjg4NmMwODk4ZTgzIn0sImlhdCI6MTY5NDk2OTE4N30.Vr_dgvxfhkRgyrt7QNOKG21VaMK73vS6xM9h-1JLqLc"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json =  response.json();
        console.log(json)

    
        // logic to edit on client side
        const editedNotes = Notes.map((note) => {
            if (note._id === id) {
                return { ...note, title: title, description: description, tag: tag }
            }
            return note
        })
        setNotes(editedNotes)
    }
    // Delete a note
    const deleteNote = async (id) => {
        // *API call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNzJkNjNlM2VlYjg4NmMwODk4ZTgzIn0sImlhdCI6MTY5NDk2OTE4N30.Vr_dgvxfhkRgyrt7QNOKG21VaMK73vS6xM9h-1JLqLc"
            },
        });
        const json = response.json();
        console.log(json)

        console.log("deleting note with id: " + id)
        const newNotes = Notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ Notes, addNote, editNote, deleteNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;