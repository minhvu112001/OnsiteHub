import React from 'react';

export default function OAuthButtons() {
  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
      <a href="http://localhost:5000/api/auth/google">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Đăng nhập bằng Google
        </button>
      </a>

      <a href="http://localhost:5000/api/auth/linkedin">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Đăng nhập bằng LinkedIn
        </button>
      </a>
    </div>
  );
}
