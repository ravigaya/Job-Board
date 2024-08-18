import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({id,company,position,salary}) => {
  const Navigate = useNavigate()
 const applyJob = (JobId)=>{
    Navigate(`/applyjob/${JobId}`)

   // console.log("apply job id",JobId)
 }

  return (
    <div>
      <main className="job-description">
        <h2>{company}</h2>
        <div className="job-details">
          <div className="detail-item">
            <strong>Job Role:</strong> {position}
          </div>
          <div className="detail-item">
            <strong>Salary:</strong> {salary}
          </div>
          <button onClick={()=>applyJob(id)}>Apply</button>
        </div>
      </main>
    </div>
  )
}

export default JobCard
