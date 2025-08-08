import api from "./api";
import axiosInstance from "../utils/axiosInstance";


export const login = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};


export const register = (formData) => api.post("/auth/register", formData);
