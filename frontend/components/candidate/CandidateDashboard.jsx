// components/candidate/CandidateDashboard.jsx
import { useEffect, useState } from 'react';
import { getUserApplications } from '../../services/applicationService';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getUserApplications()
      .then((res) => setApplications(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Việc làm đã ứng tuyển</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.jobTitle} - Trạng thái: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
