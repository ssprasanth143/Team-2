import axios from "axios";

const TokenHandler = {
  setToken: (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  removeToken: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },

  isTokenValid: (token) => {
    if (!token) return false;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationDate = payload.exp * 1000;
    return expirationDate > Date.now();
  },

  isLoggedIn: () => {
    const token = TokenHandler.getToken();
    return token && TokenHandler.isTokenValid(token);
  },
};

export default TokenHandler;
