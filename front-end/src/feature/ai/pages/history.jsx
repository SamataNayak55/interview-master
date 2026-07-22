// import React from 'react'
import { useNavigate } from "react-router"
import { useAuth } from "../../auth/hooks/useAuth" 
import { useInterview } from "../hooks/useInterview"
import '../pages/history.scss'
// import '../pages/home.page.scss'

const History = () => {

    const {reports,deleteReport,reportDelete} = useInterview()
    const {user,handleLogout} = useAuth()
    const navigate = useNavigate()
  return (

    <div className="main">
        
          <div className="user">
            <h2>hello!!  &nbsp; {user.username} &#x2764;</h2>
            <h7 className='report-btn' onClick={handleLogout}> logout </h7>
            </div>

       <div className="reports">
        <h2>resent interview reports::</h2>

        <ul className='report-list'>
          {reports.map((report) =>{
            return (
              <li key={report._id} className='report-item' >
                <p onClick={() => navigate(`/interview/${report._id}`)}>{report.title ? `${report.title}`: 'my-report'}</p>
                <p>Match Score: {report.matchScore}%</p>
                <p>created at : {report.createdAt}</p>
                <h7 className="report-btn" onClick={() => deleteReport(report._id)}>{reportDelete ? 'Deleting..' : 'Delete'}</h7>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default History
