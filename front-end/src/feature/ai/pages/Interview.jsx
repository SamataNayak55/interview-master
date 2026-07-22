import { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import "./interview.scss";
import { useParams } from "react-router-dom";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report } = useInterview();
  const {interviewId} = useParams()
  const { getReportById, loading } = useInterview()

    useEffect(() =>{
    if(interviewId){
      getReportById(interviewId)
    }
  },[interviewId])


  if(loading || !report){
    return (
      <main> <h1>loading.......</h1></main>
    )
  }

  // console.log(report)

  // Score color helper logic
  const getScoreClass = (score) => {
    if (score >= 70) return "score--high";
    if (score >= 50) return "score--medium";
    return "score--low";
  };

  // Circular progress stroke-dashoffset calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.matchScore / 100) * circumference;

  return (
    <main className="interview-container">
      {/* LEFT SIDEBAR: Navigation Tabs */}
      <aside className="left-sidebar">
        <button
          className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
          onClick={() => setActiveTab("technical")}
        >
          Technical Questions
        </button>
        <button
          className={`tab-btn ${activeTab === "behavioural" ? "active" : ""}`}
          onClick={() => setActiveTab("behavioural")}
        >
          Behavioural Questions
        </button>
        <button
          className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
          onClick={() => setActiveTab("roadmap")}
        >
          Roadmap
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="main-content">
        <h1 className="job-title">{report.title || "Software Engineer Intern"}</h1>

        <div className="tab-body">
          {/* Technical Questions */}
          {activeTab === "technical" && (
            <div className="questions-list">
              <h2>Technical Questions</h2>
              {report.technicalQuestions?.map((q, idx) => (
                <div key={idx} className="card question-card">
                  <h3>
                    <span>Q{idx + 1}.</span> {q.question}
                  </h3>
                  <p className="intention">
                    <strong>Intention:</strong> {q.intention}
                  </p>
                  <p className="answer">
                    <strong>Suggested Answer:</strong> {q.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Behavioural Questions */}
          {activeTab === "behavioural" && (
            <div className="questions-list">
              <h2>Behavioural Questions</h2>
              {report.behaviouralQuestions?.map((q, idx) => (
                <div key={idx} className="card question-card">
                  <h3>
                    <span>Q{idx + 1}.</span> {q.question}
                  </h3>
                  <p className="intention">
                    <strong>Intention:</strong> {q.intention}
                  </p>
                  <p className="answer">
                    <strong>Suggested Answer:</strong> {q.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Roadmap */}
          {activeTab === "roadmap" && (
            <div className="roadmap-list">
              <h2>7-Day Preparation Roadmap</h2>
              {report.preprationPlan?.map((plan) => (
                <div key={plan.day} className="card roadmap-card">
                  <div className="day-badge">Day {plan.day}</div>
                  <div className="plan-details">
                    <h3>{plan.focus}</h3>
                    <ul>
                      {plan.tasks?.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RIGHT SIDEBAR: Score & Skill Gaps */}
      <aside className="right-sidebar">
        <div className="card score-card">
          <h2>Match Score</h2>
          <div className="circle-chart">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle
                className="circle-bg"
                cx="75"
                cy="75"
                r={radius}
              />
              <circle
                className={`circle-progress ${getScoreClass(report.matchScore)}`}
                cx="75"
                cy="75"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="score-text">{report.matchScore}%</div>
          </div>
        </div>

        <div className="card skill-gap-card">
          <h2>Skill Gap</h2>
          <div className="tags">
            {report.skillGap?.map((item, idx) => (
              <span key={idx} className={`tag severity-${item.severity}`}>
                {item.skill}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Interview;