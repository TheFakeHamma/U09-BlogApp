import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchUserBlogs = async (token) => {
  const config = {
    headers: { "x-auth-token": token },
  };
  try {
    const response = await axios.get(`${API_BASE_URL}/users/blogs`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchLikedBlogs = async (token) => {
  const config = {
    headers: { "x-auth-token": token },
  };
  try {
    const response = await axios.get(`${API_BASE_URL}/users/liked-blogs`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchComments = async (token) => {
  const config = {
    headers: { "x-auth-token": token },
  };
  try {
    const response = await axios.get(`${API_BASE_URL}/users/comments`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
