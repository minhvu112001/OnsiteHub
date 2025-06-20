import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Verify() {
  const router = useRouter();
  const [message, setMessage] = useState("Đang xác thực...");

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      axios.post(`http://localhost:5000/api/auth/verify/${token}`)
        .then(res => setMessage(res.data))
        .catch(err => setMessage("❌ Xác thực thất bại hoặc token đã hết hạn"));
    }
  }, [router.query]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', paddingTop: 50 }}>
      <h2>{message}</h2>
    </div>
  );
}
