// import React from 'react'
import { useNavigate } from "react-router"
import "./landingPage.scss"

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="main">
      <div className="nav">
        <h3>interview-master</h3>
        <div className="links">
            <p onClick={()=>navigate('/login')}>login</p>
            <p onClick={()=>navigate('/register')}>register</p>
        </div>
      </div>

      <div className="heading">
        <div className="footer">
        <h5>interview-master: your ai interview coach</h5>
      </div>
        <h1>ace your next interview with AI</h1>
        <h5>Upload your resume, self description, job description. get AI-powered technical questions, behavioural questions, skill gap analysis and a match score in minutes.</h5>
        <button onClick={()=> navigate('/register')}>get started</button>
        <p>built for students & job seekers </p>
      </div>


      
    </div>
  )
}

export default LandingPage
