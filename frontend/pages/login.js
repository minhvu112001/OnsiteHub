import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res =  axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      alert(`Xin chào ${res.data.user.name} (${res.data.user.role})`);
    } catch (err) {
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}
