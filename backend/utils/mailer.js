const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationEmail = (to, token) => {
  const link = `http://localhost:3000/verify?token=${token}`;
  return transporter.sendMail({
    from: `"OnsiteHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Xác thực tài khoản",
    html: `
      <p>Chào bạn,</p>
      <p>Vui lòng xác thực tài khoản bằng cách bấm vào link bên dưới:</p>
      <a href="${link}">${link}</a>
    `
  });
};
