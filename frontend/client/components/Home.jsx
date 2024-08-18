import React, { useEffect,useState } from 'react';
import './Home.css';
import JobCard from './JobCard';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const[isloggedin,setIsloggedin] = useState('');
  const[jobs,setJobs] =useState([])
  const Navigate  = useNavigate();
  console.log(jobs)
  useEffect(()=>{
    setIsloggedin(localStorage.getItem('token'))
   // const token = localStorage.getItem('token')
    //fetchJob()
   },[])


   console.log("jobs",jobs);
const fetchJob = async()=>{

try {
  const token = localStorage.getItem('token');
  console.log('Retrieved Token:', isloggedin);
  
  // if (token) {
  //     const url = 'http://localhost:3000/api/jobs/get-all-jobs';
  //     // const headers = {
  //     //     'auth-token': ` ${token}` // Ensure the correct format
  //     // };
      
  //     // const response = await fetch(url, { headers });
  //     const response = await fetch(url);

      
  //     if (response.ok) {
  //         const result = await response.json();
  //         console.log(result); // Log the result
  //         setJobs(result)
  //     } else if (response.status === 401) {
  //         console.error('Unauthorized: Access Denied');
  //         // This is consistent with the backend's response for invalid/expired token
  //         localStorage.removeItem('token'); // Clear the token
  //         // Optionally, redirect to login
  //     } else {
  //         console.error('Error fetching jobs:', response.statusText);
  //     }
  // } else {
  //     console.log('No token found');
  //     // Optionally redirect to login or prompt user to log in
  // }

  const url = 'http://localhost:3000/api/jobs/get-all-jobs';
  const response = await fetch(url);
  const result = await response.json();
  setJobs(result);

} catch (error) {
  console.error('Error fetching jobs:', error);
}
 
} 

const signOut = ()=>{

  localStorage.removeItem('token');
  Navigate('/login');
}
  
useEffect(()=>{
  fetchJob()
 },[])
 // console.log('token',token)
   
   console.log('isloggedin',isloggedin)
  return (
    <div className="container_home">
      <header className="header">
        <h1 className="logo">Job Portal</h1>
        <div className="auth-buttons">
         
         {isloggedin ? (<button className="signup-button" onClick={signOut}>Logout</button>):(<><Link to='/login'> <button className="login-button">Login</button></Link>
         <Link to='/registration'><button className="signup-button">Sign Up</button></Link> </>)}
        

        </div>
      </header>
        

      
      {jobs.length>0? ( jobs.map((i)=>{
           return <JobCard  key={i._id} id = {i._id} company= {i.companyName}  position = {i.position}  salary = {i.salary}/>

      })):<p>No Jobs Available </p>}


      <footer className="footer">
        <p>© 2024 Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
