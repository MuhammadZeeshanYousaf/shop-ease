import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your server's base URL
  withCredentials: true, // Allow sending cookies
});

export default api;
