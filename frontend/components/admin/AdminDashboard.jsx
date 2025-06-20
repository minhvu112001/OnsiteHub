// components/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/adminService';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
