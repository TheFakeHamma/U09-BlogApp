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
