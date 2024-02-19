const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserFind = require('./models/User');
const speakeasy = require('speakeasy');
const { authenticator } = require('otplib');

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
      subject: 'Schoolify Registration OTP',
      html: `
      <html>
      <head>
      <meta name="description" content="Your preview text goes here"/>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:100px;overflow:hidden;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img src="https://res.cloudinary.com/dhex06aa8/image/upload/v1708277594/schoolify/b2lfoebgjaeet71ga8jm.png" width="30px" height="30px"/> Schoolify</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Schoolify. Use the following OTP to complete your Registration procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Schoolify</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Schoolify Inc</p>
        </div>
      </div>
    </div>
    </body>
  `,
    };

  
  
    await transporter.sendMail(mailOptions);
  };
  const sendLoginOTPByEmail = async (email, otp) => {
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
      subject: 'Schoolify Login OTP',
      html: `
      <html>
      <head>
      <meta name="description" content="Your preview text goes here"/>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:100px;overflow:hidden;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img src="https://res.cloudinary.com/dhex06aa8/image/upload/v1708277594/schoolify/b2lfoebgjaeet71ga8jm.png" width="30px" height="30px"/> Schoolify</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Schoolify. Use the following OTP to complete your Login procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Schoolify</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Schoolify Inc</p>
        </div>
      </div>
    </div>
    </body>
  `,
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
      // Generate 2FA secret key
    const secret = speakeasy.generateSecret({ length: 20 });
    newUser.twoFactorSecret = secret.base32;
    await newUser.save();
  
      // Send OTP to the user via email
      await sendOTPByEmail(newUser.email, otp);
       // Generate a JSON Web Token (JWT) for the newly registered user
    const token = jwt.sign({ userId: newUser._id, userName: newUser.fullName }, 'your-secret-key');
  
      res.status(201).json({ message: 'User registered successfully', userId: newUser._id, token });
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
      await sendLoginOTPByEmail(user.email, otp);
  
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
        const userID = user._id;
        res.status(200).json({ token, userID});
      } else {
        res.status(401).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/login2FA', async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or OTP' });
      }
  
      // Check if the provided OTP matches the user's stored OTP
      if (user.otp !== otp) {
        return res.status(401).json({ message: 'Invalid email or OTP' });
      }
  
      // Check if 2FA is enabled for the user
      if (user.twoFactorSecret) {
        // If 2FA is enabled, verify the TOTP code
        const is2FAValid = speakeasy.totp.verify({
          secret: user.twoFactorSecret,
          encoding: 'base32',
          token: otp,
        });
  
        if (!is2FAValid) {
          return res.status(401).json({ message: 'Invalid email, OTP, or 2FA code' });
        }
      }
  
      // Check any other conditions before proceeding with login, if needed
      // ...
  
      // Generate and send a JSON Web Token (JWT) upon successful login
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key');
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/profile/enable-2fa', async (req, res) => {
    try {
      const { userId, enable2FA } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (enable2FA) {
        // Enable 2FA: Generate secret and return it to the client
        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFactorSecret = secret.base32;
        await user.save();
  
        res.status(200).json({ secret: secret.otpauth_url });
      } else {
        // Disable 2FA
        user.twoFactorSecret = undefined;
        await user.save();
  
        res.status(200).json({ message: '2FA disabled successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to check if 2FA is enabled for a user
  router.get('/profile/is-2fa-enabled/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ is2FAEnabled: !!user.twoFactorSecret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to generate a new OTP for 2FA
  router.post('/profile/generate-otp', async (req, res) => {
    try {
      const { userId } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.twoFactorSecret) {
        return res.status(400).json({ message: '2FA is not enabled for this user' });
      }
  
      // Generate a new OTP
      const otp = authenticator.generate(user.twoFactorSecret);
  
      res.status(200).json({ otp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  return router;
};

      // pass: 'ysqwtrissjpakjwf',