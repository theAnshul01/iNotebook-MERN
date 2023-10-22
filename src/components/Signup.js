import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json)
    if(json.authToken){
      localStorage.setItem('token', json.authToken)
      navigate('/')
      props.showAlert("Account created successfully", "success")
    }else{
      props.showAlert("Invalid credentials" , "danger")
    }
      
    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  return (
    <div>
      <h3 className='container'>User Signup</h3>
      <form className='container my-3' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" required  />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary" >Signup</button>
      </form>
    </div>
  )
}

export default Signup
