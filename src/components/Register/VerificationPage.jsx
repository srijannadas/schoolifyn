import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('Verifying your account...');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/verify/${token}`);
        setVerificationStatus(response.data.message);
      } catch (error) {
        setVerificationStatus(error.response.data.message);
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <div>
      <h2>Verification Page</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerificationPage;
