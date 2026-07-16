// import React from 'react'
import '../pages/home.page.scss'

const Home = () => {
  return (
    <main className='form'>
      <section className='hero-copy'>
        <p className='eyebrow'>AI Interview Studio</p>
        <h1 className='hero-title'>Shape your next interview with clarity.</h1>
        <p className='hero-subtitle'>
          Drop in your job description, resume context, and personal pitch to create a polished interview report.
        </p>
      </section>

      <div className='input-group'>
        <label htmlFor='job-description' data-tooltip='Describe the role and expectations'>Job Description</label>
        <textarea name='jobDescription' id='job-description' placeholder='Enter your job description'></textarea>
      </div>

      <div className='right'>
        <div className='input-group'>
          <label htmlFor='resume' data-tooltip='Upload your resume in PDF or DOC format'>Upload Resume</label>
          <input type='file' name='resume' id='resume' accept='.pdf, .doc' />
        </div>

        <div className='input-group'>
          <label htmlFor='self-description' data-tooltip='Share your strengths and story'>Self Description</label>
          <textarea name='selfDescription' id='self-description' placeholder='Enter your self description'></textarea>
        </div>

        <button className='btn' type='button'>
          Generate Interview Report
        </button>
      </div>
    </main>
  )
}

export default Home
