import React, { useState } from 'react'
import Logo from '../../assets/images/logo-main.png'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast, {Toaster} from 'react-hot-toast';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleAuth = (e) => {
    e.preventDefault();
    if(userData.email === "johndoe@schoolify.edu" && userData.password === "johndoe"){
      toast('Welcome! ' + userData.email, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
    else{
      toast.error('Something Went Wrong!')
    }
  }
  return (
    <div>
      <Toaster position="top-center"
  reverseOrder={false}/>
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

              <form action="" className='ml-4 mt-3'>
                <label htmlFor="" className='form-label text-white'>Email: </label>
                <input type="email" name="" id="" className='form-control w-full' placeholder='johndoe@schoolify.edu' value={userData.email} onChange={(e)=> setUserData({...userData, email: e.target.value})}/>
                <p className='mt-2 text-white text-right'>Don't have account? <a href="/" className='underline'>Sign Up</a></p>
                <label htmlFor="" className='form-label text-white'>Password: </label>
                <input type="password" name="" id="" className='form-control w-full' value={userData.password} onChange={(e)=> setUserData({...userData, password: e.target.value})}/>
                <p className='mt-2 text-white text-right'> <a href="/" className='underline'>Forgot Password?</a></p>
                <div className="login-button d-flex justify-center"><button className="p-2 bg-[#D9D9D9] rounded w-[100px] font-bold drop-shadow-lg" onClick={handleAuth}>Login</button></div>
              </form>
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
              <button className='p-2 rounded bg-[#D9D9D9] me-2'><FaFacebook /></button>
              <button className='p-2 rounded bg-[#D9D9D9]'><FaGoogle /></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
