const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserFind = require('./models/User');

module.exports = (User) => {

  const sendOTPByEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'krupesh123vithlani@gmail.com', // Your Gmail email address
        pass: 'ysqwtrissjpakjwf', // Your Gmail email password (use App Password if 2-factor authentication is enabled)
      },
    });
  
    const mailOptions = {
      from: 'krupesh123vithlani@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for registration is: ${otp}`,
    };

  
  
    await transporter.sendMail(mailOptions);
  };
  
  router.post('/register', async (req, res) => {
    try {
      const { fullName, email } = req.body;
  
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      const newUser = new User({
        fullName,
        email,
        otp,
      });
  
      await newUser.save();
  
      // Send OTP to the user via email
      await sendOTPByEmail(newUser.email, otp);
  
      res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/verifyOTP', async (req, res) => {
    try {
      const { userId, enteredOTP } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if entered OTP matches the saved OTP
      if (user.otp === enteredOTP) {
        // OTP is valid, you can update user status or perform any other actions
        user.isOTPVerified = true;
        await user.save();
  
        res.status(200).json({ message: 'OTP verified successfully.' });
      } else {
        res.status(400).json({ message: 'Invalid OTP.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the user's OTP is verified
      if (!user.isOTPVerified) {
        return res.status(401).json({ message: 'OTP not verified. Please complete the OTP verification process.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate and send a JSON Web Token (JWT) upon successful login
      const token = jwt.sign({ userId: user._id, userName: user.fullName }, 'your-secret-key'); // Replace 'your-secret-key' with a secret key for signing the token
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/requestLoginOTP', async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a random 6-digit OTP and store it in the user document
      const otp = Math.floor(100000 + Math.random() * 900000);
      user.loginOTP = otp;
      await user.save();
  
      // Send the OTP via email
      await sendOTPByEmail(user.email, otp);
  
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/loginWithOTP', async (req, res) => {
    try {
      const { email, enteredOTP } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the entered OTP matches the stored OTP
      if (user.loginOTP === parseInt(enteredOTP)) {
        // Clear the OTP after successful login
        user.loginOTP = undefined;
        await user.save();
  
        // Generate and send a JSON Web Token (JWT) upon successful login
        const token = jwt.sign({ userId: user._id, userName: user.fullName }, 'your-secret-key'); // Replace 'your-secret-key' with a secret key for signing the token
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  return router;
};

      // pass: 'ysqwtrissjpakjwf',