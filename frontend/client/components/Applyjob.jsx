


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Applyjob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [applyJob, setApplyJob] = useState(null);

  const fetchApplyJob = async () => {
    try {
      const token = localStorage.getItem('token'); // Changed from getItems to getItem
      const url = `http://localhost:3000/api/jobs/protected/get/${id}`;
      const headers = {
        'auth-token': token
      };

      if (token) {
        const response = await axios.get(url, { headers });
        
        if (response.status === 200) {
          const data = response.data;
          console.log("data",data); // Log the result
          setApplyJob(data);
        } else if (response.status === 401) {
          console.error('Unauthorized: Access Denied');
          localStorage.removeItem('token'); // Clear the token
          navigate('/login');
        } else {
          console.error('Error fetching jobs:', response.statusText);
        }
      } else {
        console.log('No token found');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchApplyJob();
  }, [id]); // Added id as a dependency

  console.log("ApplyJob", applyJob);

  if (!applyJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Apply for Job</h1>
      <div>
        <h2>{applyJob.position}</h2>
        <p>Company: {applyJob.companyName}</p>
        <p>Salary: ${applyJob.salary}</p>
        <p>Job Type: {applyJob.jobType}</p>
        <p>Remote: {applyJob.remote ? 'Yes' : 'No'}</p>
        <p>Description: {applyJob.description}</p>
        <p>About: {applyJob.about}</p>
        <h3>Required Skills:</h3>
        <ul>
          {applyJob.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <p>Additional Information: {applyJob.information}</p>
      </div>
    </div>
  );
};

export default Applyjob;