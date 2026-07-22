// import React from 'react'
import './auth.form.scss'
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

const {loading, handleLogin} = useAuth()
const navigate = useNavigate()

const[email, setEmail] = useState("")
const[password, setPassword] = useState("")


    const handleSubmit = async(e) => {
      e.preventDefault()
      try{
      await handleLogin({email, password})
      console.log("before navigating to home page")
      navigate('/home')
      console.log("after navigating to home page")
    
  }catch(err){
    console.log("handle login error", err)
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
        <h1 className='arrow' onClick={()=>navigate('/')}>&#8592;</h1>
        <h1>Login</h1>
        </div>
<form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e) =>{setEmail(e.target.value)}}
            type="email" id="email" name="email" placeholder="Enter your email "/>

            <label htmlFor="password">Password</label>
            <input 
            onChange={(e) => {setPassword(e.target.value)}}
            type="password" id="password" name="password" placeholder="Enter your password"/>
        </div>
        <button className="btn"  >Login</button>
        </form>
        <p>Don't have an account? <Link id='Link' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login