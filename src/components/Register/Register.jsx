import React,{useState} from 'react'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast, {Toaster} from 'react-hot-toast';
import Logo from '../../assets/images/logo-main.png'
import axios from "axios";


const Register = () => {

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: ''
      })
      const [userId, setUserId] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/register',userData);

      console.log(response.data.message);
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error during registration:', error.response.data);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verifyOTP', { userId, enteredOTP });
      setVerificationStatus(response.data.message);
    } catch (error) {
      console.error('Error verifying OTP:', error.response.data);
    }
  };
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
              <label htmlFor="" className='form-label text-white'>Full Name: </label>
             <input type="text" className='form-control w-full' value={userData.fullName} name='fullName' onChange={(e)=> setUserData({...userData, fullName: e.target.value})}/>
              <label htmlFor="" className='form-label text-white'>Email: </label>
              <input type="email" name="" id="" className='form-control w-full' placeholder='johndoe@schoolify.edu' value={userData.email} onChange={(e)=> setUserData({...userData, email: e.target.value})} />
              <label htmlFor="" className='form-label text-white'>Password: </label>
              <input type="password" name="" id="" className='form-control w-full' value={userData.password} onChange={(e)=> setUserData({...userData, password: e.target.value})}/>
              <div className="login-button d-flex justify-center mt-3"><button className="p-2 bg-[#D9D9D9] rounded w-[100px] font-bold drop-shadow-lg" onClick={handleRegister}>Register</button></div>
            </form>

            {userId && (
        <div>
          <label>
            Entered OTP:
            <input type="text" value={enteredOTP} onChange={(e) => setEnteredOTP(e.target.value)} />
          </label>
          <button onClick={handleVerifyOTP}>Verify OTP</button>
          <p>{verificationStatus}</p>
        </div>
      )}
          </div>

          <div className="d-flex justify-center mt-4">
            <div className="row">
              <div className="col"><hr className='text-white w-[250px] relative top-[12px]' /></div>
              <div className="col text-white">Or Reigster With</div>
              <div className="col"><hr className='text-white w-[220px] relative top-[12px]' /></div>
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

export default Register
