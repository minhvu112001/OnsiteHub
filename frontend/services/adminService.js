// services/adminService.js
import apiClient from './apiClient';

export const getAllUsers = () => {
  return apiClient.get('/admin/users');
};

export const deleteUser = (userId) => {
  return apiClient.delete(`/admin/users/${userId}`);
};

export const reviewJobPosting = (jobId, status) => {
  return apiClient.patch(`/admin/jobs/${jobId}/review`, { status });
};
