// import React from 'react'
import { useRef, useState } from 'react'
import { useInterview } from '../hooks/useInterview'
import '../pages/home.page.scss'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {loading , generateReport} = useInterview()
    const [jobdescribe, setJobdescribe] = useState('')
  const [selfdescribe, setSelfdescribe] = useState('')
  const {user, handleLogout} = useAuth()
  const resumeInputRef = useRef()
  
const navigate = useNavigate()


  const handleGenerateReport = async () =>{
try{
    const resume = resumeInputRef.current.files[0]
    const data = await generateReport({jobdescribe, selfdescribe, resume})
    if(!data) return;
    navigate(`/interview/${data._id}`)
  
}catch(err){
  console.log(err)

}
  }

   if(loading){
      return ( 
        <main> <h1>Loading................</h1></main>
      )
    }



  return (
    <main className='form'>
      <section className='hero-copy'>
       
        <h1 className='hero-title'>Shape your next interview with clarity.</h1>
        <p className='hero-subtitle'>
          Drop in your job description, resume context, and personal pitch to create a polished interview report.
        </p>
      </section>

<div className="resent-reports">
  <div className="user">
  <h2>hello!!  &nbsp; {user.username} &#x2764;</h2>
  <button onClick={handleLogout}> logout </button>
  </div>
  <button className='btn' onClick={() => navigate("/history")}>HISTORY INTERVIEW REPORTS </button>
</div>

     

      <div className='input-group'>
        <label htmlFor='job-description' data-tooltip='Describe the role and expectations'>Job Description</label>
        <textarea name='jobDescription' onChange={(e) => {setJobdescribe(e.target.value)}} id='job-description' placeholder='Enter your job description'></textarea>
      </div>



      
        <div className='input-group'>
          <label htmlFor='resume' data-tooltip='Upload your resume in PDF format'>Upload Resume</label>
          <input ref={resumeInputRef} type='file' name='resume' id='resume' accept='.pdf' />
        </div>

        <div className='input-group'>
          <label htmlFor='self-description' data-tooltip='Share your strengths and story'>Self Description</label>
          <textarea name='selfDescription' onChange={(e) => {setSelfdescribe(e.target.value)}} id='self-description' placeholder='Enter your self description'></textarea>
        </div>

        <button className='btn' type='button' onClick={handleGenerateReport}>
          Generate Interview Report
        </button>


      
      
    </main>
  )
}


export default Home
