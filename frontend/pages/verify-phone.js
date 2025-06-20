import { useState } from 'react';
import axios from 'axios';

export default function VerifyPhone() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      axios.post('http://localhost:5000/api/auth/send-otp', { phone })
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || 'Lỗi');
    }
  };

  const verifyOtp = async () => {
    try {
       axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp });
      alert('✅ Xác thực thành công!');
    } catch (err) {
      alert('❌ Sai mã hoặc hết hạn');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      {step === 1 ? (
        <>
          <h2>Nhập số điện thoại</h2>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại" />
          <br />
          <button onClick={sendOtp}>Gửi mã OTP</button>
        </>
      ) : (
        <>
          <h2>Nhập mã OTP</h2>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Mã OTP" />
          <br />
          <button onClick={verifyOtp}>Xác thực</button>
        </>
      )}
    </div>
  );
}
