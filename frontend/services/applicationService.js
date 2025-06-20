// services/applicationService.js
import apiClient from './apiClient';

export const applyToJob = (jobId, applicationData) => {
  return apiClient.post(`/jobs/${jobId}/apply`, applicationData);
};

export const getUserApplications = () => {
  return apiClient.get('/applications/me');
};

export const getApplicantsForJob = (jobId) => {
  return apiClient.get(`/jobs/${jobId}/applicants`);
};
