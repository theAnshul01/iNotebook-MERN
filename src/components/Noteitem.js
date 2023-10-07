import React from 'react'

export default function Noteitem(props) {
    const { note } = props;

    return (
        <div className='col-md-3 my-3'> 
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex">
                        <i className="fa-regular fa-pen-to-square"></i>
                        <i className="fa-regular fa-trash-can mx-2"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
