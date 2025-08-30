// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Update this with your actual backend URL

// Get drug by ID
export const getDrugById = (id) => {
  return axios.get(`${API_BASE_URL}/drugs/${id}`);
};

// Get drug by Name
export const getDrugByName = (name) => {
  return axios.get(`${API_BASE_URL}/drugs/name/${name}`);
};

// Add to Cart (you can create cart API later if required)
