import { useState } from "react";
import { NoteContext } from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "650733d53b6c54d07e2d2b70",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        },
        {
            "_id": "650733d53b6c54d07e2d2b71",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        },
        {
            "_id": "650733d53b6c54d07e2d2b72",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        },
        {
            "_id": "650733d53b6c54d07e2d2b73",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        }, {
            "_id": "650733d53b6c54d07e2d2b74",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        }, {
            "_id": "650733d53b6c54d07e2d2b75",
            "user": "65072d63e3eeb886c0898e83",
            "title": "first note updated",
            "description": "first note description updated",
            "tag": "miscellaneous",
            "date": "2023-09-17T17:13:57.561Z",
            "__v": 0
        }
    ]
    const [Notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{Notes, setNotes}}> 
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;