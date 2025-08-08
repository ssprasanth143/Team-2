import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api.com/api',
});

const drugService = {
  getAllDrugs: async () => {
    try {
      const response = await api.get('/drugs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDrugById: async (id) => {
    try {
      const response = await api.get(`/drugs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDrug: async (drugData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/drugs', drugData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDrug: async (id, drugData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/drugs/${id}`, drugData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDrug: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/drugs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default drugService;