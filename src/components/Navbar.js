import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(location);
    }, [location]);

    const [theme, setTheme] = useState('light');
    const handleDarkMode = ()=>{
        if(theme === 'light'){
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            setTheme('dark')
        }else{
            document.documentElement.setAttribute('data-bs-theme', 'light');
            setTheme('light')
        }
    }

    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={handleDarkMode} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                        </div>

                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                        </form>: <button className='btn btn-primary mx-2' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
