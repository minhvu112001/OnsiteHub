// components/Dashboard.jsx
import CandidateDashboard from './candidate/CandidateDashboard';
import EmployerDashboard from './employer/EmployerDashboard';
import AdminDashboard from './admin/AdminDashboard';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  switch (user.role) {
    case 'candidate':
      return <CandidateDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <p>Không xác định vai trò.</p>;
  }
}
