

import axios from "axios";

export const API = axios.create({
baseURL: import.meta.env.VITE_API_URL
// baseURL: "http://localhost:5000/api"
});

// ✅ Interceptor FIXED
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ correct
  }

  return req;
});

// AI APIs
export const getAIInsights = (data) =>
  API.post("/ai/insights", data);

export const sendMessage = (data) =>
  API.post("/ai/chat", data);

export const updateProfile = (data) =>
  API.put("/user/update-profile", data);

export const getProfile = (email) =>
  API.get(`/user/profile/${email}`);


