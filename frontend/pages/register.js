import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      axios.post('http://localhost:5000/api/auth/register', form);
      alert("Đăng ký thành công. Mời bạn đăng nhập.");
      router.push('/login');
    } catch (err) {
      alert("Lỗi đăng ký: " + err.response?.data?.msg || "Lỗi không xác định");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Đăng ký tài khoản</h2>
      <input name="name" placeholder="Họ tên" onChange={handleChange} />
      <br />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} />
      <br />
      <select name="role" onChange={handleChange}>
        <option value="candidate">Ứng viên</option>
        <option value="employer">Công ty</option>
      </select>
      <br /><br />
      <button onClick={handleRegister}>Đăng ký</button>
    </div>
  );
}
