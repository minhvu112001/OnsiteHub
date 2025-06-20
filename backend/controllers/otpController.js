const User = require('../models/User');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ msg: 'Không tìm thấy người dùng với số này' });

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  await client.messages.create({
    body: `Mã OTP OnsiteHub của bạn là: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  res.json({ msg: 'OTP đã được gửi' });
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
    return res.status(400).json({ msg: 'OTP không hợp lệ hoặc đã hết hạn' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ msg: 'Xác thực thành công' });
};
