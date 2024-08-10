

import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../src/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    name: '',
    phone: '',
    password: ''
  });
 
  const Navigate = useNavigate()
  
  const postData = async () => {
    try {
        if(!signupInfo.name || !signupInfo.email || !signupInfo.password || !signupInfo.phone){
          toast.error("Fill all details ")
          return;
        }
      const response = await axios.post('http://localhost:3000/api/auth/register', signupInfo);
      console.log('Data posted:', response.data);
      toast.success('Registration successful!');
       setTimeout(()=>{

        Navigate('/login');
        
       },2000)
    } catch (error) {
      console.error('Error posting data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Error setting up the request. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div>
          <label>Email</label>
          <input type='email' name='email' value={signupInfo.email} placeholder='Enter your Email id' onChange={handleChange} />
        </div>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={signupInfo.name} placeholder='Enter your Name' onChange={handleChange} />
        </div>
        <div>
          <label>Phone</label>
          <input type='tel' name='phone' value={signupInfo.phone} placeholder='Enter your Phone' onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' value={signupInfo.password} placeholder='Enter your password' onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <span>Already have an account? <Link to='/login'>Login</Link></span>
      <ToastContainer />
    </div>
  );
};

export default Registration;