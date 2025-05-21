import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      '/users/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users/adminUsers');
    return response.data;
  } catch (error) {
    throw error;
  }
};


