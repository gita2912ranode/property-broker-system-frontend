import axios from "axios";
 
const API_URL = "http://localhost:9091/api/auth/";
 
const register = async (form) => {
  return axios.post(API_URL + "register", {
    username: form.username,
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone, // ✅ added phone
    role: form.role,
  });
};
 
const login = async (form) => {
  const response = await axios.post(API_URL + "login", form);
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
 
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
 
export default AuthService;