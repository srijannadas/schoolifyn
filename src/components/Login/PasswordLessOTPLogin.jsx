import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PasswordlessOTPLoginForm = () => {
  const [email, setEmail] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const handleRequestLoginOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/requestLoginOTP', {
        email,
      });

      console.log(response.data.message);
      setVerificationStatus('OTP sent successfully');
    } catch (error) {
      console.error('Error requesting login OTP:', error.response.data);
      setVerificationStatus('Error requesting login OTP');
      
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
      navigate('/')

      // Further handling of the response, such as storing the token in state or local storage
    } catch (error) {
      console.error('Error during login with OTP:', error.response.data);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={handleRequestLoginOTP}>Request OTP</button>

      <p>{verificationStatus}</p>

      <label>
        Enter OTP:
        <input type="text" value={enteredOTP} onChange={(e) => setEnteredOTP(e.target.value)} />
      </label>
      <button onClick={handleLoginWithOTP}>Login with OTP</button>
    </div>
  );
};

export default PasswordlessOTPLoginForm;
