// services/jobService.js
import apiClient from './apiClient';

export const fetchJobs = () => apiClient.get('/jobs');

export const fetchJobById = (id) => apiClient.get(`/jobs/${id}`);

export const postJob = (jobData) => apiClient.post('/jobs', jobData);

export const applyToJob = (jobId, resume) =>
  apiClient.post(`/jobs/${jobId}/apply`, { resume });
