import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api.com/api',
});

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (user) => {
    const response = await api.patch("/users/profile", user);
    return response;
  },

  isLoggedIn: () => {
    return localStorage.getItem("token") !== null;
  },
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  },

  changePassword: async (passwords) => {
    const response = await api.patch("/users/password", passwords);
    return response;
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
