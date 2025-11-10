import axios from "axios";
 
const API_URL = "http://localhost:9091/api/auth";
 
const register = (data) => axios.post(`${API_URL}/register`, data);
 
const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
 
const logout = () => {
  localStorage.removeItem("user");
};
 
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
 
export default { register, login, logout, getCurrentUser };