const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isOTPVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
  loginOTP: {
    type: Number, // Assuming OTP is a 6-digit number
  },
  twoFactorSecret: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
