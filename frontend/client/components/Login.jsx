

import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../src/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

    console.log(loginInfo,'loginInfo')
 
  const Navigate = useNavigate()
  
  const postData = async () => {
    try {
        if( !loginInfo.email || !loginInfo.password){
          toast.error("Fill all details ")
          return;
        }

        const response = await axios.post('http://localhost:3000/api/auth/login', loginInfo, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
      //const response = await axios.post('http://localhost:3000/api/auth/login', loginInfo);
      const token = response?.headers['auth-token'];

      if (!token) {
        console.error('No token received from server');
        toast.error('Login successful, but no token received. Please try again.');
        return;
      }

      console.log('Response', response
        
      );
      toast.success(response.data.message || 'Login successful!');
      if(response?.headers['auth-token']){
        localStorage.setItem('token', response?.headers['auth-token']);
      }
      // Store the JWT token in localStorage
       
      //const{name,token,}  = response.data;
      console.log('token', response.headers['auth-token']);
      toast.success('Login successful!');
 

       setTimeout(()=>{

        Navigate('/registration');
        
       },2000)
    } catch (error) {
      console.error('Error posting data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Login failed: ${error.response.data.message || 'Unknown error'}`);
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
    setLoginInfo({
      ...loginInfo,
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
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input type='email' name='email' value={loginInfo.email} placeholder='Enter your Email id' onChange={handleChange} />
          </div>
          <div>
          <label>Password</label>
          <input type='password' name='password' value={loginInfo.password} placeholder='Enter your password' onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <span>Don't have an account? <Link to='/registration'>Signup</Link></span>
      <ToastContainer />
    </div>
  );
};

export default Login;