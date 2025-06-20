// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
  isVerified: { type: Boolean, default: false },
  googleId: String,
  linkedinId: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
