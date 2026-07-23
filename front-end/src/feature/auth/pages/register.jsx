// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './auth.form.scss'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const{loading, handleRegister} = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    await handleRegister({email, username, name, password})
    console.log("user register successfully")
    console.log("before navigate to home page")
    navigate('/home')
    console.log("after navigate to home page")
    }catch(err){
      console.log("handle register error", err)
    }
  }

  if(loading){
      return ( 
        <main> <h1>Loading................</h1></main>
      )
    }

  return (
    <main>
      {/* Moon */}
      <div className="celestial-moon"></div>
      
      {/* Comets */}
      <div className="comet comet-1"></div>
      <div className="comet comet-2"></div>
      
      {/* Shooting Stars */}
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      
      {/* Nebula/Dust Particles */}
      <div className="nebula"></div>
      
      {/* Star Field - 100+ stars in 3 layers */}
      <div className="stars-1"></div>
      <div className="stars-2"></div>
      <div className="stars-3"></div>
      
      <div className="form-container">
       <div className='head'>
       
        <h1 className='arrow' onClick={()=>navigate('/home')}>&#8592;</h1>
         <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e) => {setEmail(e.target.value)}}
            type="email" id="email" name="email" placeholder="Enter your email "/>

            <label htmlFor="username">Username</label>
            <input 
            onChange={(e) => {setUsername(e.target.value)}}
            type="text" id="username" name="username" placeholder="Enter your username"/>

            <label htmlFor="name">Name</label>
            <input
                        onChange={(e) => {setName(e.target.value)}}
            type="text" id="name" name="name" placeholder="Enter your name"/>

            <label htmlFor="password">Password</label>
            <input
                        onChange={(e) => {setPassword(e.target.value)}}

            type="password" id="password" name="password" placeholder="Enter your password"/>
        </div>
        <button className="btn">Register</button>
                </form>

        <p>Already have an account? <Link id='Link' to="/login">Login</Link></p>

      </div>

    </main>
  )
}

export default Register
