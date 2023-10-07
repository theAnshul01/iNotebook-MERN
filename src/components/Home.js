import React from 'react';
import Notes from './Notes';

export default function Home() {
  
  return (
    <>
      <div className="container my-3">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label text-start"><h2>Your Name</h2></label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Anshul Porwal" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label text-start"><h2>Add your note</h2></label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      <Notes/>

    </>
  )
}
