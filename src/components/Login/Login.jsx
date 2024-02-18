import React, { useState } from 'react'
import Logo from '../../assets/images/logo-main.png'
import { FaGithub, FaGoogle } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const[LoginBtn, setLoginBtn] = useState('Request Otp')

  const handleRequestLoginOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/requestLoginOTP', {email});

      console.log(response.data.message);
      toast.success('OTP Sent Successfully');
      setLoginBtn('Verify Otp');
    } catch (error) {
      console.error('Error requesting login OTP:', error.response.data);
    }
  };
  const handleLoginWithOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/loginWithOTP', {
        email,
        enteredOTP,
      });
      
      console.log('Login response:', response.data);
      setAuthToken(response.data.token);
      toast.success('OTP Verified Successfully');
      setTimeout(()=> {
        navigate('/')
      }, 2000)

      // Further handling of the response, such as storing the token in state or local storage
    } catch (error) {
      console.error('Error during login with OTP:', error.response.data);
      // Handle the error, e.g., display an error message to the user
    }
  };
  // const handleAuth = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', userData);

  //     // Store the token in localStorage or a state variable for future requests
  //     const token = response.data.token;
  //     console.log('Login successful. Token:', token);
  //     toast.success('Login successful. Token:', token);
  //     setAuthToken(token);
  //     navigate('/')
  //   } catch (error) {
  //     console.error('Error during login:', error.response.data);
  //     alert(error.response.data.message);

  //   }


  // }
  return (
    <div>
      <Toaster position="top-center"
        reverseOrder={false} />
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-center items-center min-h-screen flex-col">
            <h1 className="text-2xl font-bold"> Welcome To <span className='text-[#0A5085]'>Schoolify</span></h1>

            <img src={Logo} alt="" />
            <h1 className="text-3xl font-extrabold text-[#0A5085]">Schoolify</h1>
            <p className='text-xl mt-2'>For You</p>
          </div>
          <div className="col bg-[#095085] rounded-tl-3xl rounded-bl-3xl d-flex justify-center items-start min-h-screen flex-col">
            <div className="container">
              <h1 className=" font-bold text-[#47AE6A] text-3xl ml-4">Let's Start</h1>

            
                <label htmlFor="" className='form-label text-white'>Email: </label>
                <input type="email" name="" id="" className='form-control w-full' placeholder='johndoe@schoolify.edu' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p className='mt-2 text-white text-right'>Don't have account? <a href="/" className='underline'>Sign Up</a></p>
                {LoginBtn === 'Verify Otp' ? (
                    <>
                     <label htmlFor="" className='form-label text-white'>Enter Otp: </label>
                <input type="number" name="" id="" className='form-control w-full' value={enteredOTP} onChange={(e) => setEnteredOTP(e.target.value)}/>
                    </>
                ) : ''}
               

                <div className="login-button d-flex justify-center"><button className="p-2 mt-4 bg-[#D9D9D9] rounded w-[100px] font-bold drop-shadow-lg" onClick={LoginBtn === 'Request Otp' ? handleRequestLoginOTP : handleLoginWithOTP}>{LoginBtn}</button></div>
          
            </div>

            <div className="d-flex justify-center mt-4">
              <div className="row">
                <div className="col"><hr className='text-white w-[260px] relative top-[12px]' /></div>
                <div className="col text-white">Or Login With</div>
                <div className="col"><hr className='text-white w-[260px] relative top-[12px]' /></div>
              </div>
            </div>
            <div className="container">
              <div className="login-social-button d-flex justify-center mt-3">
                <button className='p-2 rounded bg-[#D9D9D9] me-2'><FaGithub /></button>
                <button className='p-2 rounded bg-[#D9D9D9]'><FaGoogle /></button>
              </div>
            <Link to={'/'}>  <p className='text-center mt-2 text-white underline'>Go to Home Page</p> </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
