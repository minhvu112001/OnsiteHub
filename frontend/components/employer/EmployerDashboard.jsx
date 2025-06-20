// components/employer/EmployerDashboard.jsx
import { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/jobService';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJobs(res.data.filter(job => job.ownedByCurrentUser)))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Bài đăng tuyển dụng của bạn</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
