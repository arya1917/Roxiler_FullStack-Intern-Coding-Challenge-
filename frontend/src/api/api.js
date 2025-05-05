import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

// Admin
export const getAdminStats = () => API.get('/admin/stats');
export const getAllUsers = () => API.get('/admin/users');
export const getAllStores = () => API.get('/admin/stores');

export const deleteUser = (id) => API.delete(`/admin/user/${id}`);
export const deleteStore = (id) => API.delete(`/admin/store/${id}`);

// Owner
export const getRatings = () => API.get('/owner/ratings');

// User
export const getStores = () => API.get('/user/stores');
export const submitRating = (storeId, rating) => API.post(`/user/stores/${storeId}/rate`, { rating });

export default API;
