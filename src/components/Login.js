import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json)
        if(json.authToken){
            // save the authotoken and redirect 
            localStorage.setItem('token', json.authToken)
            navigate("/")
        }else{
            alert("invalid credentials")
        }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] :e.target.value})
    }

    return (
        <form className='container my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    )
}

export default Login
