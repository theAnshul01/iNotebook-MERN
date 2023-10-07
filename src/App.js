import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [delState,] = useState("false")  //! setdelState is to be introduced
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {delState? <Alert/> : ""}    //! should be modified according to the deletion handling from the Noteitem
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
