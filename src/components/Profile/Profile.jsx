import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [enable2FA, setEnable2FA] = useState(false);
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if 2FA is enabled for the user on component mount
    check2FAStatus();
  }, []);

  const check2FAStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/is-2fa-enabled/${Cookies.get('userID')}`);
      setEnable2FA(response.data.is2FAEnabled);
    } catch (error) {
      console.error('Error checking 2FA status:', error.response.data);
    }
  };

  const handleEnable2FA = async () => {
    try {
      const response = await axios.post('http://localhost:5000/profile/enable-2fa', {
        userId: Cookies.get('userID'), // Replace with the actual user ID
        enable2FA,
      });

      if (enable2FA) {
        // Display the secret and QR code for the user to scan
        setSecret(response.data.secret);
        setMessage('Scan the QR code with your authenticator app');
      } else {
        setMessage('2FA disabled successfully');
      }
    } catch (error) {
      console.error('2FA error:', error.response.data);
      setMessage('Error enabling/disabling 2FA');
    }
  };

  const handleGenerateOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/profile/generate-otp', {
        userId: Cookies.get('userID'), // Replace with the actual user ID
      });

      // Display the new OTP to the user
      setMessage(`New OTP: ${response.data.otp}`);
    } catch (error) {
      console.error('Error generating OTP:', error.response.data);
      setMessage('Error generating OTP');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile Page</h2>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="enable2FA"
          checked={enable2FA}
          onChange={() => setEnable2FA(!enable2FA)}
        />
        <label className="form-check-label" htmlFor="enable2FA">
          Enable 2FA
        </label>
      </div>
      <button className="btn btn-primary mr-2" onClick={handleEnable2FA}>
        Enable/Disable 2FA
      </button>
      <button className="btn btn-secondary" onClick={handleGenerateOTP}>
        Generate New OTP
      </button>
      <p className="mt-3">{message}</p>
      {enable2FA && (
        <img
          src={`https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${encodeURIComponent(secret)}`}
          alt="QR Code"
          className="img-thumbnail mt-3"
        />
      )}
    </div>
  );
};

export default ProfilePage;
